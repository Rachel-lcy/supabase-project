
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://avzliqmgydbfyfcjgaod.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2emxpcW1neWRiZnlmY2pnYW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMzAwNjYsImV4cCI6MjA1NDcwNjA2Nn0.VrIV-UlSDo5ftEyhUpvhaww7kcGLVgSc_q3ZA3q5XHE'

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;