import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import '../App.css'

export default function ListUserPage(){

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        chekSession();
        getUsers();
    }, []);

    function chekSession(){
        axios.get('/check-session')
        .then(response => {
            if (response.data.sessionExists) {
            // La variable de sesión existe
            console.log('La sesión existe');
            } else {
            // La variable de sesión no existe
            console.log('La sesión no existe');
            navigate("/");
            }
        })
        .catch(error => {
            console.error('Error al verificar la sesión', error);
        });
    }

    function getUsers(){
        axios.get('/getuserdeleted') // Reemplaza la URL con la ruta correcta de tu servidor Flask
        .then(response => {
            setUsers(response.data.users);
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
        });
    }


    return(
        <div>
            <Navbar />
            <div className="container h-100">
                <div className='row mt-5'>
                    <div className="mt-5 mb-5">
                        <div className="card-body">
                            <h1 className='page-header text-center'><strong>Lista de empleados eliminados</strong></h1>
                        </div>
                    </div>
                    <div className='col-2 mb-5'>
                        <Link to="/list" className="btn btn-secondary rounded-pill">Regresar</Link>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div class="table-responsive">
                                <table className="table border border-5">
                                    <thead className="table-dark">
                                    <tr>
                                        <th className="table-purple">ID Empleado</th>
                                        <th className="table-purple">Nombre</th>
                                        <th className="table-purple">Apellidos</th>
                                        <th className="table-purple">Teléfono</th>
                                        <th className="table-purple">Email</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, key) => (
                                        <tr key={key}>
                                            <td>{user.id}</td>
                                            <td>{user.nombre}</td>
                                            <td>{user.apellidos}</td>
                                            <td>{user.telefono}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}