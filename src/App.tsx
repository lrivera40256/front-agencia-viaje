
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Suspense, useState } from 'react';
import routes from './routes/index';
import TestComponent from './pages/demo';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/" element={<MapTracking />} /> */}

        <Route>
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
