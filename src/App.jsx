import SessionProvider from './SessionContext';
import Router from './shared/Router';

const App = () => {
  return (
    <SessionProvider>
      <Router />
    </SessionProvider>
  );
};

export default App;
