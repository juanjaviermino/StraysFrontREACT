import React from 'react';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../context/userSlice';

function NavbarStrays (props) {

    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.user.isLogged);

    const handleLogout = () =>{
        dispatch(logout());
    };

    return(
        <nav className={`${isLogged ? 'navbar--logged' : 'navbar'}`}> 
            <Link className="fs--logo" to="/StraysFrontREACT/">STRAYS</Link>
            {isLogged 
                ? 
                <ul className="navbar__items">
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/provincias">Provincias</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/ciudades">Ciudades</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/especies">Especies</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/razas">Razas</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/products">Productos</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/users">Usuarios</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/sales">Ventas</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/summary">Resumen</Link>
                    <button onClick={handleLogout} style={{marginLeft:'auto'}} className='button--icon-text'>
                        <i className="pi pi-user" style={{fontSize:'12px', color:'white'}}></i>
                        <span className='fs--navitem'>Cerrar sesión</span>
                    </button>
                </ul>
                : 
                <ul className="navbar__items">
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/register">Registrate</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/login">Comencémos</Link>
                </ul>
            }
        </nav>
    );
}

export default NavbarStrays;
