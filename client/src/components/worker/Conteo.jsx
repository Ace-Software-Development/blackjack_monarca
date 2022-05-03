import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import '../admin/styles/dashboard.css';
import './styles/conteo.css';

function Conteo() {
    return (
        <container>
            <div>
                <h2 className="mt-4" align="center">Conteo</h2>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-7 mt-4">
                    <div className="card conteo-card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <p>Medidas</p>
                                    <input className="conteo-input" />
                                </div>
                                <div className="col">
                                    <p>Cantidad</p>
                                    <input className="conteo-input" />
                                </div>
                                <div className="col d-flex align-content-center mt-4 mb-3">
                                    <button className="btn-orange" type="button">Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </container>
    );
}

export default Conteo;
