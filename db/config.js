const { createClient } = require("@supabase/supabase-js");

const supabasekey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeXVubnprdXp6dWR3ZHl0aWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwNjY1OTksImV4cCI6MTk5MDY0MjU5OX0.Fz0PS3rgHUE7Jc3NtRZojwGX_6WUL5pzOW0yXtzj108";
const supabaseurl = "https://wdyunnzkuzzudwdytijd.supabase.co";

const supabase = createClient(supabaseurl, supabasekey)

module.exports = supabase