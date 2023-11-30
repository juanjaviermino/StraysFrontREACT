import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/navbarComponents/Navbar';
import LandingPage from './components/landingPageComponents/LandingPage';
import LoginPage from './components/accountMgmtComponents/LoginPage'; 
import RegisterPage from './components/accountMgmtComponents/RegistrationPage'; 
import ProvinciasPage from './components/adminComponents/Provincia/ProvinciasPage';
import CiudadesPage from './components/adminComponents/Ciudad/CiudadesPage';
import EspeciesPage from './components/adminComponents/Especie/EspeciesPage';
import RazasPage from './components/adminComponents/Raza/RazasPage';
import ProductsPage from './components/adminComponents/Products/ProductsPage';
import UsersPage from './components/adminComponents/User/UsersPage';
import SalesPage from './components/adminComponents/Sales/SalesPage';
import SalesSummaryPage from './components/adminComponents/Sales/SalesSummaryPage';

import { useSelector } from 'react-redux';



const ProtectedRoute = ({ children }) => {
  const isLogged = useSelector(state => state.user.isLogged);

  if (!isLogged) {
    // Usuario no está autenticado, redirigir a la página de inicio de sesión
    return <Navigate to="/StraysFrontREACT/login" />;
  }

  // Usuario autenticado, renderizar el componente solicitado
  return children;
};


function AppUnauth() {

  return (
    <Router>
      <header className='root__header'>
        <Navbar/>
      </header>
      <main className='root__main'>
        <Routes>
          <Route path="/StraysFrontREACT/" element={<LandingPage />} />
          <Route path="/StraysFrontREACT/register" element={<RegisterPage />} />
          <Route path="/StraysFrontREACT/login" element={<LoginPage />} />
          <Route path="/StraysFrontREACT/provincias" element={<ProtectedRoute><ProvinciasPage /></ProtectedRoute>} />
          <Route path="/StraysFrontREACT/ciudades" element={<ProtectedRoute><CiudadesPage /></ProtectedRoute>} />
          <Route path="/StraysFrontREACT/especies" element={<ProtectedRoute><EspeciesPage /></ProtectedRoute>} />
          <Route path="/StraysFrontREACT/razas" element={<ProtectedRoute><RazasPage /></ProtectedRoute>} />
          <Route path="/StraysFrontREACT/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
          <Route path="/StraysFrontREACT/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
          <Route path="/StraysFrontREACT/sales" element={<ProtectedRoute><SalesPage /></ProtectedRoute>} />
          <Route path="/StraysFrontREACT/summary" element={<ProtectedRoute><SalesSummaryPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/StraysFrontREACT/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default AppUnauth;
