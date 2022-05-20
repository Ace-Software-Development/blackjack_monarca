import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import { useParams } from 'react-router-dom';
import {
    Nav,
    Navbar,
    Container,
} from 'react-bootstrap';
import Sidebar from './Sidebar';
import orderCard from '../orderCard';

function Order() {
    return (
        <div className="row w-100 justify-content-center align-self-stretch">
            <a href="/login">
                {orderCard('75', 'pedido1', 'puebla')}
            </a>
        </div>
    );
}

function NavbarAdmin() {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/administrador/Pedidos">Pedidos</Nav.Link>
                    <Nav.Link href="/administrador/Usuario">Usuario</Nav.Link>
                    <Nav.Link href="/administrador/Trabajador">Trabajador</Nav.Link>
                    <Nav.Link href="/administrador/Proceso">Proceso</Nav.Link>
                    <Nav.Link href="/administrador/Material">Material</Nav.Link>
                    <Nav.Link href="/administrador/Producto">Producto</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

function AdminPedido() {
    const { process } = useParams();
    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 h-100">
                <div className="row">
                    <div className="col">
                        <h1 className="my-2">Dashboard</h1>
                    </div>
                </div>
                <div>
                    <NavbarAdmin />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <h4>{process}</h4>
                        </div>
                        <div className="col-sm">
                            <h4> </h4>
                        </div>
                        <div className="col-sm">
                            <h4> </h4>
                        </div>
                        <div className="col-sm">
                            <h4> </h4>
                        </div>
                        <div className="col-sm">
                            <a className="btn btn-orange" href="/nuevoPedido" role="button">Agregar</a>
                        </div>
                    </div>
                </div>
                <br />
                <Order />
            </div>
        </div>
    );
}

function Administrador() {
    const { process } = useParams();
    if (process === 'Pedidos') {
        return (
            <AdminPedido />
        );
    }
}

export default Administrador;
