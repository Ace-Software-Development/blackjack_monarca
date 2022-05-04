import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import '../admin/styles/dashboard.css';
import './styles/conteo.css';

function Conteo() {
    const discos = [
        {
            material: 'Alumnio 340*520 super fuerte',
            cantidad: '20',
        },
        {
            material: 'Alumnio 30*50 super fuerte',
            cantidad: '200',
        },
        {
            material: 'Alumnio 30*50',
            cantidad: '1500',
        },
    ];

    return (
        <container>
            <div>
                <h1 className="mt-4" align="center">Conteo</h1>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-10 mt-4">
                    <div className="card conteo-card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    <p>Medidas</p>
                                </div>
                                <div className="col">
                                    <p>Cantidad</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <input placeholder="Ingrese las medidas ej. 180 x 50" className="conteo-input" />
                                </div>
                                <div className="col">
                                    <input type="number" className="conteo-input" />
                                </div>
                                <div className="col d-flex align-content-center">
                                    <button placeholder="Cantidad" className="btn-orange" type="button">Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-10 mt-4">
                    <div className="card conteo-card">
                        <div className="card-body">
                            <div>
                                <p>Resumen</p>
                                <table className="table table-striped" style={{ marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                            <th>Material</th>
                                            <th>Cantidad</th>
                                            <th hidden>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {discos.map((disco) => (
                                            <tr>
                                                <th>
                                                    <div>{disco.material}</div>
                                                    <div className="sub-text2">compatibles</div>
                                                </th>
                                                <th>
                                                    <div>{disco.cantidad}</div>
                                                    <div className="sub-text1">piezas</div>
                                                </th>
                                                <th>Editar</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </container>
    );
}

export default Conteo;
