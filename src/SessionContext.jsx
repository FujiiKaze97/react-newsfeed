import { createContext, useEffect, useState } from 'react';
import supabase from '../suparbase';

const SessionContext = createContext(null);

function SessionProvider() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={session}></SessionContext.Provider>;
}

export default SessionProvider;
