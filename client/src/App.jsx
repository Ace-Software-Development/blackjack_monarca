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
import User from './components/admin/User';
import Worker from './components/admin/Worker';
import Buyer from './components/admin/Buyer';
import Disk from './components/admin/Disk';
import Classify from './components/worker/Classify';
import ProductInventory from './components/worker/productInventory';
import CategoryInventory from './components/worker/CategoryInventory';
import ModelInventory from './components/worker/ModelInventory';
import RegisterPack from './components/worker/RegisterPack';
import Orders from './components/worker/Orders';
import Order from './components/worker/Order';
import ModifyPackStatus from './components/worker/ModifyPackStatus';
import OrderAdmin from './components/admin/OrderAdmin';
import Product from './components/admin/Product';
import CategoryList from './components/admin/Category';
import OrdersAdmin from './components/admin/OrdersAdmin';
import Procesos from './components/admin/DashboardProcesos';
import DashboardTrabajador from './components/admin/DashboardTrabajador';
import InvDiscos from './components/admin/InvDiscos';
import InvDiscosW from './components/worker/InvDiscos';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/inicio" element={<Inicio />} />
                <Route exact path="/empacado" element={<Empacado />} />
                <Route exact path="/empacado/pedidos" element={<Orders />} />
                <Route exact path="/empacado/pedidos/:orderId" element={<Order />} />
                <Route exact path="/empacado/inventario" element={<ProductInventory />} />
                <Route exact path="/empacado/registrar/" element={<CategoryInventory />} />
                <Route exact path="/empacado/registrar/:category" element={<ModelInventory />} />
                <Route exact path="/empacado/registrar/:category/:model" element={<RegisterPack />} />
                <Route exact path="/empacado/modificar/:model" element={<ModifyPackStatus />} />
                <Route exact path="/conteo" element={<Conteo />} />
                <Route exact path="/conteo/:type" element={<Conteo />} />
                <Route exact path="/rechazado/conteo/:type" element={<Conteo />} />
                <Route exact path="/conteo/modificar/:id/:name" element={<ModifyQuantity />} />
                <Route exact path="/dashboard/Trabajador" element={<DashboardTrabajador />} />
                <Route exact path="/dashboard/Procesos" element={<Procesos />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/dashboard/Trabajadores" element={<Worker />} />
                <Route exact path="/dashboard/Clientes" element={<Buyer />} />
                <Route exact path="/dashboard/Productos" element={<Product />} />
                <Route exact path="/dashboard/pedidos" element={<OrdersAdmin />} />
                <Route exact path="/dashboard/Categorias" element={<CategoryList />} />
                <Route exact path="/dashboard/Usuarios" element={<User />} />
                <Route exact path="/dashboard/pedidos/:orderId" element={<OrderAdmin />} />
                <Route exact path="/proceso/:process" element={<Process />} />
                <Route exact path="/proceso/:prevProcess/:process/:nextProcess" element={<Process />} />
                <Route excat path="/parte/:process/:nextProcess" element={<NamePart />} />
                <Route excat path="/categoria/:process/:nextProcess/:worker/:part" element={<Category />} />
                <Route exact path="/modelo/:process/:nextProcess/:worker/:part/:category" element={<ModelNumber />} />
                <Route exact path="/cantidad/:process/:nextProcess/:worker/:part/:category/:model" element={<Quantity />} />
                <Route exact path="/dashboard/Discos" element={<Disk />} />
                <Route exact path="/" element={<Login />} />
                <Route exact path="/confirmar/:process/:prevProcess" element={<Confirm />} />
                <Route exact path="/confirmar/:idPartInventory" element={<ConfirmPart />} />
                <Route exact path="/rechazado/incidente" element={<Incidente />} />
                <Route exact path="/rechazado/:id" element={<Classify />} />
                <Route exact path="/dashboard/Inventario/Discos" element={<InvDiscos />} />
                <Route exact path="/discos/inventario" element={<InvDiscosW />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
