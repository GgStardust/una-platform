import { supabase } from '../supabase';

export interface ExploreResponse {
  id?: string;
  payment_id?: string;
  state: string;
  readiness: {
    hasMembers: boolean | null;
    hasBylaws: boolean | null;
    hasEIN: boolean | null;
    needsEINHelp: boolean | null;
    needsBanking: boolean | null;
  };
  collective_type: string;
  priorities: string[];
  created_at?: string;
  updated_at?: string;
}

export async function saveExploreResponse(data: Omit<ExploreResponse, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: response, error } = await supabase
      .from('explore_responses')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error saving explore response:', error);
      throw error;
    }

    return response;
  } catch (error) {
    console.error('Error in saveExploreResponse:', error);
    throw error;
  }
}

export async function getExploreResponse(id: string) {
  try {
    const { data, error } = await supabase
      .from('explore_responses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching explore response:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getExploreResponse:', error);
    throw error;
  }
}

export async function getExploreResponsesByState(state: string) {
  try {
    const { data, error } = await supabase
      .from('explore_responses')
      .select('*')
      .eq('state', state)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching explore responses by state:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getExploreResponsesByState:', error);
    throw error;
  }
}
