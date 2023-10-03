import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link} from 'react-router-dom';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default function EditUser(){

    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        chekSession();
        getUser();
    }, []);

    function getUser(){
        axios.get(`/getuserselected/${id}`) // Reemplaza la URL con la ruta correcta de tu servidor Flask
        .then(response => {
            console.log(response.data.users);
            setInputs(response.data.users);
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));   
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.put(`/updateuser/${id}`, inputs) // Reemplaza la URL con la ruta correcta de tu servidor Flask
        .then(response => {
            Swal.fire({
                title: '¡Listo!',
                text: 'Registro actualizado',
                icon: 'success'
            }).then(response => {
                console.log(response.data);
                navigate('/list');
            });
            
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Error al actualizar usuario',
                icon: 'error'
            })
            // console.error('Error al actualizar usuario:', error);
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
            <Navbar/>
            <div className='container h-100'>
                <div className='row mt-5'>
                    <div className="mt-5 mb-5">
                        <div className="card-body">
                            <h1 className='page-header text-center'><strong>Detalle empleado</strong></h1>
                        </div>
                    </div>
                    <div className='col-2 mb-5'>
                        <Link to="/list" className="btn btn-secondary rounded-pill">Regresar</Link>
                    </div>
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-6 mb-3'>
                                    <label>Nombre:</label>
                                    <input type='text' className='form-control' value={inputs.nombre} name='nombre' onChange={handleChange} required/>
                                </div>
                                <div className='col-6 mb-3'>
                                    <label>Apellidos:</label>
                                    <input type='text' className='form-control' value={inputs.apellidos} name='apellidos' onChange={handleChange} required/>
                                </div>
                                <div className='col-6 mb-3'>
                                    <label>Teléfono:</label>
                                    <input type='text' className='form-control' value={inputs.telefono} name='telefono' onChange={handleChange} required/>
                                </div>
                                <div className='col-6 mb-3'>
                                    <label>Tipo de sangre:</label>
                                    <input type='text' className='form-control' value={inputs.tipo_sangre} name='tipo_sangre' onChange={handleChange} required/>
                                </div>
                                <div className='col-12 mb-3'>
                                    <label>Dirección:</label>
                                    <input type='text' className='form-control' value={inputs.direccion} name='direccion' onChange={handleChange} required/>
                                </div>
                                <div className='col-6 mb-3'>
                                    <label>Email:</label>
                                    <input type='text' className='form-control' value={inputs.email} name='email' onChange={handleChange} required/>
                                </div>
                                <div className='col-6 mb-3'>
                                    <label>Fecha de nacimiento:</label>
                                    <input type='date' className='form-control' value={inputs.fecha_nacimiento} name='fecha_nacimiento' onChange={handleChange} required/>
                                </div>
                                <div className='col-6 mb-3'>
                                    <label>Nombre de contacto de emergencia:</label>
                                    <input type='text' className='form-control' value={inputs.nombre_contacto_emergencia} name='nombre_contacto_emergencia' onChange={handleChange} required/>
                                </div>
                                <div className='col-6 mb-3'>
                                    <label>Teléfono de contacto de emergencia:</label>
                                    <input type='text' className='form-control' value={inputs.telefono_contacto_emergencia} name='telefono_contacto_emergencia' onChange={handleChange} required/>
                                </div>
                                <div class="d-grid gap-2 col-6 mx-auto mt-3">
                                    <button type="submit" name="update" className='btn btn-dark rounded-pill'>ACTUALIZAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </div> 
    );
}