/* ─── Supabase Auth ─── */
const SUPABASE_URL = 'https://goaytpcflrprnqrqunxf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7imGpIzQYSJH0Lmte7MVvA_lGYIX2yY';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function authLogin(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function authSignup(name, email, password) {
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) throw error;
  return data;
}

async function authLogout() {
  await sb.auth.signOut();
}

function onAuthStateChange(callback) {
  sb.auth.onAuthStateChange((_event, session) => callback(session?.user ?? null));
}

async function getUser() {
  const { data } = await sb.auth.getUser();
  return data?.user ?? null;
}
