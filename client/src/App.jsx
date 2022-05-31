import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/login';
import Empacado from './components/Empacado';
import 'bootstrap/dist/css/bootstrap.css';

import Inicio from './components/worker/Inicio';
import Conteo from './components/worker/Conteo';
import Dashboard from './components/admin/Dashboard';
import Category from './components/worker/Category';
import Process from './components/worker/Process';
import Quantity from './components/worker/Quantity';
import ModelNumber from './components/worker/ModelNumber';
import NamePart from './components/worker/NamePart';
import ModifyQuantity from './components/worker/ModifyQuantity';
import Confirm from './components/worker/Confirm';
import Incidente from './components/worker/Incident';
import ConfirmPart from './components/worker/ConfirmPart';
import Classify from './components/worker/Classify';
import ProductInventory from './components/worker/productInventory';
import CategoryInventory from './components/worker/CategoryInventory';
import ModelInventory from './components/worker/ModelInventory';
import RegisterPack from './components/worker/RegisterPack';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/inicio" element={<Inicio />} />
                <Route exact path="/empacado" element={<Empacado />} />
                <Route exact path="/conteo" element={<Conteo />} />
                <Route exact path="/conteo/modificar/:id/:name" element={<ModifyQuantity />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/proceso/:process" element={<Process />} />
                <Route excat path="/parte" element={<NamePart />} />
                <Route excat path="/categoria" element={<Category />} />
                <Route exact path="/modelo" element={<ModelNumber />} />
                <Route exact path="/cantidad" element={<Quantity />} />
                <Route exact path="/" element={<Login />} />
                <Route exact path="/proceso/:prevProcess/:process/:nextProcess" element={<Process />} />
                <Route exact path="/confirmar/:process/:prevProcess" element={<Confirm />} />
                <Route exact path="/confirmar/:idPartInventory" element={<ConfirmPart />} />
                <Route excat path="/parte/:process/:nextProcess" element={<NamePart />} />
                <Route excat path="/categoria/:process/:nextProcess/:worker/:part" element={<Category />} />
                <Route exact path="/modelo/:process/:nextProcess/:worker/:part/:category" element={<ModelNumber />} />
                <Route exact path="/cantidad/:process/:nextProcess/:worker/:part/:category/:model" element={<Quantity />} />
                <Route exact path="/rechazado/incidente" element={<Incidente />} />
                <Route exact path="/rechazado/:id" element={<Classify />} />
                <Route exact path="/empacado/inventario" element={<ProductInventory />} />
                <Route exact path="/empacado/registrar/" element={<CategoryInventory />} />
                <Route exact path="/empacado/registrar/:category" element={<ModelInventory />} />
                <Route exact path="/empacado/registrar/:category/:model" element={<RegisterPack />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
