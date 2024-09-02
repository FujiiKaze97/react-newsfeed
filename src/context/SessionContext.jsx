import { createContext, useEffect, useState } from 'react';
import supabase from '../../suparbase';

export const SessionContext = createContext(null);

function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        localStorage.removeItem('session');
      } else if (session) {
        setSession(session);
        localStorage.setItem('session', JSON.stringify(session));
      }
    });

    // 4. 컴포넌트가 언마운트될 때 구독을 취소하세요.
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>;
}

export default SessionProvider;
