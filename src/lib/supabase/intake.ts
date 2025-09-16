import { supabase } from '../supabase';

export interface IntakeRecord {
  id?: string;
  payment_id: string;
  booking_id: string;
  una_name?: string;
  state?: string;
  purpose?: string;
  members?: Record<string, unknown>[];
  governance?: Record<string, unknown>;
  operations?: Record<string, unknown>;
  extras?: Record<string, unknown>;
  organizer_info?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export async function saveIntake(data: IntakeRecord) {
  try {
    const { error } = await supabase
      .from('intakes')
      .upsert(data, { 
        onConflict: 'payment_id,booking_id',
        ignoreDuplicates: false 
      });
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error saving intake data:', error);
    throw error;
  }
}

export async function loadIntake(paymentId: string, bookingId: string): Promise<IntakeRecord | null> {
  try {
    const { data, error } = await supabase
      .from('intakes')
      .select('*')
      .eq('payment_id', paymentId)
      .eq('booking_id', bookingId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found - this is normal for new intakes
        return null;
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error loading intake data:', error);
    throw error;
  }
}

export async function checkPaymentAndBooking(paymentId: string, bookingId: string) {
  try {
    // Check if payment exists and is completed
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('id, status, customer_email')
      .eq('id', paymentId)
      .single();
    
    if (paymentError) throw paymentError;
    if (!payment || payment.status !== 'completed') {
      return { valid: false, reason: 'Payment not found or not completed' };
    }

    // Check if booking exists and is scheduled
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, status, scheduled_time')
      .eq('id', bookingId)
      .eq('payment_id', paymentId)
      .single();
    
    if (bookingError) {
      if (bookingError.code === 'PGRST116') {
        return { valid: false, reason: 'No booking found for this payment' };
      }
      throw bookingError;
    }
    
    if (!booking || booking.status !== 'scheduled') {
      return { valid: false, reason: 'Booking not found or not scheduled' };
    }

    return { 
      valid: true, 
      payment, 
      booking 
    };
  } catch (error) {
    console.error('Error checking payment and booking:', error);
    return { valid: false, reason: 'Database error' };
  }
}

// Helper function to map form data to Supabase schema
export function mapFormDataToIntake(
  formData: any, 
  paymentId: string, 
  bookingId: string
): IntakeRecord {
  return {
    payment_id: paymentId,
    booking_id: bookingId,
    una_name: formData.entityName || '',
    state: formData.entityState || '',
    purpose: formData.entityPurpose || '',
    members: formData.members || [],
    governance: {
      decision_making: formData.decisionMaking || '',
      officers: formData.officers || [],
      meeting_frequency: formData.meetingFrequency || '',
      voting_rights: formData.votingRights || ''
    },
    operations: {
      bank_account: formData.bankAccount || false,
      ein_needed: formData.einNeeded || false,
      fundraising_plans: formData.fundraisingPlans || '',
      budget_estimate: formData.budgetEstimate || '',
      financial_goals: formData.financialGoals || ''
    },
    extras: {
      uploaded_docs: formData.uploadedDocs || [],
      special_notes: formData.specialNotes || '',
      additional_requirements: formData.additionalRequirements || ''
    },
    organizer_info: {
      name: formData.organizerName || '',
      email: formData.organizerEmail || '',
      phone: formData.organizerPhone || '',
      role: formData.organizerRole || '',
      address: formData.organizerAddress || ''
    }
  };
}

// Helper function to map Supabase data back to form data
export function mapIntakeToFormData(intakeData: IntakeRecord): any {
  return {
    entityName: intakeData.una_name || '',
    entityState: intakeData.state || '',
    entityPurpose: intakeData.purpose || '',
    members: intakeData.members || [],
    decisionMaking: intakeData.governance?.decision_making || '',
    officers: intakeData.governance?.officers || [],
    meetingFrequency: intakeData.governance?.meeting_frequency || '',
    votingRights: intakeData.governance?.voting_rights || '',
    bankAccount: intakeData.operations?.bank_account || false,
    einNeeded: intakeData.operations?.ein_needed || false,
    fundraisingPlans: intakeData.operations?.fundraising_plans || '',
    budgetEstimate: intakeData.operations?.budget_estimate || '',
    financialGoals: intakeData.operations?.financial_goals || '',
    uploadedDocs: intakeData.extras?.uploaded_docs || [],
    specialNotes: intakeData.extras?.special_notes || '',
    additionalRequirements: intakeData.extras?.additional_requirements || '',
    organizerName: intakeData.organizer_info?.name || '',
    organizerEmail: intakeData.organizer_info?.email || '',
    organizerPhone: intakeData.organizer_info?.phone || '',
    organizerRole: intakeData.organizer_info?.role || '',
    organizerAddress: intakeData.organizer_info?.address || ''
  };
}


