import { createClient } from '@supabase/supabase-js';
let URL = "https://bbrxlumggxqydlqnivkd.supabase.co";
let API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicnhsdW1nZ3hxeWRscW5pdmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDY0OTAsImV4cCI6MjA3OTkyMjQ5MH0.GHM-KnJiz4YMjsP0vFtpzZtGOz-JF7rAwOzPhJUPjI8";
export const supabase = createClient(URL, API_KEY);