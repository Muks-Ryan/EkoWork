import React from 'react';
import { InstitutionProvider } from './core/institution-context/InstitutionContext';
import { AuthProvider, useAuth } from './core/authentication/AuthContext';
import { LoginPage } from './features/auth/LoginPage';
import { WorkspaceLayout } from './layouts/WorkspaceLayout';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <WorkspaceLayout />;
};

export default function App() {
  return (
    <InstitutionProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </InstitutionProvider>
  );
}
