
import { AuthProvider } from './context/AuthContext';
import App from './App';

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;
