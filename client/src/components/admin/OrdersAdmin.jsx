// CU 14 Consultar pedido
import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
    Col, Row,
} from 'react-bootstrap';
import orderCard from '../orderCard';
import Sidebar from './Sidebar';

/**
 * OrderElement
 * @description React component to display each order in a card
 * @param part: Json with the attributes objectId and name
 * @returns Div component
 */
function OrderElement({ order }) {
    return (
        <div className="col-4 px-5" value={order.objectId}>
            <a href={`/dashboard/pedidos/${order.objectId}`}>
                {orderCard(order.name, `${order.id_buyer.name} - ${order.id_buyer.city}`)}
            </a>
        </div>
    );
}
OrderElement.propTypes = {
    order: PropTypes.string.isRequired,
};

function OrdersAdmin() {
    const [orders, setOrders] = useState([]);

    /**
     * getOrders
     * @description Fetches existing orders from the database through the server
     */
    async function getOrders() {
        const response = await fetch('http://localhost:8888/empacado/ordenes/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const order = await response.json();
        setOrders(order.data);
    }
    useEffect(() => {
        getOrders();
    }, []);

    /**
   * orderList
   * @description Maps all orders in the interface
   * @returns Component with name and id of the order
   */
    function orderList() {
        return orders.map((order) => (
            <OrderElement order={order} key={order.objectId} />
        ));
    }

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 w-75">
                <Row>
                    <Col>
                        <h1 className="my-2">Dashboard</h1>
                        <h3 className="my-2">Pedidos</h3>
                    </Col>
                </Row>
                <Row>
                    {orderList()}
                </Row>
            </div>
        </div>
    );
}

export default OrdersAdmin;
