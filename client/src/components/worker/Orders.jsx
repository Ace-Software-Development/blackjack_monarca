import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import '../admin/styles/dashboard.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import orderCard from '../orderCard';

/**
 * Categories
 * @description React component to display each category in a card
 * @param part: Json with the attributes objectId and name
 * @returns Div component
 */
function OrderElement({ order }) {
    return (
        <div className="col-4 px-5" value={order.objectId}>
            <a href={`/pedidos/${order.objectId}`}>{orderCard('75', order.id_buyer.name, order.city_buyer)}</a>
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
        const response = await fetch(`http://localhost:8888/login/getPermission/${session}`);
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
     * getCategories
     * @description Fetches existing categories from the database through the server
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
   * categoryList
   * @description Maps all categories in the interface
   * @returns Component with name and id of the category
   */
    function orderList() {
        return orders.map((order) => (
            <OrderElement order={order} key={order.objectId} />
        ));
    }

    return (
        <div className="row w-100 justify-content-center align-self-stretch">
            {orderList()}
        </div>
    );
}

export default Orders;
