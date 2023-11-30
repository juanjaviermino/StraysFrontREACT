import React from 'react';
import LandingPage from './components/landingPageComponents/LandingPage';
import LoginPage from './components/accountMgmtComponents/LoginPage'; // You need to create this component
import RegisterPage from './components/accountMgmtComponents/RegistrationPage'; // You need to create this component
import Navbar from './components/navbarComponents/Navbar'; // You need to create this component
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProvinciasPage from './components/adminComponents/Provincia/ProvinciasPage';
import CiudadesPage from './components/adminComponents/Ciudad/CiudadesPage';
import EspeciesPage from './components/adminComponents/Especie/EspeciesPage';
import RazasPage from './components/adminComponents/Raza/RazasPage';

function App() {

  sessionStorage.setItem('isLogged', true);

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
          <Route path="/StraysFrontREACT/provincias" element={<ProvinciasPage />} />
          <Route path="/StraysFrontREACT/ciudades" element={<CiudadesPage />} />
          <Route path="/StraysFrontREACT/especies" element={<EspeciesPage />} />
          <Route path="/StraysFrontREACT/razas" element={<RazasPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
