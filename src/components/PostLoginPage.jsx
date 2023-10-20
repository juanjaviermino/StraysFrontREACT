import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarStrays from "./Navbar";
import About from "./About";
import WelcomePage from "./WelcomePage";
import Users from "./Users";
import Products from "./Products";
import Sellers from "./Sellers";
import Sales from "./Sales";
import SalesSummary from "./SalesSummary";

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
                    <Route path="/StraysFrontREACT/" element={<WelcomePage text="USUARIOS LOGGEADOS" mensaje="¡Bienvenido!"/>} />
                    <Route path="/StraysFrontREACT/about" element={<About />} />
                    <Route path="/StraysFrontREACT/users" element={<Users />} />
                    <Route path="/StraysFrontREACT/products" element={<Products />} />
                    <Route path="/StraysFrontREACT/sellers" element={<Sellers />} />
                    <Route path="/StraysFrontREACT/sales" element={<Sales />} />
                    <Route path="/StraysFrontREACT/salessummary" element={<SalesSummary />} />
                </Routes>
            </div>
        </Router>
    );
}

export default PostLoginPage;