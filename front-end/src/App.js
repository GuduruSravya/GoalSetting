import React from 'react';
import logo from './logo.svg';

import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
  return (
    
    <Router>
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </div>
    </Router>
    
    
  );
}

export default App;
