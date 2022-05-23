import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Sidebar from './Sidebar';

/**
 * NewOrder
 * @description creates a new order
 * @return HTML form to create a new order
 */
function NewOrder() {
    const buyersOption = [];

    const [buyers, setBuyer] = useState([]);

    async function getBuyers() {
        const response = await fetch('http://localhost:8888/buyer/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const buyer = await response.json();
        setBuyer(buyer.data);
    }

    function buyersList() {
        for (let i = 0; i < buyers.length; i += 1) {
            buyersOption[i] = { label: buyers[i].name, value: buyers[i].objectId };
        }
    }

    useEffect(() => {
        getBuyers();
    }, []);

    const [citySelected, setCitySelected] = useState('');

    function citySelect(buyer) {
        for (let i = 0; i < buyers.length; i += 1) {
            if (buyer.value === buyers[i].objectId) {
                setCitySelected(buyers[i].city);
            }
        }
    }

    buyersList();

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 h-100">
                <div className="row">
                    <h1 className="my-2">Nuevo pedido</h1>
                </div>
                <br />
                <div>
                    <form>
                        <div className="row">
                            <div className="form-group col-4">
                                <h5>Cliente</h5>
                                <Select
                                  options={buyersOption}
                                  onChange={(e) => citySelect(e)}
                                />
                            </div>
                            <div className="form-group col-4">
                                <h5>Ciudad</h5>
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    {citySelected}
                                    <input type="hidden" />
                                </label>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewOrder;
