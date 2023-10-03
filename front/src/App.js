import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import ListUserPage from  './components/ListUserPage';
import DeletedList from  './components/DeletedList';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditeUser';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function UserList() {

  const [selectedUser, setSelectedUser] = useState(null);

  return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/list' element={<ListUserPage />}></Route>
            <Route path='/deletedlist' element={<DeletedList />}></Route>
            <Route path='/addnewuser' element={<CreateUser />}></Route>
            <Route path='/user/:id/edit' element={<EditUser />}></Route>
          </Routes>
        </BrowserRouter>
  );
}

export default UserList;
