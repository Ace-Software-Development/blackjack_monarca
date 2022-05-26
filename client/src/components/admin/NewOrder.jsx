import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Sidebar from './Sidebar';

/**
 * Categories
 * @description React component to display each category in a card
 * @param part: Json with the attributes objectId and name
 * @returns Div component
 */
function Categories({ category }) {
    return (
        <div>
            {category.name}
        </div>
    );
}
Categories.propTypes = {
    category: PropTypes.string.isRequired,
};

/**
 * Orders
 * @description React component to display each order in a table
 * @param order: Json with the attributes objectId and category, model and number
 * @returns <tr> component
 */
function Orders({ order }) {
    return (
        <tr>
            <th>
                <div>{order.category_name}</div>
                <div className="sub-text2">Categoría</div>
            </th>
            <th>
                <div>{order.model_name}</div>
                <div className="sub-text1">modelo</div>
            </th>
            <th>
                <div>{(order.number)}</div>
                <div className="sub-text1">Cantidad</div>
            </th>
        </tr>
    );
}
Orders.propTypes = {
    order: PropTypes.string.isRequired,
};

function AddProduct() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setCategorySelected] = useState('');
    const [models, setModels] = useState([]);
    const [modelsOption, setModelsOption] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [modelName, setModelName] = useState([]);
    const [orders, setOrders] = useState([]);

    const categoriesOption = [];
    /**
     * getCategories
     * @description Fetches existing categories from the database through the server
     */
    async function getCategories() {
        const response = await fetch('http://localhost:8888/entrega/categorias/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const category = await response.json();
        setCategories(category.data);
    }

    /**
     * getOrders
     * @description Fetches existing orders from the database through the server
     */
    async function getOrders() {
        const response = await fetch('http://localhost:8888/productOrder/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const order = await response.json();
        setOrders(order.data);
    }

    /**
   * ModelsList
   * @description Maps all models in the interface
   * @returns Component with name and id of the model
   */
    async function modelsList() {
        const auxModelsOption = [];
        for (let i = 0; i < models.length; i += 1) {
            auxModelsOption[i] = {
                label: `${models[i].model} ${models[i].aluminium}`,
                value: models[i].objectId,
            };
        }
        setModelsOption(auxModelsOption);
    }

    /**
     * getModels
     * @description Fetches existing products from the database through the server
     */
    async function getModels() {
        const response = await fetch(`http://localhost:8888/entrega/modelos/get/${selectedCategory}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const product = await response.json();
        setModels(product.data);
    }

    useEffect(() => {
        getCategories();
    }, []);

    /**
   * categoriesList
   * @description Maps all categories in the interface
   * @returns Component with name and id of the category
   */
    function categoriesList() {
        for (let i = 0; i < categories.length; i += 1) {
            categoriesOption[i] = { label: categories[i].name, value: categories[i].objectId };
        }
    }

    categoriesList();

    useEffect(() => {
        console.log(`category changed to ${selectedCategory}`);
    }, [selectedCategory]);
    useEffect(() => {
        console.log(`modelo changed to ${modelsOption}`);
    }, [modelsOption]);

    function categorySelect(category) {
        for (let i = 0; i < categories.length; i += 1) {
            if (category.value === categories[i].objectId) {
                setCategorySelected(categories[i].objectId);
                setCategoryName(categories[i].name);
            }
        }
    }

    function modelSelect(model) {
        for (let i = 0; i < models.length; i += 1) {
            if (model.value === models[i].objectId) {
                setModelName(`${models[i].model} ${models[i].aluminium}`);
            }
        }
    }

    useEffect(() => {
        getModels();
    }, [selectedCategory]);

    useEffect(() => {
        modelsList();
    }, [models]);

    const [form, setForm] = useState({
        catName: '',
        modName: '',
        number: 0,
    });

    /**
   * updateForm
   * @description updates data of a form
   * @param value: new values of the form
   * @returns an updated form
   */
    function updateForm(value) {
        console.log('entre');
        console.log(value);
        return setForm((prev) => ({ ...prev, ...value }));
    }

    useEffect(() => {
        console.log(categoryName);
        updateForm({ catName: categoryName });
    }, [categoryName]);

    useEffect(() => {
        console.log(modelName);
        updateForm({ modName: modelName });
    }, [modelName]);

    async function onSubmit1(e) {
        e.preventDefault();
        console.log('cut');

        const newProduct = { ...form };

        await fetch('http://localhost:8888/productOrder/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then(() => {
                console.log('new product added');
            })
            .catch((error) => {
                window.alert(error);
            });

        setForm({
            catName: '',
            modName: '',
            number: 0,
        });
    }

    useEffect(() => {
        getOrders();
    }, []);

    /**
   * ordersList
   * @description Maps all orders in the interface
   * @returns Component with category model and quantity of orders
   */
    function ordersList() {
        return orders.slice(0).reverse().map((order) => (
            <Orders order={order} key={order.objectID} />
        ));
    }

    return (
        <container>
            <div className="row d-flex justify-content-center">
                <div className="card conteo-card">
                    <div className="card-body">
                        <h5>
                            <div className="row">
                                <div className="form-group col-3">
                                    Categoria
                                </div>
                                <div className="form-group col-3">
                                    Modelo
                                </div>
                                <div className="form-group col-3">
                                    Cantidad
                                </div>
                            </div>
                            <div className="mt-2 row">
                                <div className="form-group col-3">
                                    <Select
                                      options={categoriesOption}
                                      onChange={(e) => categorySelect(e)}
                                      required
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <Select
                                      options={modelsOption}
                                      onChange={(e) => modelSelect(e)}
                                      required
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <input type="number" className="form-control" id="number" name="number" min="1" pattern="^[0-9]+" value={form.number} onChange={(e) => updateForm({ number: e.target.value })} required />
                                </div>
                                <div className="form-group col-3">
                                    <button
                                      placeholder="Cantidad"
                                      className="btn-orange"
                                      onClick={onSubmit1}
                                      type="button"
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </h5>
                        <div className="mt-4">
                            <p>Resumen</p>
                            <table className="table table-striped" style={{ marginTop: 20 }}>
                                <thead>
                                    <tr>
                                        <th>Categoria</th>
                                        <th>Modelo</th>
                                        <th>Cantidad</th>
                                        <th hidden> Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordersList()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </container>
    );
}

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
            window.customAlert(message);
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

    const [citySelected, setCitySelected] = useState([]);

    function citySelect(buyer) {
        for (let i = 0; i < buyers.length; i += 1) {
            if (buyer.value === buyers[i].objectId) {
                setCitySelected(buyers[i]);
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
                            <div className="form-group col-3">
                                <h5>Cliente</h5>
                                <Select
                                  options={buyersOption}
                                  onChange={(e) => citySelect(e)}
                                  required
                                />
                            </div>
                            <div className="form-group col-3">
                                <h5>Ciudad</h5>
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    {citySelected.city}
                                    <input type="hidden" />
                                </label>
                            </div>
                            <div className="form-group col-3">
                                <h5>Telefono</h5>
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    {citySelected.phone}
                                    <input type="hidden" />
                                </label>
                            </div>
                            <div className="form-group col-3">
                                <h5>Correo</h5>
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    {citySelected.mail}
                                    <input type="hidden" />
                                </label>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <AddProduct />
                            <div className="mt-4 col-4">
                                <button type="submit" className="btn-orange mb-4">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewOrder;
