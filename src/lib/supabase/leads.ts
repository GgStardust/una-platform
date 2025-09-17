import { supabase } from '../supabase';

export interface Lead {
  id?: string;
  name: string;
  email: string;
  source: 'homepage' | 'explore' | 'footer';
  created_at?: string;
}

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('leads')
      .insert([lead])
      .select();

    if (error) {
      console.error('Error saving lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error: 'Failed to save lead' };
  }
}

export async function getLeads(): Promise<{ data: Lead[] | null; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      return { data: null, error: error.message };
    }

    return { data };
  } catch (error) {
    console.error('Error fetching leads:', error);
    return { data: null, error: 'Failed to fetch leads' };
  }
}
