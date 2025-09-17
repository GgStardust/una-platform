// Email service stub - ready for future integration with SendGrid, Resend, etc.

interface EmailData {
  to: string;
  subject: string;
  body: string;
  template?: string;
  clientData?: Record<string, any>;
}

export const emailService = {
  /**
   * Send email - currently logs to console, ready for real email service integration
   * @param emailData - Email data including recipient, subject, body
   * @returns Promise<boolean> - Success status
   */
  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // For now, just log the email data
      console.log('📧 Email would be sent:', {
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body.substring(0, 100) + '...',
        template: emailData.template,
        timestamp: new Date().toISOString()
      });

      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 100));

      // TODO: Replace with actual email service integration
      // Examples:
      // - SendGrid: await sgMail.send({ to, subject, text: body })
      // - Resend: await resend.emails.send({ from, to, subject, html: body })
      // - Nodemailer: await transporter.sendMail({ to, subject, text: body })

      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      return false;
    }
  },

  /**
   * Send bulk emails
   * @param emails - Array of email data
   * @returns Promise<{ success: number; failed: number }>
   */
  async sendBulkEmails(emails: EmailData[]): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const email of emails) {
      const result = await this.sendEmail(email);
      if (result) {
        success++;
      } else {
        failed++;
      }
    }

    return { success, failed };
  },

  /**
   * Validate email address format
   * @param email - Email address to validate
   * @returns boolean
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};

// Export individual functions for convenience
export const { sendEmail, sendBulkEmails, isValidEmail } = emailService;
