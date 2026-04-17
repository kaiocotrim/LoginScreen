// conexao com o banco de dados supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabaseUrl = 'https://hbqxheedmamrmqiasflv.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicXhoZWVkbWFtcm1xaWFzZmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NDg4ODAsImV4cCI6MjA4NTAyNDg4MH0.GQLxIMfr0o_Oq87LCNqpyUZZaNPAtiCrNaLI6ntDfTA'

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }

