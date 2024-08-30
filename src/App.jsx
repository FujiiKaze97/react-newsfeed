import Router from './shared/Router';
import SessionProvider from './SessionContext copy';

const App = () => {
  return (
    <SessionProvider>
      <Router />
    </SessionProvider>
  );
};

export default App;
