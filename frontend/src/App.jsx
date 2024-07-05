import React from 'react';
import './App.css';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './pages/Header';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';
import PostTiyatro from './pages/PostTiyatro';
import UpdateTiyatro from './pages/UpdateTiyatro';
import TiyatroDetails from './pages/TiyatroDetails';
import SurprisePage from './pages/SurprisePage';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='*' element={<NoMatch />} />
        <Route path='/tiyatro' element={<PostTiyatro />} />
        <Route path='/tiyatro/:id' element={<UpdateTiyatro />} />
        <Route path="/tiyatrodetails/:id" element={<TiyatroDetails />} />
        <Route path="/surprise" element={<SurprisePage />} />
      </Routes>

    </div>
  );
}

export default App;
