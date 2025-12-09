import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import { Suspense } from 'react';
import routes from './routes/index';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginPage, RegisterPage, ForgotPasswordPage } from "@/features/auth/pages";
import { AuthProvider } from "@/features/auth/contexts/AuthProvider";
import ProtectedRoute from './auth/ProtectedRoute';
import { ProfileProvider } from '@/features/profile/contexts/ProfileContext';
import { WizardProvider } from './features/trip-form/contexts/wizardContext';
import CreateTripWizard from './features/trip-form/pages/CreateTripWizard';
import { SegmentProvider } from './features/trip-form/contexts/segmentContext';
import { SegmentsProvider } from './features/trip-form/contexts/segmentsContext';
import PlanPage from './features/plan/pages/PlanPage';
import { PlanProvider } from './features/plan/contexts/PlanContex';
import { CustomerProvider } from './features/user/context/customerContext';


function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
          <Router>
            <Routes>
              {/* Public pages */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ForgotPasswordPage />} />

              {/* Dashboard layout */}
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

                  {/* ✅ Rutas normales */}
                  {routes
                    .filter(r => r.path !== "/form")
                    .map(({ path, component: Component, context: Context }, index) => {
                      const element = (
                        <Suspense fallback={<div>Cargando...</div>}>
                          {Context ? (
                            <Context>
                              <Component />
                            </Context>
                          ) : (
                            <Component />
                          )}
                        </Suspense>
                      );

                      return <Route key={index} path={path} element={element} />;
                    })}
                  <Route
                    path="/form"
                    element={
                      <SegmentProvider>
                        <SegmentsProvider>
                          <WizardProvider>
                            <Suspense fallback={<div>Cargando viaje...</div>}>
                              <CreateTripWizard />
                            </Suspense>
                          </WizardProvider>
                        </SegmentsProvider>
                      </SegmentProvider>
                    }
                  >

                    <Route
                      index
                      element={
                        <Suspense fallback={<div>Cargando...</div>}>
                          {/* Este componente debe estar en routes o importarlo aquí directamente */}
                          <Outlet />
                        </Suspense>
                      }
                    />
                  </Route>

                  <Route
                    path="/plan"
                    element={
                      <PlanProvider>
                        <Suspense fallback={<div>Cargando viaje...</div>}>
                          <PlanPage />
                        </Suspense>
                      </PlanProvider>
                    }
                  >
                    <Route
                      index
                      element={
                        <Suspense fallback={<div>Cargando...</div>}>
                          {/* Este componente debe estar en routes o importarlo aquí directamente */}
                          <Outlet />
                        </Suspense>
                      }
                    />
                  </Route>

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
