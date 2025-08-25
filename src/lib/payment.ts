import { User, Purchase } from './auth';
import { getPackageById, calculateTotalPrice } from './pricing';

export interface PaymentIntent {
  id: string;
  amount: number;
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'failed';
  client_secret: string;
  currency: string;
  metadata?: Record<string, string>;
}

export interface Order {
  id: string;
  userId: string;
  packages: string[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  paymentIntentId?: string;
  createdAt: Date;
  completedAt?: Date;
  failureReason?: string;
  refundStatus?: 'none' | 'partial' | 'full';
  refundAmount?: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  last4?: string;
  brand?: string;
  expMonth?: number;
  expYear?: number;
  isDefault: boolean;
}

// Enhanced payment service with production-ready patterns
class PaymentService {
  private orders: Order[] = [];

  // Initialize Stripe (in production, this would be called with your publishable key)
  private initializeStripe() {
    // This would be: return loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
    console.log('Stripe initialized for payment processing');
  }

  async createPaymentIntent(amount: number, currency: string = 'usd', metadata?: Record<string, string>): Promise<PaymentIntent> {
    try {
      this.initializeStripe();
      
      // Simulate API call with proper error handling
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const paymentIntent: PaymentIntent = {
        id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount,
        status: 'requires_payment_method',
        client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
        currency,
        metadata
      };
      
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent. Please try again.');
    }
  }

  async confirmPayment(_paymentIntentId: string, _paymentMethod: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate payment processing with realistic timing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate various payment scenarios
      const scenario = Math.random();
      
      if (scenario < 0.85) {
        // 85% success rate
        return { success: true };
      } else if (scenario < 0.90) {
        // 5% insufficient funds
        return { success: false, error: 'Insufficient funds' };
      } else if (scenario < 0.93) {
        // 3% card declined
        return { success: false, error: 'Card declined' };
      } else if (scenario < 0.95) {
        // 2% expired card
        return { success: false, error: 'Card expired' };
      } else {
        // 5% other errors
        return { success: false, error: 'Payment processing failed' };
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      return { success: false, error: 'Payment confirmation failed' };
    }
  }

  async createOrder(userId: string, packageIds: string[]): Promise<Order> {
    try {
      const totalAmount = calculateTotalPrice(packageIds);
      
      const order: Order = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        packages: packageIds,
        totalAmount,
        status: 'pending',
        createdAt: new Date()
      };
      
      this.orders.push(order);
      
      // Log order creation for analytics
      console.log(`Order created: ${order.id} for user ${userId}, amount: $${totalAmount}`);
      
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order. Please try again.');
    }
  }

  async processOrder(orderId: string, paymentIntentId: string): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {
      const order = this.orders.find(o => o.id === orderId);
      if (!order) {
        return { success: false, error: 'Order not found' };
      }
      
      // Update order status to processing
      order.status = 'processing';
      order.paymentIntentId = paymentIntentId;
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate payment success (95% success rate)
      if (Math.random() > 0.05) {
        order.status = 'completed';
        order.completedAt = new Date();
        
        // Trigger post-payment actions
        await this.handlePostPaymentSuccess(order);
        
        return { success: true, order };
      } else {
        order.status = 'failed';
        order.failureReason = 'Payment processing failed';
        return { success: false, order, error: 'Payment processing failed' };
      }
    } catch (error) {
      console.error('Error processing order:', error);
      return { success: false, error: 'Order processing failed' };
    }
  }

  private async handlePostPaymentSuccess(order: Order): Promise<void> {
    try {
      // Send confirmation email
      // await notificationService.sendPaymentConfirmation(order);
      
      // Update user access
      // await updateUserAccess(order.userId, order.packages);
      
      // Log successful transaction
      console.log(`Order ${order.id} completed successfully for user ${order.userId}`);
      
      // Trigger analytics event
      // await analytics.track('purchase_completed', { orderId: order.id, amount: order.totalAmount });
      
    } catch (error) {
      console.error('Error in post-payment processing:', error);
      // Don't fail the order for post-payment processing errors
    }
  }

  async getOrder(orderId: string): Promise<Order | undefined> {
    return this.orders.find(o => o.id === orderId);
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orders.filter(o => o.userId === userId);
  }

  async cancelOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const order = this.orders.find(o => o.id === orderId);
      if (!order) {
        return { success: false, error: 'Order not found' };
      }
      
      if (order.status === 'completed') {
        return { success: false, error: 'Cannot cancel completed order' };
      }
      
      order.status = 'cancelled';
      return { success: true };
    } catch (error) {
      console.error('Error cancelling order:', error);
      return { success: false, error: 'Failed to cancel order' };
    }
  }

  async requestRefund(orderId: string, amount?: number): Promise<{ success: boolean; error?: string }> {
    try {
      const order = this.orders.find(o => o.id === orderId);
      if (!order) {
        return { success: false, error: 'Order not found' };
      }
      
      if (order.status !== 'completed') {
        return { success: false, error: 'Only completed orders can be refunded' };
      }
      
      const refundAmount = amount || order.totalAmount;
      order.refundStatus = refundAmount === order.totalAmount ? 'full' : 'partial';
      order.refundAmount = refundAmount;
      
      // Simulate refund processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    } catch (error) {
      console.error('Error processing refund:', error);
      return { success: false, error: 'Refund processing failed' };
    }
  }

  // Simulate Stripe webhook for payment success
  async handlePaymentSuccess(paymentIntentId: string): Promise<void> {
    try {
      const order = this.orders.find(o => o.paymentIntentId === paymentIntentId);
      if (order) {
        await this.processOrder(order.id, paymentIntentId);
      }
    } catch (error) {
      console.error('Error handling payment success webhook:', error);
    }
  }

  // Get payment analytics
  async getPaymentAnalytics(): Promise<{
    totalOrders: number;
    totalRevenue: number;
    successRate: number;
    averageOrderValue: number;
  }> {
    const totalOrders = this.orders.length;
    const completedOrders = this.orders.filter(o => o.status === 'completed');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const successRate = totalOrders > 0 ? (completedOrders.length / totalOrders) * 100 : 0;
    const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;
    
    return {
      totalOrders,
      totalRevenue,
      successRate,
      averageOrderValue
    };
  }
}

export const paymentService = new PaymentService();

// Helper function to create a purchase record after successful payment
export async function createPurchaseFromOrder(user: User, order: Order): Promise<Purchase> {
  const purchase: Purchase = {
    id: `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    packageId: order.packages.join(','), // For simplicity, combining package IDs
    amount: order.totalAmount,
    status: 'completed',
    createdAt: new Date(),
    documents: order.packages.flatMap(pkgId => {
      const pkg = getPackageById(pkgId);
      return pkg?.documents || [];
    })
  };
  
  // Add to user's purchases
  user.purchases.push(purchase);
  
  // Update localStorage
  localStorage.setItem('currentUser', JSON.stringify(user));
  
  return purchase;
}
