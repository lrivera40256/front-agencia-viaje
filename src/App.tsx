import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Suspense, useState } from 'react';
import routes from './routes/index';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginForm } from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProtectedRoute from './auth/ProtectedRoute';
import { ProfileProvider } from './components/auth/ProfileProvider';

function App() {
	const [count, setCount] = useState(0);

	return (
		<Router>
			<ProfileProvider>
				<Routes>
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />

					{/* Rutas del dashboard */}
					<Route element={<DashboardLayout />}>
						<Route element={<ProtectedRoute />}>
							{routes.map((route, index) => {
								const { path, component: Component } = route;
								return (
									<Route
										key={index}
										path={path}
										element={
											<Suspense fallback={<div>Cargando...</div>}>
												<Component />
											</Suspense>
										}
									/>
								);
							})}
						</Route>
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</ProfileProvider>
		</Router>
	);
}

export default App;
