import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import SimpleNavbar from './SimpleNav';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
 
export default function LoginPage(){
 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   
    const navigate = useNavigate();
     
    const logInUser = () => {
        if(email.length === 0){
            Swal.fire({
                title: '¡Error!',
                text: 'Ingresa tu correo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
        }
        else if(password.length === 0){
            Swal.fire({
                title: '¡Error!',
                text: 'Ingresa una contraseña.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
        }
        else{
            axios.post('/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log(response);
                navigate("/list");
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    Swal.fire({
                        title: '¡Error!',
                        text: 'Correo o contraseña incorrectos.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                      });
                }
            });
        }
    }
 
    let imgs = [
      'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
    ];
     
  return (
    <div>
        <SimpleNavbar />
        <div className="container h-100">
            <div className="mt-5 mb-5">
                <div className="card-body">
                    <h1 className='page-header text-center'><strong>Inicia sesion</strong></h1>
                </div>
            </div>
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src={imgs[0]} className="img-fluid rounded-4"/>
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Accede a tu cuenta</p>
                  </div>
 
                  <div className="form-outline mb-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="ejemplo@hotmail.com" required />
                    <label className="form-label" for="form3Example3">Correo electrónico</label>
                  </div>
 
             
                  <div className="form-outline mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="***********" required />
                    <label className="form-label" for="form3Example4">Contraseña</label>
                  </div>
 
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <div className='d-grid gap-2 col-6 mx-auto'>
                        <button type="button" className="btn btn-secondary btn-lg" onClick={logInUser} >Iniciar Sesion</button>
                    </div>
                    <p className="fw-bold mt-2 pt-1 mb-0 text-center">No tienes cuenta? <a href="/register" className="link-dark">Registrarse</a></p>
                  </div>
 
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}