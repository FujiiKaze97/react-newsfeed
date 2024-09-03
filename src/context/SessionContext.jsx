import { createContext, useEffect, useState } from 'react';
import supabase from '../../suparbase';

export const SessionContext = createContext(null);

function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('session');

    if (savedSession) {
      // 변환된 객체를 session 상태에 반영하세요.
      setSession(JSON.parse(savedSession));
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        console.log('logout');
        setSession(null);
        localStorage.removeItem('session');
      } else if (session) {
        setSession(session);
        localStorage.setItem('session', JSON.stringify(session));
      }
    });

    // 4. 컴포넌트가 언마운트될 때 구독을 취소하세요.
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>;
}

export default SessionProvider;
