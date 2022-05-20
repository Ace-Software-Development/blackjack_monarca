import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import { useParams } from 'react-router-dom';
import {
    Nav,
    Navbar,
    Container,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
import Sidebar from './Sidebar';
import orderCard from '../orderCard';

/**
 * Categories
 * @description React component to display each category in a card
 * @param part: Json with the attributes objectId and name
 * @returns Div component
 */
function Orders({ order }) {
    return (
        <div className="col-4 px-5" value={order.objectId}>{orderCard('75', order.id_buyer, order.city_buyer)}</div>
    );
}
Orders.propTypes = {
    order: PropTypes.string.isRequired,
};

function Order() {
    const [orders, setOrders] = useState([]);

    /**
     * getCategories
     * @description Fetches existing categories from the database through the server
     */
    async function getOrders() {
        const response = await fetch('http://localhost:8888/dash/ordenes/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const order = await response.json();
        setOrders(order.data);
    }
    useEffect(() => {
        getOrders();
    }, []);

    /**
   * categoryList
   * @description Maps all categories in the interface
   * @returns Component with name and id of the category
   */
    function orderList() {
        return orders.map((order) => (
            <Orders order={order} key={order.objectId} />
        ));
    }

    return (
        <div className="row w-100 justify-content-center align-self-stretch">
            {orderList()}
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
