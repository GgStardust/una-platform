// @ts-nocheck
import { useState, useEffect } from 'react';
import {
  Users,
  Mail,
  TrendingUp,
  Settings,
  Download,
  BarChart3,
  CreditCard,
  Activity,
  UserCheck,
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';
import { getAllBlogPosts } from '@/lib/mdx-loader';
import { getAllBlogs, deleteBlog, type Blog } from '@/lib/supabase/blogs';
import { emailTemplates } from '@/lib/emailTemplates';
import EmailModal from './EmailModal';
import BlogEditor from './BlogEditor';

import { analyticsService } from '@/lib/analytics';
import { VerificationManager } from '@/lib/verification';
import { VerificationFlag } from '@/lib/types';
import { 
  AffiliateSettings,
  defaultAffiliateSettings,
  AffiliateManager,
  AffiliateProduct,
  AffiliateLink,
  AffiliateConversion,
  AffiliatePayout,
  AffiliateApplication,
  financialTools,
  legalServices
} from '@/lib/affiliate-system';
import { 
  PaymentModule, 
  PaymentSettings, 
  defaultPaymentSettings 
} from '@/lib/payment-module';
import { exploreFormationExportService } from '@/lib/explore-formation-export';
import { getLeads } from '@/lib/supabase/leads';
import { getAllQuizSubmissions, type QuizSubmission } from '@/lib/supabase/quiz';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  totalRevenue: number;
  conversionRate: number;
  averageOrderValue: number;
}

interface UserActivity {
  id: string;
  email: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'pending';
  intakeCompleted: boolean;
  documentsGenerated: boolean;
  paymentStatus: 'none' | 'pending' | 'completed' | 'failed';
}



interface AnalyticsData {
  totalEvents: number;
  sessionDuration: number;
  pagesViewed: number;
  conversions: number;
  performanceScore: number;
  conversionFunnel: {
    exploreStarted: number;
    exploreCompleted: number;
    intakeStarted: number;
    intakeCompleted: number;
    documentsGenerated: number;
    paymentInitiated: number;
    paymentCompleted: number;
  };
}


export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    conversionRate: 0,
    averageOrderValue: 0
  });
  const [recentActivity, setRecentActivity] = useState<UserActivity[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalEvents: 0,
    sessionDuration: 0,
    pagesViewed: 0,
    conversions: 0,
    performanceScore: 0,
    conversionFunnel: {
      exploreStarted: 0,
      exploreCompleted: 0,
      intakeStarted: 0,
      intakeCompleted: 0,
      documentsGenerated: 0,
      paymentInitiated: 0,
      paymentCompleted: 0
    }
  });
  
  // Verification system state
  const [verificationFlags, setVerificationFlags] = useState<VerificationFlag[]>([]);
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'active' | 'resolved'>('all');
  
  // Affiliate system state
  const [affiliateTab, setAffiliateTab] = useState<'partners' | 'products' | 'links' | 'conversions' | 'analytics' | 'payouts' | 'settings' | 'social-export' | 'applications'>('partners');
  const [affiliateSettings, setAffiliateSettings] = useState<AffiliateSettings>(defaultAffiliateSettings);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [newPartner, setNewPartner] = useState({
    name: '',
    category: '',
    slug: '',
    commission: '',
    description: '',
    url: ''
  });
  
  // Affiliate manager instance
  const affiliateManager = AffiliateManager.getInstance();
  
  // Affiliate data state
  const [affiliateProducts, setAffiliateProducts] = useState<AffiliateProduct[]>([]);
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>([]);
  const [affiliateConversions, setAffiliateConversions] = useState<AffiliateConversion[]>([]);
  const [affiliatePayouts, setAffiliatePayouts] = useState<AffiliatePayout[]>([]);
  const [affiliateApplications, setAffiliateApplications] = useState<AffiliateApplication[]>([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [newApplication, setNewApplication] = useState({
    partnerName: '',
    category: 'tools' as const,
    applicationUrl: '',
    status: 'not-applied' as const,
    commissionRate: '',
    requirements: [] as string[],
    contactEmail: '',
    contactPhone: '',
    notes: '',
    priority: 'medium' as const,
    estimatedMonthlyRevenue: 0
  });
  const [applicationFilter, setApplicationFilter] = useState<'all' | 'not-applied' | 'applied' | 'approved' | 'rejected' | 'pending-review'>('all');
  
  // Get affiliate partners from the existing data
  const affiliatePartners = [
    ...financialTools.map(p => ({ id: p.id, name: p.name, category: p.category })),
    ...legalServices.map(p => ({ id: p.id, name: p.name, category: p.category })),
    ...affiliateManager.getProducts().map(p => ({ id: p.partnerId, name: p.partnerId, category: 'custom' }))
  ];
  
  // Form states
  const [showProductForm, setShowProductForm] = useState(false);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [showConversionForm, setShowConversionForm] = useState(false);
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    partnerId: '',
    name: '',
    description: '',
    url: '',
    slug: '',
    category: '',
    commission: '',
    featured: false,
    status: 'active' as 'active' | 'inactive' | 'coming-soon'
  });
  
  const [newLink, setNewLink] = useState({
    productId: '',
    partnerId: '',
    slug: '',
    destinationUrl: '',
    utmSource: 'una-platform',
    utmMedium: 'affiliate',
    utmCampaign: '',
    status: 'active' as 'active' | 'inactive' | 'testing'
  });
  
  const [newConversion, setNewConversion] = useState({
    linkId: '',
    partnerId: '',
    productId: '',
    amount: 0,
    currency: 'USD',
    notes: '',
    status: 'pending' as 'pending' | 'confirmed' | 'reversed'
  });
  
  const [newPayout, setNewPayout] = useState({
    partnerId: '',
    period: '',
    clicks: 0,
    conversions: 0,
    revenue: 0,
    commission: 0,
    notes: '',
    transactionRef: '',
    status: 'pending' as 'pending' | 'paid' | 'cancelled'
  });
  
  // Social export state
  const [socialExportPlatform, setSocialExportPlatform] = useState('all');
  const [socialExportType, setSocialExportType] = useState('all');
  const [socialExportFormat, setSocialExportFormat] = useState('csv');
  
  // Payment system state
  const [paymentTab, setPaymentTab] = useState<'overview' | 'settings' | 'records' | 'invoices'>('overview');
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(defaultPaymentSettings);
  const paymentModule = PaymentModule.getInstance();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'verification' | 'affiliates' | 'payments' | 'analytics' | 'emails' | 'settings' | 'environment' | 'explore-formation' | 'blog' | 'leads' | 'quiz-submissions'>('overview');
  
  // Blog posts state
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | undefined>(undefined);
  const [blogsLoading, setBlogsLoading] = useState(false);
  
  // Leads state
  const [leads, setLeads] = useState<any[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  // Quiz submissions state
  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmission[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);

  useEffect(() => {
    loadAdminData();
    loadAnalyticsData();
    refreshVerificationFlags();
    loadAffiliateData();
    loadBlogPosts();
    loadQuizSubmissions();
  }, []);

  const loadBlogPosts = async () => {
    setBlogsLoading(true);
    try {
      const { data, error } = await getAllBlogs();
      if (error) {
        console.error('Error loading blogs:', error);
      } else {
        setBlogPosts(data || []);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setBlogsLoading(false);
    }
  };

  const handleCreateBlog = () => {
    setEditingBlog(undefined);
    setShowBlogEditor(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setShowBlogEditor(true);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    const { success, error } = await deleteBlog(id);
    if (success) {
      loadBlogPosts();
    } else {
      alert(`Failed to delete blog: ${error}`);
    }
  };

  const handleBlogSaved = () => {
    loadBlogPosts();
  };

  const loadAdminData = async () => {
    try {
      // Mock data loading from localStorage
      const mockUsers = [
        { id: '1', email: 'user1@example.com', lastActive: '2024-08-24T10:30:00Z', status: 'active' as const, intakeCompleted: true, documentsGenerated: true, paymentStatus: 'completed' as const },
        { id: '2', email: 'user2@example.com', lastActive: '2024-08-24T09:15:00Z', status: 'active' as const, intakeCompleted: true, documentsGenerated: false, paymentStatus: 'pending' as const },
        { id: '3', email: 'user3@example.com', lastActive: '2024-08-23T16:45:00Z', status: 'inactive' as const, intakeCompleted: false, documentsGenerated: false, paymentStatus: 'none' as const },
        { id: '4', email: 'user4@example.com', lastActive: '2024-08-24T11:20:00Z', status: 'active' as const, intakeCompleted: true, documentsGenerated: true, paymentStatus: 'completed' as const },
        { id: '5', email: 'user5@example.com', lastActive: '2024-08-24T08:30:00Z', status: 'pending' as const, intakeCompleted: false, documentsGenerated: false, paymentStatus: 'none' as const }
      ];

      setRecentActivity(mockUsers);
      
      // Calculate stats
      const totalUsers = mockUsers.length;
      const activeUsers = mockUsers.filter(u => u.status === 'active').length;
      const documentsGenerated = mockUsers.filter(u => u.documentsGenerated).length;
      const conversionRate = totalUsers > 0 ? (documentsGenerated / totalUsers) * 100 : 0;

      setStats({
        totalUsers,
        activeUsers,
        totalOrders: mockUsers.filter(u => u.paymentStatus === 'completed').length,
        totalRevenue: mockUsers.filter(u => u.paymentStatus === 'completed').length * 1500, // Mock $1500 average
        conversionRate,
        averageOrderValue: 1500
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const loadLeads = async () => {
    setLeadsLoading(true);
    try {
      const { data, error } = await getLeads();
      if (error) {
        console.error('Error loading leads:', error);
      } else {
        setLeads(data || []);
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLeadsLoading(false);
    }
  };

  const loadQuizSubmissions = async () => {
    setQuizLoading(true);
    try {
      const { data, error } = await getAllQuizSubmissions();
      if (error) {
        console.error('Error loading quiz submissions:', error);
      } else {
        setQuizSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error loading quiz submissions:', error);
    } finally {
      setQuizLoading(false);
    }
  };

  const loadAnalyticsData = async () => {
    try {
      const summary = analyticsService.getAnalyticsSummary();
      const funnel = analyticsService.getConversionFunnel();
      
      setAnalyticsData({
        ...summary,
        conversionFunnel: funnel
      });
    } catch (error) {
      console.error('Error loading analytics data:', error);
    }
  };

  const loadAffiliateData = () => {
    try {
      setAffiliateProducts(affiliateManager.getProducts());
      setAffiliateLinks(affiliateManager.getLinks());
      setAffiliateConversions(affiliateManager.getConversions());
      setAffiliatePayouts(affiliateManager.getPayouts());
      setAffiliateApplications(affiliateManager.getApplications());
    } catch (error) {
      console.error('Error loading affiliate data:', error);
    }
  };

  // Auto-generate products and links from system affiliates
  const generateAffiliateData = () => {
    try {
      // Generate products from financial tools
      financialTools.forEach(partner => {
        const existingProduct = affiliateManager.getProducts().find(p => p.partnerId === partner.id);
        if (!existingProduct) {
          affiliateManager.addProduct({
            partnerId: partner.id,
            name: partner.name,
            description: partner.description,
            url: partner.url,
            slug: partner.slug,
            category: partner.category,
            commission: partner.commission,
            featured: partner.status === 'active',
            status: partner.status as 'active' | 'inactive' | 'coming-soon'
          });
        }
      });

      // Generate products from legal services
      legalServices.forEach(partner => {
        const existingProduct = affiliateManager.getProducts().find(p => p.partnerId === partner.id);
        if (!existingProduct) {
          affiliateManager.addProduct({
            partnerId: partner.id,
            name: partner.name,
            description: partner.description,
            url: partner.url,
            slug: partner.slug,
            category: partner.category,
            commission: partner.commission,
            featured: partner.status === 'active',
            status: partner.status as 'active' | 'inactive' | 'coming-soon'
          });
        }
      });

      // Generate links for active products
      affiliateManager.getProducts().forEach(product => {
        if (product.status === 'active') {
          const existingLink = affiliateManager.getLinks().find(l => l.productId === product.id);
          if (!existingLink) {
            affiliateManager.addLink({
              productId: product.id,
              partnerId: product.partnerId,
              slug: product.slug,
              destinationUrl: product.url,
              utmSource: 'una-platform',
              utmMedium: 'affiliate',
              utmCampaign: `${product.slug}-campaign`,
              status: 'active'
            });
          }
        }
      });

      // Reload data
      loadAffiliateData();
      alert('Affiliate products and links generated successfully!');
    } catch (error) {
      console.error('Error generating affiliate data:', error);
      alert('Error generating affiliate data. Check console for details.');
    }
  };

  const handleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };



  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleOpenEmailTemplate = (templateKey: string, user?: UserActivity) => {
    const template = emailTemplates[templateKey as keyof typeof emailTemplates];
    if (!template) return;

    // Extract client data from user or use defaults
    const clientData = user ? {
      firstName: user.email.split('@')[0], // Extract name from email
      name: user.email.split('@')[0],
      email: user.email,
      bookingDate: new Date().toLocaleDateString(),
      entityName: 'UNA Organization', // Default or from user data
      state: 'California' // Default or from user data
    } : {
      firstName: 'Client',
      name: 'Client Name',
      email: 'client@example.com',
      bookingDate: new Date().toLocaleDateString(),
      entityName: 'UNA Organization',
      state: 'California'
    };

    // Replace placeholders with client data
    let subject = template.subject
      .replace(/\[First Name\]/g, clientData.firstName)
      .replace(/\[Client Name\]/g, clientData.name)
      .replace(/\[Date\/Time\]/g, clientData.bookingDate)
      .replace(/\[Booking Date\/Time\]/g, clientData.bookingDate)
      .replace(/\[Client Email\]/g, clientData.email)
      .replace(/\[Date\]/g, clientData.bookingDate);

    let body = template.body
      .replace(/\[First Name\]/g, clientData.firstName)
      .replace(/\[Client Name\]/g, clientData.name)
      .replace(/\[Client Email\]/g, clientData.email)
      .replace(/\[Date\/Time\]/g, clientData.bookingDate)
      .replace(/\[Booking Date\/Time\]/g, clientData.bookingDate)
      .replace(/\[Date\]/g, clientData.bookingDate)
      .replace(/\[Secure Intake Link\]/g, `${window.location.origin}/intake`)
      .replace(/\[Checkout Link\]/g, `${window.location.origin}/checkout`);

    setSelectedTemplate({ subject, body, templateKey, clientData });
    setIsEmailModalOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'inactive':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-navy-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-600';
      case 'pending':
        return 'text-amber-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Verification system functions
  const refreshVerificationFlags = () => {
    try {
      const flags = VerificationManager.getVerificationFlags();
      setVerificationFlags(flags);
    } catch (error) {
      console.error('Error refreshing verification flags:', error);
    }
  };

  const exportUnresolvedFlags = () => {
    try {
      const unresolvedFlags = VerificationManager.getUnresolvedFlags();
      const dataStr = JSON.stringify(unresolvedFlags, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'unresolved-verification-flags.json';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting unresolved flags:', error);
      alert('Failed to export flags');
    }
  };

  const resolveFlag = (flagId: string) => {
    try {
      VerificationManager.resolveFlag(flagId, 'Admin', 'Flag resolved by administrator');
      refreshVerificationFlags();
    } catch (error) {
      console.error('Error resolving flag:', error);
      alert('Failed to resolve flag');
    }
  };

  const dismissFlag = (flagId: string) => {
    try {
      VerificationManager.dismissFlag(flagId, 'Admin', 'Flag dismissed by administrator');
      refreshVerificationFlags();
    } catch (error) {
      console.error('Error dismissing flag:', error);
      alert('Failed to dismiss flag');
    }
  };

  // Affiliate system functions
  const addPartner = () => {
    try {
      // In a real implementation, this would save to localStorage or database
      console.log('Adding new partner:', newPartner);
      
      // Reset form
      setNewPartner({
        name: '',
        category: '',
        slug: '',
        commission: '',
        description: '',
        url: ''
      });
      setShowPartnerForm(false);
      
      // Show success message (you could add a toast notification here)
      alert('Partner added successfully!');
    } catch (error) {
      console.error('Error adding partner:', error);
      alert('Error adding partner. Please try again.');
    }
  };

  // Social export functions
  const exportSocialQueueCSV = () => {
    try {
      // Mock data for demonstration
      const csvData = `Platform,Title,Description,Link,Image
LinkedIn,California UNA Formation,Learn why California-specific UNA formation is crucial,${window.location.origin}/blog/una-formation-california-specificity?utm_source=linkedin&utm_medium=social&utm_campaign=una-formation-california-specificity,/blog/una-formation-california.jpg
Facebook,Complete UNA Formation Guide,Master UNA formation from concept to compliance,${window.location.origin}/blog/complete-una-formation-guide?utm_source=facebook&utm_medium=social&utm_campaign=complete-una-formation-guide,/blog/complete-formation-guide.jpg`;
      
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'social-queue-export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Error exporting CSV. Please try again.');
    }
  };

  const exportSocialQueueJSON = () => {
    try {
      // Mock data for demonstration
      const jsonData = {
        posts: [
          {
            platform: 'LinkedIn',
            title: 'California UNA Formation',
            description: 'Learn why California-specific UNA formation is crucial',
            link: `${window.location.origin}/blog/una-formation-california-specificity?utm_source=linkedin&utm_medium=social&utm_campaign=una-formation-california-specificity`,
            image: '/blog/una-formation-california.jpg'
          },
          {
            platform: 'Facebook',
            title: 'Complete UNA Formation Guide',
            description: 'Master UNA formation from concept to compliance',
            link: `${window.location.origin}/blog/complete-una-formation-guide?utm_source=facebook&utm_medium=social&utm_campaign=complete-una-formation-guide`,
            image: '/blog/complete-formation-guide.jpg'
          }
        ]
      };
      
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'social-queue-export.json';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting JSON:', error);
      alert('Error exporting JSON. Please try again.');
    }
  };

  // Payment system functions
  const savePaymentSettings = () => {
    try {
      paymentModule.updateSettings(paymentSettings);
      alert('Payment settings saved successfully!');
    } catch (error) {
      console.error('Error saving payment settings:', error);
      alert('Error saving payment settings. Please try again.');
    }
  };

  const exportPaymentsCSV = () => {
    try {
      const csvData = paymentModule.exportPaymentsCSV();
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'payment-records.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting payments CSV:', error);
      alert('Error exporting payments CSV. Please try again.');
    }
  };

  const exportInvoicesCSV = () => {
    try {
      const csvData = paymentModule.exportInvoicesCSV();
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoices.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting invoices CSV:', error);
      alert('Error exporting invoices CSV. Please try again.');
    }
  };

  // Affiliate management functions
  const addProduct = () => {
    try {
      affiliateManager.addProduct(newProduct);
      loadAffiliateData();
      setNewProduct({
        partnerId: '',
        name: '',
        description: '',
        url: '',
        slug: '',
        category: '',
        commission: '',
        featured: false,
        status: 'active' as const
      });
      setShowProductForm(false);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };

  const addLink = () => {
    try {
      affiliateManager.addLink(newLink);
      loadAffiliateData();
      setNewLink({
        productId: '',
        partnerId: '',
        slug: '',
        destinationUrl: '',
        utmSource: 'una-platform',
        utmMedium: 'affiliate',
        utmCampaign: '',
        status: 'active' as const
      });
      setShowLinkForm(false);
      alert('Link added successfully!');
    } catch (error) {
      console.error('Error adding link:', error);
      alert('Error adding link. Please try again.');
    }
  };

  const addConversion = () => {
    try {
      affiliateManager.addConversion(newConversion);
      loadAffiliateData();
      setNewConversion({
        linkId: '',
        partnerId: '',
        productId: '',
        amount: 0,
        currency: 'USD',
        notes: '',
        status: 'pending' as const
      });
      setShowConversionForm(false);
      alert('Conversion added successfully!');
    } catch (error) {
      console.error('Error adding conversion:', error);
      alert('Error adding conversion. Please try again.');
    }
  };

  const addPayout = () => {
    try {
      affiliateManager.addPayout({
        ...newPayout,
        createdAt: new Date().toISOString()
      });
      loadAffiliateData();
      setNewPayout({
        partnerId: '',
        period: '',
        clicks: 0,
        conversions: 0,
        revenue: 0,
        commission: 0,
        notes: '',
        transactionRef: '',
        status: 'pending' as const
      });
      setShowPayoutForm(false);
      alert('Payout added successfully!');
    } catch (error) {
      console.error('Error adding payout:', error);
      alert('Error adding payout. Please try again.');
    }
  };

  const exportAffiliateAnalyticsCSV = () => {
    try {
      const csvData = affiliateManager.exportAnalyticsCSV();
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'affiliate-analytics.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting affiliate analytics CSV:', error);
      alert('Error exporting affiliate analytics CSV. Please try again.');
    }
  };

  const exportClickEventsCSV = () => {
    try {
      const csvData = affiliateManager.exportClickEventsCSV();
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'click-events.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting click events CSV:', error);
      alert('Error exporting click events CSV. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Admin Dashboard</h1>
          <p className="text-navy-600">Manage your UNA Platform operations and monitor performance</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex flex-wrap gap-1 bg-white rounded-lg p-1 shadow-sm">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'leads', label: 'Leads', icon: Mail },
              { id: 'quiz-submissions', label: 'Quiz Submissions', icon: CheckCircle },
              { id: 'verification', label: 'Verification', icon: AlertCircle },
              { id: 'affiliates', label: 'Affiliates', icon: Users },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'emails', label: 'Emails', icon: Mail },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'environment', label: 'Environment', icon: Settings },
              { id: 'explore-formation', label: 'Explore + Formation', icon: Activity },
              { id: 'blog', label: 'Blog', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gold-100 text-gold-700'
                    : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                <tab.icon className="h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                <div className="flex items-center">
                  <div className="p-2 bg-gold-100 rounded-lg">
                    <Users className="h-6 w-6 text-gold-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-navy-600">Total Users</p>
                    <p className="text-2xl font-bold text-navy-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <UserCheck className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-navy-600">Active Users</p>
                    <p className="text-2xl font-bold text-navy-900">{stats.activeUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                <div className="flex items-center">
                  <div className="p-2 bg-navy-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-navy-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-navy-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-navy-900">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-navy-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-navy-900">{stats.conversionRate.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                <h3 className="text-lg font-semibold text-navy-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('emails')}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Newsletter
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                <h3 className="text-lg font-semibold text-navy-900 mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-navy-600">Platform Status</span>
                    <span className="flex items-center text-emerald-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-navy-600">Email Service</span>
                    <span className="flex items-center text-emerald-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-navy-600">Payment System</span>
                    <span className="flex items-center text-emerald-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connected Services Status */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Connected Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    <span className="font-medium text-navy-900">Supabase</span>
                  </div>
                  <span className="text-emerald-600 text-sm font-medium">✅ Connected</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                    <span className="font-medium text-navy-900">SendGrid</span>
                  </div>
                  <span className="text-red-600 text-sm font-medium">❌ Not Configured</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-amber-600 mr-3" />
                    <span className="font-medium text-navy-900">Stripe</span>
                  </div>
                  <span className="text-amber-600 text-sm font-medium">⚠️ Check Required</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm border border-navy-100">
            <div className="p-6 border-b border-navy-100">
              <h2 className="text-xl font-semibold text-navy-900">User Management</h2>
              <p className="text-navy-600 mt-1">Monitor user activity and manage accounts</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(recentActivity.map(u => u.id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                        className="rounded border-navy-300 text-gold-600 focus:ring-gold-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Last Active</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-navy-100">
                  {recentActivity.map((user) => (
                    <tr key={user.id} className="hover:bg-navy-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelection(user.id)}
                          className="rounded border-navy-300 text-gold-600 focus:ring-gold-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-navy-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(user.status)}
                          <span className="ml-2 text-sm text-navy-900 capitalize">{user.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {user.intakeCompleted && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              Intake
                            </span>
                          )}
                          {user.documentsGenerated && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                              Documents
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium capitalize ${getPaymentStatusColor(user.paymentStatus)}`}>
                          {user.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-500">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-lg shadow-sm border border-navy-100">
            <div className="p-6 border-b border-navy-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-navy-900">Lead Management</h2>
                  <p className="text-navy-600 mt-1">Track email captures from the UNA Formation Guide</p>
                </div>
                <button
                  onClick={loadLeads}
                  disabled={leadsLoading}
                  className="btn-grad btn-primary px-4 py-2 text-sm"
                >
                  {leadsLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-navy-200">
                  {leadsLoading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-navy-500">
                        Loading leads...
                      </td>
                    </tr>
                  ) : leads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-navy-500">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-navy-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-900">
                          {lead.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600">
                          {lead.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                            {lead.source || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quiz Submissions Tab */}
        {activeTab === 'quiz-submissions' && (
          <div className="bg-white rounded-lg shadow-sm border border-navy-100">
            <div className="p-6 border-b border-navy-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-navy-900">Explore Quiz Submissions</h2>
                  <p className="text-navy-600 mt-1">Track UNA readiness assessments from the Explore page</p>
                </div>
                <button
                  onClick={loadQuizSubmissions}
                  disabled={quizLoading}
                  className="btn-grad btn-primary px-4 py-2 text-sm"
                >
                  {quizLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Email</th>                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Recommendation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">State</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Primary Goal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Journey Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">Budget</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-navy-200">
                  {quizLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-navy-500">
                        Loading quiz submissions...
                      </td>
                    </tr>
                  ) : quizSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-navy-500">
                        No quiz submissions yet
                      </td>
                    </tr>
                  ) : (
                    quizSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-navy-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-900 font-medium">
                          {submission.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600">
                          {new Date(submission.created_at!).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-navy-900">
                          {submission.score}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            submission.recommendation === 'EXCELLENT FIT' ? 'bg-green-100 text-green-800' :
                            submission.recommendation === 'GREAT FIT' ? 'bg-blue-100 text-blue-800' :
                            submission.recommendation === 'GOOD FIT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {submission.recommendation}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600 capitalize">
                          {submission.state}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600 capitalize">
                          {submission.primary_goal.replace(/_/g, ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600 capitalize">
                          {submission.journey_stage.replace(/_/g, ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600 capitalize">
                          {submission.annual_budget}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {quizSubmissions.length > 0 && (
              <div className="px-6 py-4 bg-navy-50 border-t border-navy-100">
                <div className="text-sm text-navy-600">
                  <strong>Total Submissions:</strong> {quizSubmissions.length}
                  <span className="mx-4">|</span>
                  <strong>Excellent/Great Fit:</strong> {quizSubmissions.filter(s => s.score >= 70).length}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Verification Tab */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-navy-100">
              <div className="p-6 border-b border-navy-100">
                <h2 className="text-xl font-semibold text-navy-900">Verification Management</h2>
                <p className="text-navy-600 mt-1">Monitor and resolve verification flags</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setVerificationFilter('all')}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        verificationFilter === 'all' 
                          ? 'bg-gold-600 text-white' 
                          : 'bg-navy-100 text-navy-700 hover:bg-navy-200'
                      }`}
                    >
                      All Flags
                    </button>
                    <button
                      onClick={() => setVerificationFilter('active')}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        verificationFilter === 'active' 
                          ? 'bg-gold-600 text-white' 
                          : 'bg-navy-100 text-navy-700 hover:bg-navy-200'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setVerificationFilter('resolved')}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        verificationFilter === 'resolved' 
                          ? 'bg-gold-600 text-white' 
                          : 'bg-navy-100 text-navy-700 hover:bg-navy-200'
                      }`}
                    >
                      Resolved
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={exportUnresolvedFlags}
                      className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Export Unresolved
                    </button>
                    <button
                      onClick={refreshVerificationFlags}
                      className="px-3 py-1 bg-navy-600 text-white rounded-md text-sm font-medium hover:bg-navy-700 transition-colors"
                    >
                      Refresh
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {verificationFlags
                    .filter(flag => verificationFilter === 'all' || flag.status === verificationFilter)
                    .map((flag) => (
                      <div key={flag.id} className="border border-navy-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                flag.severity === 'high' ? 'bg-red-100 text-red-800' :
                                flag.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {flag.severity.toUpperCase()}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                flag.type === 'legal' ? 'bg-purple-100 text-purple-800' :
                                flag.type === 'referral' ? 'bg-blue-100 text-blue-800' :
                                flag.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {flag.type.toUpperCase()}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                flag.status === 'active' ? 'bg-red-100 text-red-800' :
                                flag.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {flag.status.toUpperCase()}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-navy-900 mb-2">{flag.title}</h3>
                            <p className="text-navy-700 mb-3">{flag.description}</p>
                            
                            {flag.requiresAction && flag.referralType && (
                              <div className="mb-3 p-3 bg-navy-50 rounded-lg">
                                <p className="text-sm font-medium text-navy-900 mb-1">
                                  Referral Required: {flag.referralType}
                                </p>
                                <p className="text-sm text-navy-700">{flag.referralReason}</p>
                              </div>
                            )}
                            
                            <div className="mb-3">
                              <h4 className="text-sm font-medium text-navy-900 mb-2">Next Steps:</h4>
                              <ul className="text-sm text-navy-700 space-y-1">
                                {flag.nextSteps.map((step: string, index: number) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-gold-600 mr-2">•</span>
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="text-xs text-navy-500">
                              Created: {new Date(flag.createdAt).toLocaleDateString()}
                              {flag.resolvedAt && (
                                <span className="ml-4">
                                  Resolved: {new Date(flag.resolvedAt).toLocaleDateString()}
                                  {flag.resolvedBy && ` by ${flag.resolvedBy}`}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {flag.status === 'active' && (
                            <div className="flex flex-col space-y-2 ml-4">
                              <button
                                onClick={() => resolveFlag(flag.id)}
                                className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
                              >
                                Resolve
                              </button>
                              <button
                                onClick={() => dismissFlag(flag.id)}
                                className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                              >
                                Dismiss
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  
                  {verificationFlags.filter(flag => verificationFilter === 'all' || flag.status === verificationFilter).length === 0 && (
                    <div className="text-center py-8 text-navy-600">
                      No verification flags found for the selected filter.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Affiliates Tab */}
        {activeTab === 'affiliates' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-navy-100">
              <div className="p-6 border-b border-navy-100">
                <h2 className="text-xl font-semibold text-navy-900">Affiliate Management</h2>
                <p className="text-navy-600 mt-1">Manage affiliate partners, products, and tracking</p>
              </div>
              <div className="p-6">
                {/* Affiliate Dashboard Tabs */}
                <div className="mb-6">
                  <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    {[
                      { id: 'partners', label: 'Partners' },
                      { id: 'products', label: 'Products' },
                      { id: 'links', label: 'Links' },
                      { id: 'conversions', label: 'Conversions' },
                      { id: 'analytics', label: 'Analytics' },
                      { id: 'payouts', label: 'Payouts' },
                      { id: 'applications', label: 'Applications' },
                      { id: 'settings', label: 'Settings' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setAffiliateTab(tab.id as any)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          affiliateTab === tab.id
                            ? 'bg-white text-navy-900 shadow-sm'
                            : 'text-navy-600 hover:text-navy-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Partners Tab */}
                {affiliateTab === 'partners' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-navy-900">Affiliate Partners</h3>
                      <button 
                        onClick={() => setShowPartnerForm(true)}
                        className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                      >
                        Add Partner
                      </button>
                    </div>
                    
                    {/* System Affiliate Partners */}
                    <div className="bg-white rounded-lg shadow-sm border border-navy-100">
                      <div className="p-6">
                        <h4 className="text-lg font-medium text-navy-900 mb-4">System Affiliate Partners</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {affiliatePartners.map(partner => (
                            <div key={partner.id} className="border border-navy-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-navy-900">{partner.name}</h5>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  partner.category === 'financial' ? 'bg-blue-100 text-blue-800' :
                                  partner.category === 'legal' ? 'bg-green-100 text-green-800' :
                                  partner.category === 'banking' ? 'bg-purple-100 text-purple-800' :
                                  partner.category === 'tools' ? 'bg-orange-100 text-orange-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {partner.category}
                                </span>
                              </div>
                              <p className="text-sm text-navy-600">ID: {partner.id}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Add Partner Form */}
                    {showPartnerForm && (
                      <div className="bg-navy-50 rounded-lg p-6 border border-navy-200">
                        <h4 className="text-lg font-medium text-navy-900 mb-4">Quick Add Partner</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-navy-700 mb-2">Partner Name</label>
                            <input
                              type="text"
                              value={newPartner.name}
                              onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
                              className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                              placeholder="e.g., LegalZoom"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-navy-700 mb-2">Category</label>
                            <select
                              value={newPartner.category}
                              onChange={(e) => setNewPartner({...newPartner, category: e.target.value})}
                              className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                            >
                              <option value="">Select category</option>
                              <option value="banking">Banking</option>
                              <option value="legal">Legal</option>
                              <option value="financial">Financial</option>
                              <option value="tools">Tools</option>
                              <option value="insurance">Insurance</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-navy-700 mb-2">Slug (URL identifier)</label>
                            <input
                              type="text"
                              value={newPartner.slug}
                              onChange={(e) => setNewPartner({...newPartner, slug: e.target.value})}
                              className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                              placeholder="e.g., legalzoom"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-navy-700 mb-2">Commission</label>
                            <input
                              type="text"
                              value={newPartner.commission}
                              onChange={(e) => setNewPartner({...newPartner, commission: e.target.value})}
                              className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                              placeholder="e.g., 15% first year"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-navy-700 mb-2">Description</label>
                            <textarea
                              value={newPartner.description}
                              onChange={(e) => setNewPartner({...newPartner, description: e.target.value})}
                              className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                              rows={3}
                              placeholder="Brief description of the partner and their services..."
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-navy-700 mb-2">URL</label>
                            <input
                              type="url"
                              value={newPartner.url}
                              onChange={(e) => setNewPartner({...newPartner, url: e.target.value})}
                              className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                              placeholder="https://partner-website.com"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-4">
                          <button
                            onClick={() => setShowPartnerForm(false)}
                            className="px-4 py-2 text-navy-600 border border-navy-300 rounded-lg hover:bg-navy-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={addPartner}
                            className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                          >
                            Add Partner
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center py-8 text-navy-500">
                      Partners management coming soon...
                    </div>
                  </div>
                )}

                {/* Products Tab */}
                {affiliateTab === 'products' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-navy-900">Affiliate Products</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={generateAffiliateData}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Generate from Partners
                        </button>
                        <button
                          onClick={() => setShowProductForm(true)}
                          className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                    
                    {/* Products List */}
                    <div className="bg-white rounded-lg shadow-sm border border-navy-100">
                      <div className="p-6">
                        {affiliateProducts.length > 0 ? (
                          <div className="space-y-4">
                            {affiliateProducts.map(product => (
                              <div key={product.id} className="border border-navy-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-navy-900">{product.name}</h4>
                                    <p className="text-sm text-navy-600 mt-1">{product.description}</p>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-navy-500">
                                      <span>Partner: {affiliatePartners.find(p => p.id === product.partnerId)?.name || 'Unknown'}</span>
                                      <span>Commission: {product.commission}</span>
                                      <span>Category: {product.category}</span>
                                      <span className={`px-2 py-1 rounded-full text-xs ${
                                        product.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                                        product.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {product.status}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => {
                                        setNewProduct({
                                          partnerId: product.partnerId,
                                          name: product.name,
                                          description: product.description,
                                          url: product.url,
                                          slug: product.slug,
                                          category: product.category,
                                          commission: product.commission,
                                          featured: product.featured,
                                          status: product.status
                                        });
                                        setShowProductForm(true);
                                      }}
                                      className="px-3 py-1 text-sm bg-navy-600 text-white rounded hover:bg-navy-700"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm('Are you sure you want to delete this product?')) {
                                          affiliateManager.deleteProduct(product.id);
                                          loadAffiliateData();
                                        }
                                      }}
                                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-navy-500">
                            No products found. Add your first product to get started.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add/Edit Product Form */}
                    {showProductForm && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                          <h3 className="text-lg font-medium text-navy-900 mb-4">
                            {newProduct.partnerId ? 'Edit Product' : 'Add New Product'}
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Partner</label>
                              <select
                                value={newProduct.partnerId}
                                onChange={(e) => setNewProduct({...newProduct, partnerId: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              >
                                <option value="">Select Partner</option>
                                {affiliatePartners.map(partner => (
                                  <option key={partner.id} value={partner.id}>{partner.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Product Name</label>
                              <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Description</label>
                              <textarea
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                rows={3}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">URL</label>
                              <input
                                type="url"
                                value={newProduct.url}
                                onChange={(e) => setNewProduct({...newProduct, url: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Slug</label>
                              <input
                                type="text"
                                value={newProduct.slug}
                                onChange={(e) => setNewProduct({...newProduct, slug: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Category</label>
                              <input
                                type="text"
                                value={newProduct.slug}
                                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Commission</label>
                              <input
                                type="text"
                                value={newProduct.commission}
                                onChange={(e) => setNewProduct({...newProduct, commission: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                placeholder="e.g., 15%"
                                required
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={newProduct.featured}
                                onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                                className="mr-2"
                              />
                              <label className="text-sm text-navy-700">Featured Product</label>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Status</label>
                              <select
                                value={newProduct.status}
                                onChange={(e) => setNewProduct({...newProduct, status: e.target.value as 'active' | 'inactive' | 'coming-soon'})}
                                className="w-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="coming-soon">Coming Soon</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex space-x-3 mt-6">
                            <button
                              onClick={addProduct}
                              className="flex-1 px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                            >
                              {newProduct.partnerId ? 'Update Product' : 'Add Product'}
                            </button>
                            <button
                              onClick={() => {
                                setShowProductForm(false);
                                setNewProduct({
                                  partnerId: '',
                                  name: '',
                                  description: '',
                                  url: '',
                                  slug: '',
                                  category: '',
                                  commission: '',
                                  featured: false,
                                  status: 'active' as const
                                });
                              }}
                              className="flex-1 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Links Tab */}
                {affiliateTab === 'links' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-navy-900">Affiliate Links</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={generateAffiliateData}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Generate from Partners
                        </button>
                        <button
                          onClick={() => setShowLinkForm(true)}
                          className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                        >
                          Create Link
                        </button>
                      </div>
                    </div>
                    
                    {/* Links List */}
                    <div className="bg-white rounded-lg shadow-sm border border-navy-100">
                      <div className="p-6">
                        {affiliateLinks.length > 0 ? (
                          <div className="space-y-4">
                            {affiliateLinks.map(link => (
                              <div key={link.id} className="border border-navy-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-navy-900">/{link.slug}</h4>
                                    <p className="text-sm text-navy-600 mt-1">{link.destinationUrl}</p>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-navy-500">
                                      <span>Product: {affiliateProducts.find(p => p.id === link.productId)?.name || 'Unknown'}</span>
                                      <span>Partner: {affiliatePartners.find(p => p.id === link.partnerId)?.name || 'Unknown'}</span>
                                      <span>UTM: {link.utmSource}/{link.utmMedium}/{link.utmCampaign}</span>
                                      <span className={`px-2 py-1 rounded-full text-xs ${
                                        link.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                                        link.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {link.status}
                                      </span>
                                    </div>
                                    {link.lastUsedAt && (
                                      <p className="text-xs text-navy-400 mt-1">
                                        Last used: {new Date(link.lastUsedAt).toLocaleDateString()}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => {
                                        setNewLink({
                                          productId: link.productId,
                                          partnerId: link.partnerId,
                                          slug: link.slug,
                                          destinationUrl: link.destinationUrl,
                                          utmSource: link.utmSource,
                                          utmMedium: link.utmMedium,
                                          utmCampaign: link.utmCampaign,
                                          status: link.status
                                        });
                                        setShowLinkForm(true);
                                      }}
                                      className="px-3 py-1 text-sm bg-navy-600 text-white rounded hover:bg-navy-700"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm('Are you sure you want to delete this link?')) {
                                          affiliateManager.deleteLink(link.id);
                                          loadAffiliateData();
                                        }
                                      }}
                                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-navy-500">
                            No links found. Create your first affiliate link to get started.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add/Edit Link Form */}
                    {showLinkForm && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                          <h3 className="text-lg font-medium text-navy-900 mb-4">
                            {newLink.productId ? 'Edit Link' : 'Create New Link'}
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Product</label>
                              <select
                                value={newLink.productId}
                                onChange={(e) => setNewLink({...newLink, productId: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              >
                                <option value="">Select Product</option>
                                {affiliateProducts.map(product => (
                                  <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Partner</label>
                              <select
                                value={newLink.partnerId}
                                onChange={(e) => setNewLink({...newLink, partnerId: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              >
                                <option value="">Select Partner</option>
                                {affiliatePartners.map(partner => (
                                  <option key={partner.id} value={partner.id}>{partner.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Slug</label>
                              <input
                                type="text"
                                value={newLink.slug}
                                onChange={(e) => setNewLink({...newLink, slug: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                placeholder="e.g., lz-una-starter"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Destination URL</label>
                              <input
                                type="url"
                                value={newLink.destinationUrl}
                                onChange={(e) => setNewLink({...newLink, destinationUrl: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">UTM Source</label>
                              <input
                                type="text"
                                value={newLink.utmSource}
                                onChange={(e) => setNewLink({...newLink, utmSource: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">UTM Medium</label>
                              <input
                                type="text"
                                value={newLink.utmMedium}
                                onChange={(e) => setNewLink({...newLink, utmMedium: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">UTM Campaign</label>
                              <input
                                type="text"
                                value={newLink.utmCampaign}
                                onChange={(e) => setNewLink({...newLink, utmCampaign: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Status</label>
                              <select
                                value={newLink.status}
                                onChange={(e) => setNewLink({...newLink, status: e.target.value as 'active' | 'inactive' | 'testing'})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="testing">Testing</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex space-x-3 mt-6">
                            <button
                              onClick={addLink}
                              className="flex-1 px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                            >
                              {newLink.productId ? 'Update Link' : 'Create Link'}
                            </button>
                            <button
                              onClick={() => {
                                setShowLinkForm(false);
                                setNewLink({
                                  productId: '',
                                  partnerId: '',
                                  slug: '',
                                  destinationUrl: '',
                                  utmSource: 'una-platform',
                                  utmMedium: 'affiliate',
                                  utmCampaign: '',
                                  status: 'active' as const
                                });
                              }}
                              className="flex-1 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Conversions Tab */}
                {affiliateTab === 'conversions' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-navy-900">Affiliate Conversions</h3>
                      <button
                        onClick={() => setShowConversionForm(true)}
                        className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                      >
                        Add Conversion
                      </button>
                    </div>
                    
                    {/* Conversions List */}
                    <div className="bg-white rounded-lg shadow-sm border border-navy-100">
                      <div className="p-6">
                        {affiliateConversions.length > 0 ? (
                          <div className="space-y-4">
                            {affiliateConversions.map(conversion => (
                              <div key={conversion.id} className="border border-navy-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-navy-900">
                                      ${conversion.amount} {conversion.currency}
                                    </h4>
                                    <p className="text-sm text-navy-600 mt-1">
                                      Product: {affiliateProducts.find(p => p.id === conversion.productId)?.name || 'Unknown'}
                                    </p>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-navy-500">
                                      <span>Partner: {affiliatePartners.find(p => p.id === conversion.partnerId)?.name || 'Unknown'}</span>
                                      <span>Link: {affiliateLinks.find(l => l.id === conversion.linkId)?.slug || 'Unknown'}</span>
                                      <span className={`px-2 py-1 rounded-full text-xs ${
                                        conversion.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                        conversion.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {conversion.status}
                                      </span>
                                    </div>
                                    <div className="text-xs text-navy-400 mt-1">
                                      Created: {new Date(conversion.createdAt).toLocaleDateString()}
                                      {conversion.confirmedAt && (
                                        <span className="ml-2">
                                          | Confirmed: {new Date(conversion.confirmedAt).toLocaleDateString()}
                                        </span>
                                      )}
                                      {conversion.reversedAt && (
                                        <span className="ml-2">
                                          | Reversed: {new Date(conversion.reversedAt).toLocaleDateString()}
                                        </span>
                                      )}
                                    </div>
                                    {conversion.notes && (
                                      <p className="text-sm text-navy-600 mt-2">{conversion.notes}</p>
                                    )}
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => {
                                        setNewConversion({
                                          linkId: conversion.linkId,
                                          partnerId: conversion.partnerId,
                                          productId: conversion.productId,
                                          amount: conversion.amount,
                                          currency: conversion.currency,
                                          notes: conversion.notes || '',
                                          status: conversion.status
                                        });
                                        setShowConversionForm(true);
                                      }}
                                      className="px-3 py-1 text-sm bg-navy-600 text-white rounded hover:bg-navy-700"
                                    >
                                      Edit
                                    </button>
                                    <div className="flex flex-col space-y-1">
                                      <button
                                        onClick={() => {
                                          affiliateManager.updateConversionStatus(conversion.id, 'confirmed');
                                          loadAffiliateData();
                                        }}
                                        disabled={conversion.status === 'confirmed'}
                                        className="px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                      >
                                        Confirm
                                      </button>
                                      <button
                                        onClick={() => {
                                          affiliateManager.updateConversionStatus(conversion.id, 'reversed');
                                          loadAffiliateData();
                                        }}
                                        disabled={conversion.status === 'reversed'}
                                        className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                      >
                                        Reverse
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => {
                                        if (confirm('Are you sure you want to delete this conversion?')) {
                                          // Note: We'll need to add deleteConversion method to AffiliateManager
                                          alert('Delete functionality coming soon');
                                        }
                                      }}
                                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-navy-500">
                            No conversions found. Add your first conversion record to get started.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add/Edit Conversion Form */}
                    {showConversionForm && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                          <h3 className="text-lg font-medium text-navy-900 mb-4">
                            {newConversion.linkId ? 'Edit Conversion' : 'Add New Conversion'}
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Link</label>
                              <select
                                value={newConversion.linkId}
                                onChange={(e) => {
                                  const link = affiliateLinks.find(l => l.id === e.target.value);
                                  setNewConversion({
                                    ...newConversion,
                                    linkId: e.target.value,
                                    partnerId: link?.partnerId || '',
                                    productId: link?.productId || ''
                                  });
                                }}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              >
                                <option value="">Select Link</option>
                                {affiliateLinks.map(link => (
                                  <option key={link.id} value={link.id}>/{link.slug}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Partner</label>
                              <select
                                value={newConversion.partnerId}
                                onChange={(e) => setNewConversion({...newConversion, partnerId: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              >
                                <option value="">Select Partner</option>
                                {affiliatePartners.map(partner => (
                                  <option key={partner.id} value={partner.id}>{partner.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Product</label>
                              <select
                                value={newConversion.productId}
                                onChange={(e) => setNewConversion({...newConversion, productId: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              >
                                <option value="">Select Product</option>
                                {affiliateProducts.map(product => (
                                  <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                              </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-2">Amount</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={newConversion.amount}
                                  onChange={(e) => setNewConversion({...newConversion, amount: parseFloat(e.target.value) || 0})}
                                  className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-2">Currency</label>
                                <select
                                  value={newConversion.currency}
                                  onChange={(e) => setNewConversion({...newConversion, currency: e.target.value})}
                                  className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                  required
                                >
                                  <option value="USD">USD</option>
                                  <option value="EUR">EUR</option>
                                  <option value="GBP">GBP</option>
                                  <option value="CAD">CAD</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Notes</label>
                              <textarea
                                value={newConversion.notes}
                                onChange={(e) => setNewConversion({...newConversion, notes: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                rows={2}
                              />
                            </div>
                          </div>
                          <div className="flex space-x-3 mt-6">
                            <button
                              onClick={addConversion}
                              className="flex-1 px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                            >
                              {newConversion.linkId ? 'Update Conversion' : 'Add Conversion'}
                            </button>
                            <button
                              onClick={() => {
                                setShowConversionForm(false);
                                setNewConversion({
                                  linkId: '',
                                  partnerId: '',
                                  productId: '',
                                  amount: 0,
                                  currency: 'USD',
                                  notes: '',
                                  status: 'pending' as const
                                });
                              }}
                              className="flex-1 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Analytics Tab */}
                {affiliateTab === 'analytics' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-navy-900">Affiliate Analytics</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={exportAffiliateAnalyticsCSV}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Export Analytics CSV
                        </button>
                        <button
                          onClick={exportClickEventsCSV}
                          className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                        >
                          Export Click Events CSV
                        </button>
                      </div>
                    </div>
                    
                    {/* Analytics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                        <h4 className="text-sm font-medium text-navy-600 mb-2">Total Clicks (30 days)</h4>
                        <p className="text-2xl font-bold text-navy-900">
                          {affiliateManager.getAnalytics().totalClicks}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                        <h4 className="text-sm font-medium text-navy-600 mb-2">Total Conversions</h4>
                        <p className="text-2xl font-bold text-emerald-600">
                          {affiliateManager.getAnalytics().totalConversions}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                        <h4 className="text-sm font-medium text-navy-600 mb-2">Conversion Rate</h4>
                        <p className="text-2xl font-bold text-gold-600">
                          {affiliateManager.getAnalytics().conversionRate.toFixed(1)}%
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                        <h4 className="text-sm font-medium text-navy-600 mb-2">Total Revenue</h4>
                        <p className="text-2xl font-bold text-purple-600">
                          ${affiliateManager.getAnalytics().totalRevenue.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Recent Click Events */}
                    <div className="bg-white rounded-lg shadow-sm border border-navy-100">
                      <div className="p-6 border-b border-navy-100">
                        <h4 className="text-lg font-medium text-navy-900">Recent Click Events</h4>
                      </div>
                      <div className="p-6">
                        {affiliateManager.getAnalytics().events.length > 0 ? (
                          <div className="space-y-3">
                            {affiliateManager.getAnalytics().events.slice(0, 10).map(event => (
                              <div key={event.id} className="flex justify-between items-center py-2 border-b border-navy-100 last:border-b-0">
                                <div>
                                  <span className="font-medium text-navy-900">/{event.slug}</span>
                                  <span className="text-sm text-navy-500 ml-2">
                                    {new Date(event.timestamp).toLocaleString()}
                                  </span>
                                </div>
                                <div className="text-sm text-navy-500">
                                  {event.referrer ? (
                                    <span>From: {event.referrer}</span>
                                  ) : (
                                    <span>Direct</span>
                                  )}
                                  {event.conversion && (
                                    <span className="ml-2 text-emerald-600 font-medium">
                                      ✓ Conversion ${event.conversionValue}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-navy-500">
                            No click events recorded yet.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Recent Conversions */}
                    <div className="bg-white rounded-lg shadow-sm border border-navy-100">
                      <div className="p-6 border-b border-navy-100">
                        <h4 className="text-lg font-medium text-navy-900">Recent Conversions</h4>
                      </div>
                      <div className="p-6">
                        {affiliateManager.getAnalytics().conversions.length > 0 ? (
                          <div className="space-y-3">
                            {affiliateManager.getAnalytics().conversions.slice(0, 10).map(conversion => (
                              <div key={conversion.id} className="flex justify-between items-center py-2 border-b border-navy-100 last:border-b-0">
                                <div>
                                  <span className="font-medium text-navy-900">
                                    ${conversion.amount} {conversion.currency}
                                  </span>
                                  <span className="text-sm text-navy-500 ml-2">
                                    {new Date(conversion.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="text-sm text-navy-500">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    conversion.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                    conversion.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {conversion.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-navy-500">
                            No conversions recorded yet.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Payouts Tab */}
                {affiliateTab === 'payouts' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-navy-900">Affiliate Payouts</h3>
                      <button
                        onClick={() => setShowPayoutForm(true)}
                        className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                      >
                        Add Payout
                      </button>
                    </div>
                    
                    {/* Payouts List */}
                    <div className="bg-white rounded-lg shadow-sm border border-navy-100">
                      <div className="p-6">
                        {affiliatePayouts.length > 0 ? (
                          <div className="space-y-4">
                            {affiliatePayouts.map(payout => (
                              <div key={payout.id} className="border border-navy-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-navy-900">
                                      {affiliatePartners.find(p => p.id === payout.partnerId)?.name || 'Unknown Partner'}
                                    </h4>
                                    <p className="text-sm text-navy-600 mt-1">Period: {payout.period}</p>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-navy-500">
                                      <span>Clicks: {payout.clicks}</span>
                                      <span>Conversions: {payout.conversions}</span>
                                      <span>Revenue: ${payout.revenue.toFixed(2)}</span>
                                      <span>Commission: ${payout.commission.toFixed(2)}</span>
                                      <span className={`px-2 py-1 rounded-full text-xs ${
                                        payout.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                                        payout.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {payout.status}
                                      </span>
                                    </div>
                                    {payout.transactionRef && (
                                      <p className="text-xs text-navy-400 mt-1">
                                        Transaction: {payout.transactionRef}
                                      </p>
                                    )}
                                    {payout.notes && (
                                      <p className="text-sm text-navy-600 mt-2">{payout.notes}</p>
                                    )}
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => {
                                        setNewPayout({
                                          partnerId: payout.partnerId,
                                          period: payout.period,
                                          clicks: payout.clicks,
                                          conversions: payout.conversions,
                                          revenue: payout.revenue,
                                          commission: payout.commission,
                                          notes: payout.notes || '',
                                          transactionRef: payout.transactionRef || '',
                                          status: payout.status
                                        });
                                        setShowPayoutForm(true);
                                      }}
                                      className="px-3 py-1 text-sm bg-navy-600 text-white rounded hover:bg-navy-700"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm('Are you sure you want to delete this payout?')) {
                                          affiliateManager.deletePayout(payout.id);
                                          loadAffiliateData();
                                        }
                                      }}
                                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-navy-500">
                            No payouts found. Add your first payout record to get started.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add/Edit Payout Form */}
                    {showPayoutForm && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                          <h3 className="text-lg font-medium text-navy-900 mb-4">
                            {newPayout.partnerId ? 'Edit Payout' : 'Add New Payout'}
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Partner</label>
                              <select
                                value={newPayout.partnerId}
                                onChange={(e) => setNewPayout({...newPayout, partnerId: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                required
                              >
                                <option value="">Select Partner</option>
                                {affiliatePartners.map(partner => (
                                  <option key={partner.id} value={partner.id}>{partner.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Period</label>
                              <input
                                type="text"
                                value={newPayout.period}
                                onChange={(e) => setNewPayout({...newPayout, period: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                placeholder="e.g., 2024-08"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-2">Clicks</label>
                                <input
                                  type="number"
                                  value={newPayout.clicks}
                                  onChange={(e) => setNewPayout({...newPayout, clicks: parseInt(e.target.value) || 0})}
                                  className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-2">Conversions</label>
                                <input
                                  type="number"
                                  value={newPayout.conversions}
                                  onChange={(e) => setNewPayout({...newPayout, conversions: parseInt(e.target.value) || 0})}
                                  className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-2">Revenue</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={newPayout.revenue}
                                  onChange={(e) => setNewPayout({...newPayout, revenue: parseFloat(e.target.value) || 0})}
                                  className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-2">Commission</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={newPayout.commission}
                                  onChange={(e) => setNewPayout({...newPayout, commission: parseFloat(e.target.value) || 0})}
                                  className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Transaction Reference</label>
                              <input
                                type="text"
                                value={newPayout.transactionRef}
                                onChange={(e) => setNewPayout({...newPayout, transactionRef: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                placeholder="e.g., TX-2024-08-001"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-2">Notes</label>
                              <textarea
                                value={newPayout.notes}
                                onChange={(e) => setNewPayout({...newPayout, notes: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                                rows={2}
                              />
                            </div>
                          </div>
                          <div className="flex space-x-3 mt-6">
                            <button
                              onClick={addPayout}
                              className="flex-1 px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                            >
                              {newPayout.partnerId ? 'Update Payout' : 'Add Payout'}
                            </button>
                            <button
                              onClick={() => {
                                setShowPayoutForm(false);
                                setNewPayout({
                                  partnerId: '',
                                  period: '',
                                  clicks: 0,
                                  conversions: 0,
                                  revenue: 0,
                                  commission: 0,
                                  notes: '',
                                  transactionRef: '',
                                  status: 'pending' as const
                                });
                              }}
                              className="flex-1 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Applications Tab */}
                {affiliateTab === 'applications' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-navy-900">Affiliate Applications</h3>
                      <div className="flex space-x-3">
                        <select
                          value={applicationFilter}
                          onChange={(e) => setApplicationFilter(e.target.value as any)}
                          className="px-3 py-2 border border-navy-200 rounded-lg text-sm"
                        >
                          <option value="all">All Applications</option>
                          <option value="not-applied">Not Applied</option>
                          <option value="applied">Applied</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                          <option value="pending-review">Pending Review</option>
                        </select>
                        <button
                          onClick={() => setShowApplicationForm(true)}
                          className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                        >
                          Add Application
                        </button>
                        <button
                          onClick={() => {
                            const csv = affiliateManager.exportApplicationsCSV();
                            const blob = new Blob([csv], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'affiliate-applications.csv';
                            a.click();
                            window.URL.revokeObjectURL(url);
                          }}
                          className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                        >
                          Export CSV
                        </button>
                      </div>
                    </div>

                    {/* Application Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {(() => {
                        const stats = affiliateManager.getApplicationStats();
                        return (
                          <>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-navy-100">
                              <div className="text-2xl font-bold text-navy-900">{stats.total}</div>
                              <div className="text-sm text-navy-600">Total Applications</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-navy-100">
                              <div className="text-2xl font-bold text-emerald-600">{stats.byStatus.approved || 0}</div>
                              <div className="text-sm text-navy-600">Approved</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-navy-100">
                              <div className="text-2xl font-bold text-yellow-600">{stats.byStatus.applied || 0}</div>
                              <div className="text-sm text-navy-600">Applied</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-navy-100">
                              <div className="text-2xl font-bold text-gold-600">${stats.totalEstimatedRevenue.toFixed(0)}</div>
                              <div className="text-sm text-navy-600">Est. Monthly Revenue</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    
                    {/* Applications List */}
                    <div className="bg-white rounded-lg shadow-sm border border-navy-100">
                      <div className="p-6">
                        {(() => {
                          const filteredApplications = applicationFilter === 'all' 
                            ? affiliateApplications 
                            : affiliateApplications.filter(app => app.status === applicationFilter);
                          
                          return filteredApplications.length > 0 ? (
                            <div className="space-y-4">
                              {filteredApplications.map(application => (
                                <div key={application.id} className="border border-navy-200 rounded-lg p-4">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-3">
                                        <h4 className="font-medium text-navy-900">{application.partnerName}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                          application.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                                          application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                                          application.status === 'pending-review' ? 'bg-yellow-100 text-yellow-800' :
                                          application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                          'bg-gray-100 text-gray-800'
                                        }`}>
                                          {application.status.replace('-', ' ')}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                          application.priority === 'high' ? 'bg-red-100 text-red-800' :
                                          application.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-green-100 text-green-800'
                                        }`}>
                                          {application.priority} priority
                                        </span>
                                      </div>
                                      <p className="text-sm text-navy-600 mt-1 capitalize">{application.category}</p>
                                      <div className="flex items-center space-x-4 mt-2 text-sm text-navy-500">
                                        <span>Commission: {application.commissionRate}</span>
                                        {application.estimatedMonthlyRevenue && (
                                          <span>Est. Revenue: ${application.estimatedMonthlyRevenue}/month</span>
                                        )}
                                        {application.applicationDate && (
                                          <span>Applied: {new Date(application.applicationDate).toLocaleDateString()}</span>
                                        )}
                                        {application.approvalDate && (
                                          <span>Approved: {new Date(application.approvalDate).toLocaleDateString()}</span>
                                        )}
                                      </div>
                                      {application.requirements.length > 0 && (
                                        <div className="mt-2">
                                          <p className="text-sm font-medium text-navy-700">Requirements:</p>
                                          <ul className="text-sm text-navy-600 mt-1 list-disc list-inside">
                                            {application.requirements.map((req, index) => (
                                              <li key={index}>{req}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {application.contactEmail && (
                                        <p className="text-sm text-navy-600 mt-2">
                                          Contact: {application.contactEmail}
                                        </p>
                                      )}
                                      {application.notes && (
                                        <p className="text-sm text-navy-600 mt-2">{application.notes}</p>
                                      )}
                                      {application.rejectionReason && (
                                        <p className="text-sm text-red-600 mt-2">
                                          Rejection reason: {application.rejectionReason}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                      <a
                                        href={application.applicationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 text-sm bg-navy-600 text-white rounded hover:bg-navy-700 text-center"
                                      >
                                        Apply
                                      </a>
                                      <div className="flex space-x-1">
                                        <button
                                          onClick={() => {
                                            const newStatus = application.status === 'not-applied' ? 'applied' : 
                                                           application.status === 'applied' ? 'approved' : 
                                                           application.status === 'approved' ? 'rejected' : 'not-applied';
                                            affiliateManager.updateApplicationStatus(application.id, newStatus as any, {
                                              applicationDate: newStatus === 'applied' ? new Date().toISOString() : undefined,
                                              approvalDate: newStatus === 'approved' ? new Date().toISOString() : undefined
                                            });
                                            loadAffiliateData();
                                          }}
                                          className="px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                        >
                                          {application.status === 'not-applied' ? 'Mark Applied' :
                                           application.status === 'applied' ? 'Mark Approved' :
                                           application.status === 'approved' ? 'Mark Rejected' : 'Reset'}
                                        </button>
                                        <button
                                          onClick={() => {
                                            if (confirm('Are you sure you want to delete this application?')) {
                                              affiliateManager.deleteApplication(application.id);
                                              loadAffiliateData();
                                            }
                                          }}
                                          className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-navy-500">
                              No applications found. Add your first application to get started.
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Add/Edit Application Form */}
                    {showApplicationForm && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                          <h3 className="text-lg font-medium text-navy-900 mb-4">Add New Application</h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-1">Partner Name</label>
                                <input
                                  type="text"
                                  value={newApplication.partnerName}
                                  onChange={(e) => setNewApplication({...newApplication, partnerName: e.target.value})}
                                  className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                  placeholder="e.g., Shopify"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-1">Category</label>
                                <select
                                  value={newApplication.category}
                                  onChange={(e) => setNewApplication({...newApplication, category: e.target.value as any})}
                                  className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                >
                                  <option value="banking">Banking</option>
                                  <option value="legal">Legal</option>
                                  <option value="financial">Financial</option>
                                  <option value="tools">Tools</option>
                                  <option value="insurance">Insurance</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-1">Application URL</label>
                              <input
                                type="url"
                                value={newApplication.applicationUrl}
                                onChange={(e) => setNewApplication({...newApplication, applicationUrl: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                placeholder="https://partners.example.com"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-1">Status</label>
                                <select
                                  value={newApplication.status}
                                  onChange={(e) => setNewApplication({...newApplication, status: e.target.value as any})}
                                  className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                >
                                  <option value="not-applied">Not Applied</option>
                                  <option value="applied">Applied</option>
                                  <option value="approved">Approved</option>
                                  <option value="rejected">Rejected</option>
                                  <option value="pending-review">Pending Review</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-1">Priority</label>
                                <select
                                  value={newApplication.priority}
                                  onChange={(e) => setNewApplication({...newApplication, priority: e.target.value as any})}
                                  className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                >
                                  <option value="low">Low</option>
                                  <option value="medium">Medium</option>
                                  <option value="high">High</option>
                                </select>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-1">Commission Rate</label>
                                <input
                                  type="text"
                                  value={newApplication.commissionRate}
                                  onChange={(e) => setNewApplication({...newApplication, commissionRate: e.target.value})}
                                  className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                  placeholder="e.g., 20% recurring"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-1">Est. Monthly Revenue</label>
                                <input
                                  type="number"
                                  value={newApplication.estimatedMonthlyRevenue}
                                  onChange={(e) => setNewApplication({...newApplication, estimatedMonthlyRevenue: Number(e.target.value)})}
                                  className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-1">Contact Email</label>
                                <input
                                  type="email"
                                  value={newApplication.contactEmail}
                                  onChange={(e) => setNewApplication({...newApplication, contactEmail: e.target.value})}
                                  className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                  placeholder="partners@example.com"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-1">Contact Phone</label>
                                <input
                                  type="tel"
                                  value={newApplication.contactPhone}
                                  onChange={(e) => setNewApplication({...newApplication, contactPhone: e.target.value})}
                                  className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                  placeholder="+1 (555) 123-4567"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-1">Requirements (one per line)</label>
                              <textarea
                                value={newApplication.requirements.join('\n')}
                                onChange={(e) => setNewApplication({...newApplication, requirements: e.target.value.split('\n').filter(r => r.trim())})}
                                className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                rows={3}
                                placeholder="Website with 1000+ monthly visitors&#10;Relevant content&#10;Active social media presence"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-700 mb-1">Notes</label>
                              <textarea
                                value={newApplication.notes}
                                onChange={(e) => setNewApplication({...newApplication, notes: e.target.value})}
                                className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                                rows={3}
                                placeholder="Additional notes about this application..."
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-3 mt-6">
                            <button
                              onClick={() => {
                                setNewApplication({
                                  partnerName: '',
                                  category: 'tools',
                                  applicationUrl: '',
                                  status: 'not-applied',
                                  commissionRate: '',
                                  requirements: [],
                                  contactEmail: '',
                                  contactPhone: '',
                                  notes: '',
                                  priority: 'medium',
                                  estimatedMonthlyRevenue: 0
                                });
                                setShowApplicationForm(false);
                              }}
                              className="px-4 py-2 text-navy-600 border border-navy-200 rounded-lg hover:bg-navy-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                try {
                                  affiliateManager.addApplication(newApplication);
                                  loadAffiliateData();
                                  setNewApplication({
                                    partnerName: '',
                                    category: 'tools',
                                    applicationUrl: '',
                                    status: 'not-applied',
                                    commissionRate: '',
                                    requirements: [],
                                    contactEmail: '',
                                    contactPhone: '',
                                    notes: '',
                                    priority: 'medium',
                                    estimatedMonthlyRevenue: 0
                                  });
                                  setShowApplicationForm(false);
                                  alert('Application added successfully!');
                                } catch (error) {
                                  console.error('Error adding application:', error);
                                  alert('Error adding application. Please try again.');
                                }
                              }}
                              className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700"
                            >
                              Add Application
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Settings Tab */}
                {affiliateTab === 'settings' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-navy-900">Affiliate Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-2">
                          Affiliate Disclosure Text
                        </label>
                        <textarea
                          value={affiliateSettings.disclosureText}
                          onChange={(e) => setAffiliateSettings({...affiliateSettings, disclosureText: e.target.value})}
                          className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-navy-700 mb-2">
                            Default UTM Source
                          </label>
                          <input
                            type="text"
                            value={affiliateSettings.defaultUtmSource}
                            onChange={(e) => setAffiliateSettings({...affiliateSettings, defaultUtmSource: e.target.value})}
                            className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy-700 mb-2">
                            Default UTM Medium
                          </label>
                          <input
                            type="text"
                            value={affiliateSettings.defaultUtmMedium}
                            onChange={(e) => setAffiliateSettings({...affiliateSettings, defaultUtmMedium: e.target.value})}
                            className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={affiliateSettings.trackingEnabled}
                            onChange={(e) => setAffiliateSettings({...affiliateSettings, trackingEnabled: e.target.checked})}
                            className="mr-2"
                          />
                          <span className="text-sm text-navy-700">Enable Click Tracking</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={affiliateSettings.conversionTracking}
                            onChange={(e) => setAffiliateSettings({...affiliateSettings, conversionTracking: e.target.checked})}
                            className="mr-2"
                          />
                          <span className="text-sm text-navy-700">Enable Conversion Tracking</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Queue Export Tab */}
                {affiliateTab === 'social-export' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-navy-900">Social Queue Export</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={exportSocialQueueCSV}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Export CSV
                        </button>
                        <button
                          onClick={exportSocialQueueJSON}
                          className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                        >
                          Export JSON
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-navy-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-navy-700 mb-2">Export Options</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-navy-600 mb-1">Platform</label>
                          <select
                            value={socialExportPlatform}
                            onChange={(e) => setSocialExportPlatform(e.target.value)}
                            className="w-full px-3 py-2 border border-navy-300 rounded-md text-sm"
                          >
                            <option value="all">All Platforms</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="facebook">Facebook</option>
                            <option value="pinterest">Pinterest</option>
                            <option value="youtube">YouTube</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy-600 mb-1">Export Type</label>
                          <select
                            value={socialExportType}
                            onChange={(e) => setSocialExportType(e.target.value)}
                            className="w-full px-3 py-2 border border-navy-300 rounded-md text-sm"
                          >
                            <option value="all">All Posts</option>
                            <option value="featured">Featured Posts Only</option>
                            <option value="recent">Recent Posts (Last 30 days)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy-600 mb-1">Format</label>
                          <select
                            value={socialExportFormat}
                            onChange={(e) => setSocialExportFormat(e.target.value)}
                            className="w-full px-3 py-2 border border-navy-300 rounded-md text-sm"
                          >
                            <option value="csv">CSV</option>
                            <option value="json">JSON</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-navy-600">
                      <p>Export your blog posts with social distribution fields for content scheduling and social media management.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            {/* Payment Dashboard Tabs */}
            <div className="mb-6">
              <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'settings', label: 'Settings' },
                  { id: 'records', label: 'Records' },
                  { id: 'invoices', label: 'Invoices' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setPaymentTab(tab.id as 'overview' | 'settings' | 'records' | 'invoices')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      paymentTab === tab.id
                        ? 'bg-white text-navy-900 shadow-sm'
                        : 'text-navy-600 hover:text-navy-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Overview Tab */}
            {paymentTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">Total Payments</h3>
                    <p className="text-3xl font-bold text-gold-600">{paymentModule.getPaymentAnalytics().totalPayments || 0}</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold text-emerald-600">${(paymentModule.getPaymentAnalytics().totalRevenue || 0).toLocaleString()}</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">Pending Invoices</h3>
                    <p className="text-3xl font-bold text-navy-600">{paymentModule.getPaymentAnalytics().pendingInvoices || 0}</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                    <p className="text-3xl font-bold text-purple-600">${(paymentModule.getPaymentAnalytics().pendingAmount || 0).toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-navy-100">
                  <div className="p-6 border-b border-navy-100">
                    <h3 className="text-lg font-semibold text-navy-900">Payment Methods</h3>
                  </div>
                  <div className="p-6">
                    <div className="text-navy-600 text-center py-8">
                      {Object.keys(paymentModule.getPaymentAnalytics().paymentMethods || {}).length > 0 ? (
                        <div className="space-y-2">
                          {Object.entries(paymentModule.getPaymentAnalytics().paymentMethods || {}).map(([method, count]) => (
                            <div key={method} className="flex justify-between items-center">
                              <span className="capitalize">{method.replace('-', ' ')}</span>
                              <span className="font-semibold">{count as number}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        'No payment methods recorded yet'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {paymentTab === 'settings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-navy-900">Payment Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-2">
                      Bank Transfer Instructions
                    </label>
                    <textarea
                      value={paymentSettings.bankTransferInstructions}
                      onChange={(e) => setPaymentSettings({...paymentSettings, bankTransferInstructions: e.target.value})}
                      className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-2">
                      Crypto Wallet Address
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.cryptoWalletAddress}
                      onChange={(e) => setPaymentSettings({...paymentSettings, cryptoWalletAddress: e.target.value})}
                      className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-2">
                      Custom Payment Notes
                    </label>
                    <textarea
                      value={paymentSettings.customNotes}
                      onChange={(e) => setPaymentSettings({...paymentSettings, customNotes: e.target.value})}
                      className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                      rows={2}
                    />
                  </div>
                  <button
                    onClick={savePaymentSettings}
                    className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            )}

            {/* Records Tab */}
            {paymentTab === 'records' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-navy-900">Payment Records</h3>
                  <button
                    onClick={exportPaymentsCSV}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
                <div className="text-center py-8 text-navy-500">
                  Payment records management coming soon...
                </div>
              </div>
            )}

            {/* Invoices Tab */}
            {paymentTab === 'invoices' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-navy-900">Invoices</h3>
                  <button
                    onClick={exportInvoicesCSV}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
                <div className="text-center py-8 text-navy-500">
                  Invoice management coming soon...
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Total Events</h3>
                <p className="text-3xl font-bold text-gold-600">{analyticsData.totalEvents}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Pages Viewed</h3>
                <p className="text-3xl font-bold text-emerald-600">{analyticsData.pagesViewed}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Conversions</h3>
                <p className="text-3xl font-bold text-navy-600">{analyticsData.conversions}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-navy-100">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Performance</h3>
                <p className="text-3xl font-bold text-purple-600">{analyticsData.performanceScore}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-navy-100">
              <div className="p-6 border-b border-navy-100">
                <h3 className="text-lg font-semibold text-navy-900">Conversion Funnel</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(analyticsData.conversionFunnel).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-navy-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-navy-900 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emails Tab */}
        {activeTab === 'emails' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-navy-100">
              <div className="p-6 border-b border-navy-100">
                <h3 className="text-lg font-semibold text-navy-900">Email Template Management</h3>
                <p className="text-navy-600 mt-1">Generate copy-paste email templates for manual sending</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Email Templates */}
                <div>
                  <h4 className="text-md font-medium text-navy-900 mb-4">Email Templates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(emailTemplates).map(([key, template]) => (
                      <div key={key} className="border border-navy-200 rounded-lg p-4 hover:border-navy-300 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-navy-900">{template.label}</h5>
                          <Mail className="h-4 w-4 text-navy-400" />
                        </div>
                        <p className="text-sm text-navy-600 mb-3">{template.subject}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenEmailTemplate(key)}
                            className="px-3 py-1 bg-navy-600 text-white text-sm rounded hover:bg-navy-700 transition-colors"
                          >
                            Generate Template
                          </button>
                          {selectedUsers.length > 0 && (
                            <button
                              onClick={() => {
                                const user = recentActivity.find(u => selectedUsers.includes(u.id));
                                if (user) handleOpenEmailTemplate(key, user);
                              }}
                              className="px-3 py-1 bg-gold-600 text-white text-sm rounded hover:bg-gold-700 transition-colors"
                            >
                              For Selected User
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Users Info */}
                {selectedUsers.length > 0 && (
                  <div className="bg-navy-50 rounded-lg p-4">
                    <h4 className="text-md font-medium text-navy-900 mb-2">
                      Selected Users ({selectedUsers.length})
                    </h4>
                    <div className="space-y-1">
                      {recentActivity
                        .filter(user => selectedUsers.includes(user.id))
                        .map(user => (
                          <div key={user.id} className="text-sm text-navy-600">
                            {user.email} - {user.status}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-emerald-900 mb-2">How to Use</h4>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Select a template to generate a pre-filled email</li>
                    <li>• Edit the subject and body as needed</li>
                    <li>• Copy the content and paste into Gmail or your email client</li>
                    <li>• Client data is automatically substituted from user records</li>
                    <li>• Future: Templates can be sent directly via email service</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm border border-navy-100">
            <div className="p-6 border-b border-navy-100">
              <h3 className="text-lg font-semibold text-navy-900">Platform Settings</h3>
              <p className="text-navy-600 mt-1">Configure platform-wide settings and preferences</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-md font-medium text-navy-900 mb-4">System Configuration</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-navy-600">Email Notifications</span>
                    <button className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-md">
                      Enabled
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-navy-600">Analytics Tracking</span>
                    <button className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-md">
                      Enabled
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-navy-600">Payment Processing</span>
                    <button className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-md">
                      Active
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-navy-100">
                <h4 className="text-md font-medium text-navy-900 mb-4">Data Management</h4>
                <div className="space-y-4">
                  <button className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors">
                    <Download className="h-4 w-4 inline mr-2" />
                    Export Analytics Data
                  </button>
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                    <Activity className="h-4 w-4 inline mr-2" />
                    Clear Analytics Cache
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Environment Tab */}
        {activeTab === 'environment' && (
          <div className="bg-white rounded-lg shadow-sm border border-navy-100">
            <div className="p-6 border-b border-navy-100">
              <h3 className="text-lg font-semibold text-navy-900">Environment Variables</h3>
              <p className="text-navy-600 mt-1">Current environment configuration (read-only)</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-md font-medium text-navy-900 mb-4">Site Configuration</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Site URL</span>
                    <span className="text-navy-900 font-mono text-sm">{import.meta.env.VITE_SITE_URL || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Site Name</span>
                    <span className="text-navy-900 font-mono text-sm">{import.meta.env.VITE_SITE_NAME || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Contact Email</span>
                    <span className="text-navy-900 font-mono text-sm">{import.meta.env.VITE_CONTACT_EMAIL || 'Not set'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-navy-100">
                <h4 className="text-md font-medium text-navy-900 mb-4">Payment Instructions</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Bank Transfer</span>
                    <span className="text-navy-900 font-mono text-sm max-w-md truncate">{import.meta.env.VITE_BANK_TRANSFER_INSTRUCTIONS || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Crypto Wallet</span>
                    <span className="text-navy-900 font-mono text-sm max-w-md truncate">{import.meta.env.VITE_CRYPTO_WALLET_ADDRESS || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Payment Notes</span>
                    <span className="text-navy-900 font-mono text-sm max-w-md truncate">{import.meta.env.VITE_PAYMENT_NOTES || 'Not set'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-navy-100">
                <h4 className="text-md font-medium text-navy-900 mb-4">Email & Analytics</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Email Provider</span>
                    <span className="text-navy-900 font-mono text-sm">{import.meta.env.VITE_EMAIL_PROVIDER || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Analytics Provider</span>
                    <span className="text-navy-900 font-mono text-sm">{import.meta.env.VITE_ANALYTICS_PROVIDER || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Google Analytics ID</span>
                    <span className="text-navy-900 font-mono text-sm">{import.meta.env.VITE_GOOGLE_ANALYTICS_ID || 'Not set'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-navy-100">
                <h4 className="text-md font-medium text-navy-900 mb-4">SEO & Social</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Default OG Image</span>
                    <span className="text-navy-900 font-mono text-sm max-w-md truncate">{import.meta.env.VITE_DEFAULT_OG_IMAGE || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Twitter Handle</span>
                    <span className="text-navy-900 font-mono text-sm">{import.meta.env.VITE_TWITTER_HANDLE || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Facebook Page</span>
                    <span className="text-navy-900 font-mono text-sm">{import.meta.env.VITE_FACEBOOK_PAGE || 'Not set'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-navy-100">
                <h4 className="text-md font-medium text-navy-900 mb-4">Affiliate System</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
                    <span className="text-navy-600 font-medium">Disclosure Text</span>
                    <span className="text-navy-900 font-mono text-sm max-w-md truncate">{import.meta.env.VITE_AFFILIATE_DISCLOSURE_TEXT || 'Not set'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Explore + Formation Tab */}
        {activeTab === 'explore-formation' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-navy-900 mb-4">Explore + Formation Data</h3>
              <p className="text-navy-600 mb-4">Manage and export user exploration and formation data:</p>
            </div>
            
            {/* Export Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-navy-100">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-navy-900">
                      {exploreFormationExportService.getAdminSummary().totalExports}
                    </div>
                    <div className="text-sm text-navy-600">Total Exports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {exploreFormationExportService.getAdminSummary().exportsByConfidence.high || 0}
                    </div>
                    <div className="text-sm text-navy-600">High Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {exploreFormationExportService.getAdminSummary().exportsByConfidence.medium || 0}
                    </div>
                    <div className="text-sm text-navy-600">Medium Confidence</div>
                  </div>
                </div>
                
                {/* Export Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const csvData = exploreFormationExportService.exportAllData('csv');
                      const blob = new Blob([csvData], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `una-explore-formation-data-${new Date().toISOString().split('T')[0]}.csv`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                  >
                    Export All Data (CSV)
                  </button>
                  
                  <button
                    onClick={() => {
                      const jsonData = exploreFormationExportService.exportAllData('json');
                      const blob = new Blob([jsonData], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `una-explore-formation-data-${new Date().toISOString().split('T')[0]}.json`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                  >
                    Export All Data (JSON)
                  </button>
                  
                  <button
                    onClick={() => {
                      const csvData = exploreFormationExportService.exportAllData('csv');
                      const blob = new Blob([csvData], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `una-explore-formation-data-${new Date().toISOString().split('T')[0]}.csv`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Export All Data (CSV)
                  </button>
                  
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all export data? This action cannot be undone.')) {
                        exploreFormationExportService.clearAllExports();
                        window.location.reload();
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Clear All Data
                  </button>
                </div>
              </div>
            </div>
            
            {/* Recent Exports */}
            <div className="bg-white rounded-lg shadow-sm border border-navy-100">
              <div className="p-6 border-b border-navy-100">
                <h4 className="text-lg font-medium text-navy-900">Recent Exports</h4>
              </div>
              <div className="p-6">
                {exploreFormationExportService.getAdminSummary().recentExports.length > 0 ? (
                  <div className="space-y-4">
                    {exploreFormationExportService.getAdminSummary().recentExports.map(exportData => (
                      <div key={exportData.id} className="border border-navy-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="font-medium text-navy-900">Export {exportData.id}</h5>
                            <p className="text-sm text-navy-600">
                              {new Date(exportData.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                const csvData = exploreFormationExportService.exportToCSV(exportData.id);
                                const blob = new Blob([csvData], { type: 'text/csv' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `una-export-${exportData.id}.csv`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                              }}
                              className="px-3 py-1 text-sm bg-navy-600 text-white rounded hover:bg-navy-700"
                            >
                              CSV
                            </button>
                            <button
                              onClick={() => {
                                const jsonData = exploreFormationExportService.exportToJSON(exportData.id);
                                const blob = new Blob([jsonData], { type: 'application/json' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `una-export-${exportData.id}.json`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                              }}
                              className="px-3 py-1 text-sm bg-gold-600 text-white rounded hover:bg-gold-700"
                            >
                              JSON
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this export?')) {
                                  exploreFormationExportService.deleteExport(exportData.id);
                                  window.location.reload();
                                }
                              }}
                              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-navy-700">Confidence:</span>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                              exportData.metadata.confidence === 'high' ? 'bg-emerald-100 text-emerald-800' :
                              exportData.metadata.confidence === 'medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {exportData.metadata.confidence}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-navy-700">Gaps:</span>
                            <span className="ml-2 text-navy-600">{exportData.metadata.gaps.length}</span>
                          </div>
                          <div>
                            <span className="font-medium text-navy-700">Strategic Steps:</span>
                            <span className="ml-2 text-navy-600">{exportData.metadata.strategicSteps.length}</span>
                          </div>
                          <div>
                            <span className="font-medium text-navy-700">Formation Fields:</span>
                            <span className="ml-2 text-navy-600">{exportData.formationData.refinements.length}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-navy-500">
                    No exports found. User exploration and formation data will appear here.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Blog Management Section */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-navy-100">
              <div className="p-6 border-b border-navy-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-navy-900">Blog Management</h3>
                  <p className="text-sm text-navy-600 mt-1">Create, edit, and manage blog posts with SEO optimization</p>
                </div>
                <button
                  onClick={handleCreateBlog}
                  className="px-4 py-2 bg-[#C49A6C] text-white rounded-lg hover:bg-[#B88A5A] transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  New Blog Post
                </button>
              </div>
              <div className="p-6">
                {blogsLoading ? (
                  <div className="text-center py-8 text-navy-500">
                    Loading blogs...
                  </div>
                ) : blogPosts.length === 0 ? (
                  <div className="text-center py-12 text-navy-500">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-navy-300" />
                    <p className="text-lg font-medium mb-2">No blog posts yet</p>
                    <p className="text-sm mb-4">Create your first blog post to get started</p>
                    <button
                      onClick={handleCreateBlog}
                      className="px-6 py-2 bg-[#C49A6C] text-white rounded-lg hover:bg-[#B88A5A] transition-colors"
                    >
                      Create First Post
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="flex items-start justify-between p-4 border border-navy-200 rounded-lg hover:border-[#C49A6C] transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h5 className="font-medium text-navy-900 text-lg">{post.title}</h5>
                            {post.published ? (
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                Published
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                Draft
                              </span>
                            )}
                          </div>
                          {post.excerpt && (
                            <p className="text-sm text-navy-600 mb-2">{post.excerpt}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-navy-500">
                            <span>Slug: /{post.slug}</span>
                            {post.author && <span>By: {post.author}</span>}
                            {post.created_at && (
                              <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                            )}
                          </div>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-xs bg-[#C49A6C]/10 text-[#C49A6C] rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            className="px-3 py-1.5 text-sm border border-navy-300 text-navy-700 rounded hover:bg-navy-50 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditBlog(post)}
                            className="px-3 py-1.5 text-sm bg-[#C49A6C] text-white rounded hover:bg-[#B88A5A] transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => post.id && handleDeleteBlog(post.id)}
                            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Blog Editor Modal */}
        {showBlogEditor && (
          <BlogEditor
            blog={editingBlog}
            onClose={() => setShowBlogEditor(false)}
            onSave={handleBlogSaved}
          />
        )}
      </div>

      {/* Email Template Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={handleCloseEmailModal}
        subject={selectedTemplate?.subject || ''}
        body={selectedTemplate?.body || ''}
      />
    </div>
  );
}