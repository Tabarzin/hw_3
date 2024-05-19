import { createClient, Session } from '@supabase/supabase-js';
import { makeAutoObservable } from 'mobx';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

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
