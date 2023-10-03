import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Navbar from './Navbar';

export default function CreateUser(){

    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        chekSession();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));   
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.post('/useradd', inputs) // Reemplaza la URL con la ruta correcta de tu servidor Flask
        .then(response => {
            console.log(response.data);
            navigate('/list');
        })
        .catch(error => {
            console.error('Error al agregar usuario:', error);
            Swal.fire('Error', error, 'error');
        });
    }

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

    return(
        <div>
            <Navbar />
            <div className='container h-100'>
                <div className='row mt-5'>
                    <div className="mt-5 mb-5">
                        <div className="card-body">
                            <h1 className='page-header text-center'><strong>Agregar empleado</strong></h1>
                        </div>
                    </div>
                    <div className='col-2 mb-5'>
                        <Link to="/list" className="btn btn-secondary rounded-pill">Regresar</Link>
                    </div>   
                    <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-6 mb-3'>
                            <label>Nombre:</label>
                            <input type='text' className='form-control' name='nombre' onChange={handleChange} required/>
                        </div>
                        <div className='col-6 mb-3'>
                            <label>Apellidos:</label>
                            <input type='text' className='form-control' name='apellidos' onChange={handleChange} required/>
                        </div>
                        <div className='col-6 mb-3'>
                            <label>Teléfono:</label>
                            <input type='text' className='form-control' name='telefono' onChange={handleChange} required/>
                        </div>
                        <div className='col-6 mb-3'>
                            <label>Tipo de sangre:</label>
                            <input type='text' className='form-control' name='tipo_sangre' onChange={handleChange} required/>
                        </div>
                        <div className='col-12 mb-3'>
                            <label>Dirección:</label>
                            <input type='text' className='form-control' name='direccion' onChange={handleChange} required/>
                        </div>
                        <div className='col-6 mb-3'>
                            <label>Email:</label>
                            <input type='text' className='form-control' name='email' onChange={handleChange} required/>
                        </div>
                        <div className='col-6 mb-3'>
                            <label>Fecha de nacimiento:</label>
                            <input type='date' className='form-control' name='fecha_nacimiento' onChange={handleChange} required/>
                        </div>
                        <div className='col-6 mb-3'>
                            <label>Nombre de contacto de emergencia:</label>
                            <input type='text' className='form-control' name='nombre_contacto_emergencia' onChange={handleChange} required/>
                        </div>
                        <div className='col-6 mb-3'>
                            <label>Teléfono de contacto de emergencia:</label>
                            <input type='text' className='form-control' name='telefono_contacto_emergencia' onChange={handleChange} required/>
                        </div>
                        <div class="d-grid gap-2 col-6 mx-auto mt-3">
                            <button type="submit" name="add" className='btn btn-dark rounded-pill'>GUARDAR</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}