import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface IntakeData {
  id?: string;
  payment_id?: string;
  booking_id?: string;
  una_name?: string;
  state?: string;
  purpose?: string;
  members?: Member[];
  governance?: GovernanceData;
  operations?: OperationsData;
  extras?: ExtrasData;
  created_at?: string;
}

export interface Member {
  name: string;
  role: string;
  email: string;
  phone?: string;
}

export interface GovernanceData {
  decision_making: string;
  officers: string[];
  meeting_frequency?: string;
  voting_rights?: string;
}

export interface OperationsData {
  bank_account: boolean;
  ein_needed: boolean;
  fundraising_plans?: string;
  budget_estimate?: string;
  financial_goals?: string;
}

export interface ExtrasData {
  uploaded_docs?: string[];
  special_notes?: string;
  additional_requirements?: string;
}

// Database functions
export const saveIntakeData = async (data: IntakeData) => {
  try {
    const { data: result, error } = await supabase
      .from('intakes')
      .upsert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (error) {
    console.error('Error saving intake data:', error);
    throw error;
  }
};

export const getIntakeData = async (paymentId: string) => {
  try {
    const { data, error } = await supabase
      .from('intakes')
      .select('*')
      .eq('payment_id', paymentId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found
    return data;
  } catch (error) {
    console.error('Error fetching intake data:', error);
    throw error;
  }
};

export const checkPaymentStatus = async (sessionId: string) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('id, status, customer_email')
      .eq('stripe_session_id', sessionId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
};

export const checkBookingStatus = async (paymentId: string) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('id, status, scheduled_time')
      .eq('payment_id', paymentId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found
    return data;
  } catch (error) {
    console.error('Error checking booking status:', error);
    throw error;
  }
};


