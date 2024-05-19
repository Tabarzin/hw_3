import { createClient, Session } from '@supabase/supabase-js';
import { makeAutoObservable } from 'mobx';
import process from 'process';

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabaseUrl = 'https://gotlnhvwzljgbgaleywk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdGxuaHZ3emxqZ2JnYWxleXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxMjA3MzksImV4cCI6MjAzMTY5NjczOX0._J_J50giW1Dpq1heBO1QVE8iMyyg-W5l3G-YShatPYg';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and key are required');
}

const supabase = createClient(supabaseUrl, supabaseKey);

class AuthStore {
  session: Session | null = null;

  constructor() {
    makeAutoObservable(this);
    this.initAuth();
  }

  initAuth = () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      this.setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      this.setSession(session);
    });

    return () => subscription.unsubscribe();
  };

  setSession = (session: Session | null) => {
    this.session = session;
  };

  get isAuthenticated() {
    return !!this.session;
  }
}

export const authStore = new AuthStore();
