import Card from './Card';
import 'bootstrap/dist/css/bootstrap.css';

function Rechazado() {
  return (
    <container>
      <div className="logo-monarca">
        <img src="./logo.svg" alt="logo monarca" />
      </div>
      <div className="container position-absolute top-50 start-50 translate-middle">
        <div className="row">
          <div className="col-4">
            {Card('checkbox', 'Por confirmar')}
          </div>
          <div className="col-4">
            {Card('time', 'Pendientes')}
          </div>
        </div>
      </div>

    </container>
  );
}

export default Rechazado;
