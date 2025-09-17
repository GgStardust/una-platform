export const emailTemplates = {
  confirmation: {
    label: "Strategy Session Confirmation",
    subject: "Your UNA Strategy Session is Confirmed",
    body: `Hello [First Name],

Thank you for booking your UNA Strategy Session. Your payment has been received and your session is scheduled.

Session Details:
- Date & Time: [Booking Date/Time]
- Location: Google Meet link (in your calendar invite)

Next Steps:
1. Complete your UNA Intake Form → [Secure Intake Link]
2. Prepare any questions or goals you'd like to focus on during the session.

We look forward to supporting you in forming your UNA with clarity and confidence.

Warm regards,
Gigi Stardust
UNA Formation Team`
  },

  intakeReminder: {
    label: "Intake Reminder",
    subject: "Please Complete Your UNA Intake Form",
    body: `Hello [First Name],

We noticed you haven't yet completed your UNA Intake Form. Filling this out before your Strategy Session helps us prepare your documents and maximize your session.

Complete your Intake Form here → [Secure Intake Link]

If you have any questions or run into issues, reply to this email and we'll help right away.

Thank you,
UNA Formation Support`
  },

  documentPrepUpsell: {
    label: "Document Prep Upsell",
    subject: "Take the Next Step: Apply Your $250 Credit Toward Document Prep",
    body: `Hello [First Name],

Thank you again for your UNA Strategy Session. We enjoyed exploring your goals and next steps together.

As a reminder, the $250 you invested in your session is fully credited toward our Document Preparation service. This means you save $250 when you move forward — your total investment for full document preparation is just $500.

Document Prep includes:
- Drafting your UNA Formation Agreement and key governance documents
- State-specific adjustments as needed
- A ready-to-use package you can present to banks, members, or partners

Next Step → Secure your Document Prep now: [Checkout Link]

We look forward to helping you bring your UNA into form.

Warm regards,
Gigi Stardust
UNA Formation Team`
  },

  adminFollowUp: {
    label: "Admin Follow-Up Reminder",
    subject: "Follow-Up Needed: [Client Name] – No Document Prep Yet",
    body: `Hello Team,

[Client Name] completed their UNA Strategy Session on [Date], but has not yet secured Document Preparation.

Client Info:
- Name: [Client Name]
- Email: [Client Email]
- Session Date: [Date/Time]
- Notes: [Any session notes from Intake or dashboard]

Action Items:
- Send a personal follow-up email or call to check in.
- Remind them of their $250 credit toward Document Prep.
- Offer support for any state-specific questions they may have.

This is a key conversion point — timely outreach helps reinforce value and increase uptake.

Thanks,
UNA Formation System`
  }
};
