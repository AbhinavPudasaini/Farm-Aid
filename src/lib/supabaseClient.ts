import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eteiplyjfkccvutldynp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZWlwbHlqZmtjY3Z1dGxkeW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTExNzAsImV4cCI6MjA2Njg2NzE3MH0.Vq0-Cp5Dn073qBTc7EtcCz1lFLQJ0Vv-yOr50TDZ4LU';
export const supabase = createClient(supabaseUrl, supabaseKey);
