declare module './supabase' {
    import { SupabaseClient } from '@supabase/supabase-js';
  
    const supabase: SupabaseClient;
    export default supabase;
}

// declare module 'supabase' {
//     export * from './supabase';
// }