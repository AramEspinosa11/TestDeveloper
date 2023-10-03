import React, { } from 'react';
import {Link} from 'react-router-dom';
import SimpleNavbar from './SimpleNav';
import projImg1 from "../assets/img/login.png";
import projImg2 from "../assets/img/adduser.png";
import '../App.css';

export default function LandingPage(){

    return(
        <div>
        <SimpleNavbar />
            <div className="container h-100">
                <div className="mt-5 mb-5">
                    <div className="card-body">
                        <h1 className='page-header text-center'><strong>Inicia sesion o registrate</strong></h1>
                    </div>
                </div>
                <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card border border-5 rounded-4 transparent">
                        <div className='row mt-3'>
                            <div className='col-12 text-center'>
                                <img src={projImg1} className="imagesSize" alt="..."/>
                            </div>
                        </div>
                    <div className="card-body">
                        <h5 className="card-title text-center">Special title treatment</h5>
                        <p className="card-text text-center">With supporting text below as a natural lead-in to additional content.</p>
                        <p className='d-grid gap-2 col-6 mx-auto'><Link to="/login" className='btn btn-secondary'>Iniciar sesion</Link></p>
                    </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card border border-5 rounded-4 transparent">
                        <div className='row mt-3'>
                            <div className='col-12 text-center'>
                                <img src={projImg2} className="imagesSize" alt="..."/>
                            </div>
                        </div>
                    <div className="card-body">
                        <h5 className="card-title text-center">Special title treatment</h5>
                        <p className="card-text text-center">With supporting text below as a natural lead-in to additional content.</p>
                        <p className='d-grid gap-2 col-6 mx-auto'><Link to="/register" className='btn btn-secondary'>Registrarse</Link></p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}