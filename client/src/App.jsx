import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/login';
import Empacado from './components/Empacado';
import Inicio from './components/worker/Inicio';
import Conteo from './components/worker/Conteo';
import Dashboard from './components/admin/Dashboard';

import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/inicio" element={<Inicio />} />
                <Route exact path="/empacado" element={<Empacado />} />
                <Route exact path="/conteo" element={<Conteo />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
