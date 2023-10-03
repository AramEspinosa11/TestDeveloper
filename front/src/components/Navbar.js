import '../App.css'
import React, { useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function Navbar() {

    useEffect(() => {
    }, []);

    const navigate = useNavigate();

    const logout = () => {
        axios.post('/logout')
        .then(response => {
            if (response.data.message == 'Sesión cerrada exitosamente') {
            // La variable de sesión existe
            console.log('Sesión cerrada exitosamente');
            navigate("/");
            } else {
            // La variable de sesión no existe
            console.log('La sesión no existe');
            }
        })
        .catch(error => {
            console.error('Error al verificar la sesión', error);
        });
    }

  return (
        <nav className="navbar navbar-dark bg-purple fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">WEPORT</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end navbarPurple" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Opciones</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                        <Link to="/list" className="nav-link">Lista de empleados</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/deletedlist" className="nav-link">Empleados eliminados</Link>
                    </li>
                    <li className="nav-item mt-3">
                        <div class="d-grid gap-2">
                            <button className="btn btn-outline-light" type="button" onClick={() => logout()}>Cerrar sesion</button>
                        </div>
                    </li>
                    </ul>
                    
                </div>
                </div>
            </div>
        </nav>
  );
}

export default Navbar;
