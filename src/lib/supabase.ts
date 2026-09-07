/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables from Vite / Vercel
// Suporta tanto o prefixo VITE_ quanto os nomes sem prefixo definidos na Vercel
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.VITE_URL_SUPABASE || 
  (import.meta.env as any).URL_SUPABASE || 
  '';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  (import.meta.env as any).SUPABASE_ANON_KEY || 
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://')
);

// Instantiate client safely (or null if not yet configured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
