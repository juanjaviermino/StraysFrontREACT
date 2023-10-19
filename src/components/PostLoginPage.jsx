import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarStrays from "./Navbar";
import About from "./About";
import WelcomePage from "./WelcomePage";
import Users from "./Users";

function PostLoginPage (props) {

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        setIsLogged(props.logged);
    }, [props.logged])

    return (
        <Router>
            <NavbarStrays logged={isLogged}/>
            <div className='container-fluid m-2'>
                <Routes>
                    <Route path="/" element={<WelcomePage text="USUARIOS LOGGEADOS" mensaje="¡Bienvenido!"/>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </Router>
    );
}

export default PostLoginPage;