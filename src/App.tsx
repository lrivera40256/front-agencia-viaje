
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Suspense, useState } from 'react';
import routes from './routes/index';
import { DashboardLayout } from './components/layout/DashboardLayout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        
        {/* Rutas del dashboard */}
        <Route  element={<DashboardLayout />}>
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
      </Routes>
    </Router>
  )
}

export default App