import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
=======
import './styleLogin.css';
//  import Inicio from './components/Inicio';
import Login from './components/login';
>>>>>>> interface_diego
import reportWebVitals from './reportWebVitals';
import Dashboard from './components/admin/Dashboard';

ReactDOM.render(
<<<<<<< HEAD
    <React.StrictMode>
        <Dashboard />
    </React.StrictMode>,
    document.getElementById('root'),
=======
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('root'),
>>>>>>> interface_diego
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
