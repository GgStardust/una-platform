export interface EmailTemplate {
  subject: string;
  body: string;
  htmlBody?: string;
  variables?: string[];
}

export interface NotificationData {
  to: string;
  template: string;
  data: Record<string, any>;
  priority?: 'low' | 'normal' | 'high';
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType: string;
  }>;
}

export interface EmailConfig {
  from: string;
  replyTo?: string;
  subjectPrefix?: string;
  enableTracking?: boolean;
}

// Enhanced email templates with S2S branding
export const emailTemplates: Record<string, EmailTemplate> = {
  welcome: {
    subject: 'Welcome to UNA Platform - Your Journey to Sovereignty Begins',
    body: `Dear {{name}},

Welcome to the UNA Platform! You've taken the first step toward creating your own sovereign organization.

We're here to guide you through every aspect of UNA formation, from initial exploration to legal recognition and beyond.

Your next steps:
1. Complete the exploration process to get personalized guidance
2. Fill out our comprehensive intake form
3. Receive your customized UNA documents
4. Access ongoing support and resources

If you have any questions, don't hesitate to reach out. We're committed to your success.

Welcome to sovereignty,
The UNA Platform Team`,
    htmlBody: `
      <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #C49A6C 0%, #1C1F3B 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Welcome to UNA Platform</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Journey to Sovereignty Begins</p>
        </div>
        
        <div style="background: #fdfcfb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e8e0d0;">
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Dear <strong>{{name}}</strong>,
          </p>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Welcome to the UNA Platform! You've taken the first step toward creating your own sovereign organization.
          </p>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We're here to guide you through every aspect of UNA formation, from initial exploration to legal recognition and beyond.
          </p>
          
          <div style="background: #f2f7f4; border-left: 4px solid #3E7A5E; padding: 20px; margin: 25px 0; border-radius: 0 5px 5px 0;">
            <h3 style="color: #3E7A5E; margin: 0 0 15px 0; font-size: 18px;">Your Next Steps:</h3>
            <ol style="color: #1C1F3B; margin: 0; padding-left: 20px;">
              <li>Complete the exploration process to get personalized guidance</li>
              <li>Fill out our comprehensive intake form</li>
              <li>Receive your customized UNA documents</li>
              <li>Access ongoing support and resources</li>
            </ol>
          </div>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions, don't hesitate to reach out. We're committed to your success.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{exploreUrl}}" style="background: #C49A6C; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Start Your Exploration
            </a>
          </div>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Welcome to sovereignty,<br>
            <strong>The UNA Platform Team</strong>
          </p>
        </div>
      </div>
    `,
    variables: ['name', 'exploreUrl']
  },
  
  intakeComplete: {
    subject: 'UNA Formation Intake Complete - Next Steps',
    body: `Dear {{name}},

Congratulations! You've completed the UNA formation intake process. Your information has been processed and we're preparing your customized documents.

What happens next:
1. Our team will review your information for completeness
2. You'll receive your personalized UNA Agreement within 24-48 hours
3. Additional formation guides will be provided based on your needs
4. Ongoing support will be available throughout your journey

If you need to make any changes to your information, please contact us immediately.

We're excited to support your sovereignty journey!

Best regards,
The UNA Platform Team`,
    htmlBody: `
      <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3E7A5E 0%, #1C1F3B 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Intake Complete!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your UNA Formation Journey Continues</p>
        </div>
        
        <div style="background: #fdfcfb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e8e0d0;">
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Dear <strong>{{name}}</strong>,
          </p>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Congratulations! You've completed the UNA formation intake process. Your information has been processed and we're preparing your customized documents.
          </p>
          
          <div style="background: #f2f7f4; border-left: 4px solid #3E7A5E; padding: 20px; margin: 25px 0; border-radius: 0 5px 5px 0;">
            <h3 style="color: #3E7A5E; margin: 0 0 15px 0; font-size: 18px;">What Happens Next:</h3>
            <ol style="color: #1C1F3B; margin: 0; padding-left: 20px;">
              <li>Our team will review your information for completeness</li>
              <li>You'll receive your personalized UNA Agreement within 24-48 hours</li>
              <li>Additional formation guides will be provided based on your needs</li>
              <li>Ongoing support will be available throughout your journey</li>
            </ol>
          </div>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            If you need to make any changes to your information, please contact us immediately.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{dashboardUrl}}" style="background: #3E7A5E; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              View Your Dashboard
            </a>
          </div>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We're excited to support your sovereignty journey!
          </p>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Best regards,<br>
            <strong>The UNA Platform Team</strong>
          </p>
        </div>
      </div>
    `,
    variables: ['name', 'dashboardUrl']
  },
  
  documentReady: {
    subject: 'Your UNA Documents Are Ready - Download Now',
    body: `Dear {{name}},

Great news! Your customized UNA formation documents are ready for download.

Documents included:
- UNA Agreement (customized for your organization)
- EIN Registration Guide
- Comprehensive Formation Guide
- Additional resources based on your needs

Please log into your dashboard to download these documents. They're valid for 30 days from today.

If you have any questions about the documents or need assistance with filing, please don't hesitate to contact us.

Congratulations on taking this important step toward sovereignty!

Best regards,
The UNA Platform Team`,
    htmlBody: `
      <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #C49A6C 0%, #3E7A5E 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Documents Ready!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your UNA Formation Package Awaits</p>
        </div>
        
        <div style="background: #fdfcfb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e8e0d0;">
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Dear <strong>{{name}}</strong>,
          </p>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Great news! Your customized UNA formation documents are ready for download.
          </p>
          
          <div style="background: #f9f0e6; border-left: 4px solid #C49A6C; padding: 20px; margin: 25px 0; border-radius: 0 5px 5px 0;">
            <h3 style="color: #C49A6C; margin: 0 0 15px 0; font-size: 18px;">Documents Included:</h3>
            <ul style="color: #1C1F3B; margin: 0; padding-left: 20px;">
              <li>UNA Agreement (customized for your organization)</li>
              <li>EIN Registration Guide</li>
              <li>Comprehensive Formation Guide</li>
              <li>Additional resources based on your needs</li>
            </ul>
          </div>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Please log into your dashboard to download these documents. They're valid for 30 days from today.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{dashboardUrl}}" style="background: #C49A6C; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Download Documents
            </a>
          </div>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions about the documents or need assistance with filing, please don't hesitate to contact us.
          </p>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Congratulations on taking this important step toward sovereignty!
          </p>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Best regards,<br>
            <strong>The UNA Platform Team</strong>
          </p>
        </div>
      </div>
    `,
    variables: ['name', 'dashboardUrl']
  },
  
  followUp: {
    subject: 'UNA Formation Follow-up - How Can We Help?',
    body: `Dear {{name}},

It's been a few days since you completed your UNA formation intake. We want to ensure you have everything you need to move forward successfully.

How can we help you today?
- Questions about your documents?
- Need assistance with filing?
- Want to explore additional services?
- Have feedback about your experience?

We're here to support your sovereignty journey every step of the way.

Best regards,
The UNA Platform Team`,
    htmlBody: `
      <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1C1F3B 0%, #3E7A5E 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">How Can We Help?</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your UNA Formation Journey Continues</p>
        </div>
        
        <div style="background: #fdfcfb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e8e0d0;">
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Dear <strong>{{name}}</strong>,
          </p>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            It's been a few days since you completed your UNA formation intake. We want to ensure you have everything you need to move forward successfully.
          </p>
          
          <div style="background: #f4f5f7; border-left: 4px solid #1C1F3B; padding: 20px; margin: 25px 0; border-radius: 0 5px 5px 0;">
            <h3 style="color: #1C1F3B; margin: 0 0 15px 0; font-size: 18px;">How Can We Help You Today?</h3>
            <ul style="color: #1C1F3B; margin: 0; padding-left: 20px;">
              <li>Questions about your documents?</li>
              <li>Need assistance with filing?</li>
              <li>Want to explore additional services?</li>
              <li>Have feedback about your experience?</li>
            </ul>
          </div>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We're here to support your sovereignty journey every step of the way.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{contactUrl}}" style="background: #1C1F3B; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Get in Touch
            </a>
          </div>
          
          <p style="color: #1C1F3B; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Best regards,<br>
            <strong>The UNA Platform Team</strong>
          </p>
        </div>
      </div>
    `,
    variables: ['name', 'contactUrl']
  }
};

// Enhanced notification service with production-ready features
export class NotificationService {
  private static instance: NotificationService;
  private emailQueue: NotificationData[] = [];
  private isProcessing: boolean = false;
  private config: EmailConfig = {
    from: 'noreply@unaplatform.com',
    replyTo: 'support@unaplatform.com',
    subjectPrefix: '[UNA Platform]',
    enableTracking: true
  };

  private constructor() {
    // Initialize email service configuration
    this.loadConfig();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private loadConfig(): void {
    try {
      // In production, this would load from environment variables or config service
      const envConfig = {
        from: process.env.EMAIL_FROM || 'noreply@unaplatform.com',
        replyTo: process.env.EMAIL_REPLY_TO || 'support@unaplatform.com',
        subjectPrefix: process.env.EMAIL_SUBJECT_PREFIX || '[UNA Platform]',
        enableTracking: process.env.EMAIL_TRACKING !== 'false'
      };
      
      this.config = { ...this.config, ...envConfig };
    } catch (error) {
      console.warn('Could not load email config, using defaults:', error);
    }
  }

  // Add email to queue
  addToQueue(notification: NotificationData): void {
    try {
      // Validate notification data
      if (!notification.to || !notification.template) {
        throw new Error('Invalid notification data');
      }

      // Add priority handling
      if (notification.priority === 'high') {
        this.emailQueue.unshift(notification);
      } else {
        this.emailQueue.push(notification);
      }

      // Process queue if not already processing
      if (!this.isProcessing) {
        this.processQueue();
      }
    } catch (error) {
      console.error('Error adding notification to queue:', error);
    }
  }

  // Process email queue
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.emailQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      while (this.emailQueue.length > 0) {
        const notification = this.emailQueue.shift();
        if (notification) {
          await this.sendEmail(notification);
          
          // Rate limiting - don't overwhelm email service
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    } catch (error) {
      console.error('Error processing email queue:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  // Send individual email
  async sendEmail(notification: NotificationData): Promise<boolean> {
    try {
      const template = emailTemplates[notification.template];
      if (!template) {
        throw new Error(`Email template '${notification.template}' not found`);
      }

      // Process template variables
      let subject = template.subject;
      let body = template.body;
      let htmlBody = template.htmlBody;

      if (template.variables) {
        template.variables.forEach(variable => {
          const value = notification.data[variable] || `{{${variable}}}`;
          const regex = new RegExp(`{{${variable}}}`, 'g');
          subject = subject.replace(regex, value);
          body = body.replace(regex, value);
          if (htmlBody) {
            htmlBody = htmlBody.replace(regex, value);
          }
        });
      }

      // Add subject prefix
      subject = `${this.config.subjectPrefix} ${subject}`;

      // In production, this would integrate with SendGrid, Mailgun, etc.
      console.log('Sending email:', {
        to: notification.to,
        from: this.config.from,
        subject,
        priority: notification.priority,
        hasAttachments: notification.attachments?.length || 0
      });

      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 500));

      // Log successful email
      console.log(`Email sent successfully to ${notification.to}`);

      return true;
    } catch (error) {
      console.error(`Failed to send email to ${notification.to}:`, error);
      return false;
    }
  }

  // Convenience methods for common notifications
  async sendWelcome(userEmail: string, userName: string): Promise<boolean> {
    return this.sendEmail({
      to: userEmail,
      template: 'welcome',
      data: {
        name: userName,
        exploreUrl: `${window.location.origin}/explore`
      }
    });
  }

  async sendIntakeComplete(userEmail: string, userName: string): Promise<boolean> {
    return this.sendEmail({
      to: userEmail,
      template: 'intakeComplete',
      data: {
        name: userName,
        dashboardUrl: `${window.location.origin}/dashboard`
      }
    });
  }

  async sendDocumentReady(userEmail: string, userName: string): Promise<boolean> {
    return this.sendEmail({
      to: userEmail,
      template: 'documentReady',
      data: {
        name: userName,
        dashboardUrl: `${window.location.origin}/dashboard`
      }
    });
  }

  async sendFollowUp(userEmail: string, userName: string): Promise<boolean> {
    return this.sendEmail({
      to: userEmail,
      template: 'followUp',
      data: {
        name: userName,
        contactUrl: `${window.location.origin}/contact`
      }
    });
  }

  // Get queue status
  getQueueStatus(): { queueLength: number; isProcessing: boolean } {
    return {
      queueLength: this.emailQueue.length,
      isProcessing: this.isProcessing
    };
  }

  // Clear queue (for testing/admin purposes)
  clearQueue(): void {
    this.emailQueue = [];
    this.isProcessing = false;
  }

  // Update configuration
  updateConfig(newConfig: Partial<EmailConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

export const notificationService = NotificationService.getInstance();
