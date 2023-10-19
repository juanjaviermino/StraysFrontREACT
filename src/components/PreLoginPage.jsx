import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarStrays from "./Navbar";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import WelcomePage from "./WelcomePage";

function PreLoginPage(props) {

    const [isLogged, setIsLogged] = useState(false);
    const {toAppPage} = props;

    function toPreLoginPage(logged){
        toAppPage(logged);
    }

    useEffect(() => {
        setIsLogged(props.logged);
    }, [props.logged])

    return (
        <Router>
            <NavbarStrays logged={isLogged}/>
            <div className=''>
                <Routes>
                    <Route path="/StraysFrontREACT/" element={<WelcomePage text="USUARIOS NO LOGGEADOS" mensaje="Para acceder al contenido, ingresa al sistema"/>} />
                    <Route path="/StraysFrontREACT/register" element={<RegistrationPage />} />
                    <Route path="/StraysFrontREACT/login" element={<LoginPage toPreLoginPage={toPreLoginPage}/>} />
                    <Route path="/StraysFrontREACT/users" element={<LoginPage toPreLoginPage={toPreLoginPage}/>} />
                    <Route path="/StraysFrontREACT/about" element={<LoginPage toPreLoginPage={toPreLoginPage}/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default PreLoginPage;