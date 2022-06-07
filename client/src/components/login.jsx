// CU 9 LogIn
import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Environment from './Environment';

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [res, setRes] = useState(new Response());
    /**
   * onSubmit
   * @description Posts the auth data to the api and receives the status
   * @param e: Context
   */

    async function onSubmit(e) {
        e.preventDefault();
        console.log('iniciando sesión');
        const credentials = { ...form };
        const response = await fetch(`${Environment()}/login/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        console.log(data.is_admin);
        setRes(response);
        console.log(res);
        console.log('user logged in: ', response);
        Cookies.set('sessionToken', data.sessionToken);
        Cookies.set('is_admin', data.is_admin);
        if (response.status === 500) {
            //  window.alert('Lo sentimos, en este momento no es posible procesar tu solicitud.');
        } else if (response.status === 403) {
            //  window.alert('El usuario o contraseña ingresados son incorrectos.');
        } else if (data.is_admin) {
            navigate('/dashboard');
        } else {
            navigate('/inicio');
        }
    }

    /**
   * updateForm
   * @description updates data of a form
   * @param value: new values of the form
   * @returns an updated form
   */
    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    return (
        <div className="h-100 bg-white">
            <section className="h-100 gradient-form">
                <div className="container-fluid p-4 h-100">
                    <Row className="h-100 login">
                        <Col md={12} className="login-form">
                            <Container className="h-100 d-flex flex-column justify-content-center p-lg-5 login-card">
                                <img src="./MariposaOllas.svg" alt="logo" className="h-50 w-50 align-self-center" />
                                <div className="text-center align-self-center">
                                    <h2 className="text-center">Inventario Aluminio Monarca</h2>
                                </div>

                                <form onSubmit={onSubmit} id="loginForm">
                                    <p className="text-center">Por favor ingresa tu usuario y contraseña.</p>

                                    <div className="mb-4">
                                        <input type="email" id="username" className="form-control" placeholder="usuario@mail.com" onChange={(e) => updateForm({ username: e.target.value })} />
                                    </div>

                                    <div className="mb-4">
                                        <input type="password" id="password" className="form-control" placeholder="Contraseña" onChange={(e) => updateForm({ password: e.target.value })} />
                                    </div>

                                    <div className="text-center pt-1 pb-1">
                                        <button className="btn-orange fa-lg mb-3" type="submit" form="loginForm">Ingresar</button>
                                    </div>
                                </form>
                            </Container>
                            {/* <div className="p-md-5 mx-md-4 h-100">
                            </div> */}
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
}
export default Login;
