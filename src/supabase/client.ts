import {createClient} from '@supabase/supabase-js'

const anonKey = import.meta.env.VITE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_URL


export const supabase = createClient(supabaseUrl!, anonKey!)
