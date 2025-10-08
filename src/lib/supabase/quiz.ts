import { supabase } from '../supabase';

export interface QuizSubmission {
  id?: string;
  email?: string;
  primary_goal: string;
  journey_stage: string;
  annual_budget: string;
  privacy_preference: string;
  state: string;
  score: number;
  recommendation: string;
  created_at?: string;
  updated_at?: string;
}

export async function submitQuizResults(submission: Omit<QuizSubmission, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('quiz_submissions')
    .insert([submission])
    .select()
    .single();

  if (error) {
    console.error('Error submitting quiz results:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getAllQuizSubmissions(): Promise<{ data: QuizSubmission[] | null; error?: string }> {
  const { data, error } = await supabase
    .from('quiz_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quiz submissions:', error);
    return { data: null, error: error.message };
  }

  return { data, error: undefined };
}

export async function getQuizSubmissionById(id: string): Promise<{ data: QuizSubmission | null; error?: string }> {
  const { data, error } = await supabase
    .from('quiz_submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching quiz submission:', error);
    return { data: null, error: error.message };
  }

  return { data, error: undefined };
}
