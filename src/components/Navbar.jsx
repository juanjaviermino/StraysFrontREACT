import React, {useState, useEffect}from 'react';
import {Link, useLocation } from 'react-router-dom';
import "./ComponentStyles.css"

function NavbarStrays (props) {

    const [isLogged, setIsLogged] = useState(false);
    const [isWlcmpg, setIsWlcmpg] = useState();

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setIsWlcmpg(true);
          } else {
            setIsWlcmpg(false);;
          }
    }, [location])

    useEffect(() => {
        setIsLogged(props.logged);
    }, [props.logged])

    return(
        <nav className={isWlcmpg ? 'navbar-wlcpg' : 'navbar'}> 
            <Link className={isWlcmpg ? 'navbar-title-wlcpg' : 'navbar-title'} to="/">STRAYS</Link>
            {isLogged 
                ? 
                <div className="navbar-items">
                    <Link className={isWlcmpg ? 'nav-item-wlcpg' : 'nav-item'} to="/users">Usuarios</Link>
                    <Link className={isWlcmpg ? 'nav-item-wlcpg' : 'nav-item'} to="/about">About</Link>
                </div>
                : 
                <div className="navbar-items">
                    <Link className={isWlcmpg ? 'nav-item-wlcpg' : 'nav-item'} to="/register">Registrarse</Link>
                    <Link className={isWlcmpg ? 'nav-item-wlcpg' : 'nav-item'} to="/login">Ingresar</Link>
                </div>
            }
        </nav>
    );
}

export default NavbarStrays;

{/* 
<nav className="navbar navbar-expand-lg bg-primary p-3 strays-bgcolor" data-bs-theme="dark"> 
            <Link className="navbar-brand text-center" to="/"><strong>STRAYS</strong></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            {isLogged 
                ? 
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Usuarios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                : 
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Registrarse</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Ingresar</Link>
                        </li>
                    </ul>
                </div>
            }
        </nav>



*/}