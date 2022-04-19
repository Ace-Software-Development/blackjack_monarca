import Card from './Card';

function Inicio() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          {Card('calculator', 'Conteo')}
        </div>
        <div className="col-4">
          {Card('calculator', '2')}
        </div>
        <div className="col-4">
          {Card('calculator', '3')}
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          {Card('calculator', '4')}
        </div>
        <div className="col-4">
          {Card('calculator', '5')}
        </div>
        <div className="col-4">
          {Card('calculator', '6')}
        </div>
      </div>
    </div>
  );
}

export default Inicio;
