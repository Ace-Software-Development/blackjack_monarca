// CU 14 Consultar pedido
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import '../admin/styles/dashboard.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import orderCard from '../orderCardWorker';
import Header from './Header';
import Environment from '../Environment';

/**
 * OrderElement
 * @description React component to display each order in a card
 * @param part: Json with the attributes objectId and name
 * @returns Div component
 */
function OrderElement({ order }) {
    return (
        <div className="col-4 px-5" value={order.objectId}>
            <a href={`/empacado/pedidos/${order.objectId}`}>{orderCard(order.name, `${order.id_buyer.name} - ${order.id_buyer.city}`, `${(order.createdAt).slice(0, 10)} - ${(order.possible_day).slice(0, 10)}`, order)}</a>
        </div>
    );
}
OrderElement.propTypes = {
    order: PropTypes.string.isRequired,
};

function Orders() {
    const [orders, setOrders] = useState([]);

    const session = Cookies.get('sessionToken');
    const [permission, setPermission] = useState([]);
    /**
     * getPermission
     * @description Verifies that the user session token is valid
     */
    async function getPermission() {
        const response = await fetch(`${Environment()}/login/getPermission/${session}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const perm = await response.json();
        setPermission(perm.data);
    }
    useEffect(() => {
        getPermission();
    }, []);

    if (!permission) {
        return ('No tienes permisos');
    }

    /**
     * getOrders
     * @description Fetches existing orders from the database through the server
     */
    async function getOrders() {
        const response = await fetch(`${Environment()}/empacado/ordenes/get`);
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
        <div className="row w-100 justify-content-center align-self-stretch">
            <div>
                <Header processName="Pedidos en curso" />
            </div>
            {orderList()}
        </div>
    );
}

export default Orders;
