// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xwwulrzhqhcluzliepza.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3d3VscnpocWhjbHV6bGllcHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MzU4MDUsImV4cCI6MjA2MTAxMTgwNX0.6Y-H7mIrp9h4oCbG1TJi3QFTZSd_bYoHYlvSiP8wayk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);