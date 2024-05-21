import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zjxxlugnwaynmouqdaff.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqeHhsdWdud2F5bm1vdXFkYWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxNDExNzMsImV4cCI6MjAzMTcxNzE3M30.JGKnHt2HHioWaDFlayfut5L1vNUKT5WVcYlOfTaP4iE';

export const supabase = createClient(supabaseUrl, supabaseKey);
