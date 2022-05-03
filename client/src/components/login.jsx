function Login() {
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
                        <h4 classNameName="mt-1 mb-5 pb-1">Inicia Sesión</h4>
                      </div>

                      <form>
                        <p>Por favor ingresa tu usuario y contraseña.</p>

                        <div className="form-outline mb-4">
                          <input type="email" id="form2Example11" className="form-control" placeholder="Usuario" />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" id="form2Example22" className="form-control" placeholder="Contraseña" />
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-block btn-orange fa-lg mb-3" type="button">Log in</button>
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
