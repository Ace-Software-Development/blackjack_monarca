import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/login';
import Empacado from './components/Empacado';
import 'bootstrap/dist/css/bootstrap.css';

import Inicio from './components/worker/Inicio';
import Conteo from './components/worker/Conteo';
import Category from './components/worker/Category';
import Process from './components/worker/Process';
import Quantity from './components/worker/Quantity';
import ModelNumber from './components/worker/ModelNumber';
import NamePart from './components/worker/NamePart';
import DashboardProceso from './components/admin/DashboardProceso';
import Dashboard from './components/admin/Dashboard';
import Administrador from './components/admin/Administrador';
import Orders from './components/admin/Orders';
import NewOrder from './components/admin/NewOrder';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/inicio" element={<Inicio />} />
                <Route exact path="/empacado" element={<Empacado />} />
                <Route exact path="/conteo" element={<Conteo />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/dashboard/:process" element={<DashboardProceso />} />
                <Route exact path="/administrador/:process" element={<Administrador />} />
                <Route exact path="/proceso/:process" element={<Process />} />
                <Route exact path="/pedidos/:orderId" element={<Orders />} />
                <Route exact path="/nuevoPedido" element={<NewOrder />} />
                <Route excat path="/parte" element={<NamePart />} />
                <Route excat path="/categoria" element={<Category />} />
                <Route exact path="/modelo" element={<ModelNumber />} />
                <Route exact path="/cantidad" element={<Quantity />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
