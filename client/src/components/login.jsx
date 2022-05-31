// CU 9 LogIn
import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

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
        const response = await fetch('http://localhost:8888/login/post', {
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
        <div>
            <section className="h-100 gradient-form">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6 d-flex align-items-center justify-content-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <img src="./logo.svg" style={{ width: '300px' }} alt="logo" />
                                            <br />
                                            <br />
                                            <h5 className="mb-0 text-center">Capullo</h5>
                                            <h5 className="mb-0 text-center">Sistema de inventario</h5>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <h4 className="mt-1 mb-5 pb-1">Inicia Sesión</h4>
                                            </div>

                                            <form onSubmit={onSubmit} id="loginForm">
                                                <p>Por favor ingresa tu usuario y contraseña.</p>

                                                <div className="form-outline mb-4">
                                                    <input type="email" id="username" className="form-control" placeholder="Usuario" onChange={(e) => updateForm({ username: e.target.value })} />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="password" id="password" className="form-control" placeholder="Contraseña" onChange={(e) => updateForm({ password: e.target.value })} />
                                                </div>

                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button className="btn-orange fa-lg mb-3" type="submit" form="loginForm">Ingresar</button>
                                                    <br />
                                                    <a className="text-muted" href="#!">¿Olvidaste tu contraseña?</a>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Login;
