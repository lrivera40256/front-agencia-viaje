import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import { Suspense } from 'react';
import routes from './routes/index';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginPage, RegisterPage } from "@/features/auth/pages";
import { AuthProvider } from "@/features/auth/contexts/AuthProvider";
import ProtectedRoute from './auth/ProtectedRoute';
import { ProfileProvider } from '@/features/profile/contexts/ProfileContext';

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<DashboardLayout />}>
              <Route
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<div>Cargando...</div>}>
                      <Outlet />
                    </Suspense>
                  </ProtectedRoute>
                }
              >
                {routes.map(({ path, component: Component }, index) => (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Suspense fallback={<div>Cargando...</div>}>
                        <Component />
                      </Suspense>
                    }
                  />
                ))}
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}


export default App;
