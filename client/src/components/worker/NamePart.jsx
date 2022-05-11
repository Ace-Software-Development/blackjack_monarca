/* eslint-disable jsx-a11y/anchor-is-valid */

export function CardName(name) {
    return (
        <div className="text-center my-4">
            <a href="#">
                <button type="button" className="cardName btn text-center w-100 py-4 bg-white">
                    {name}
                </button>
            </a>
        </div>
    );
}

export function CardPart(name) {
    return (
        <div className="card text-center">
            <div className="card-body text-center w-100 py-4">
                <a href="#">
                    <h2 className="workerName">{name}</h2>
                </a>
            </div>
        </div>
    );
}

function NamePart() {
    return (
        <div className="d-flex row h-100 w-100">
            <div className="col-6 bg-white px-5 justify-content-center d-flex flex-column">
                {CardName('Chato')}
                {CardName('Parka')}
                {CardName('Conejo')}
                {CardName('Pelos')}
            </div>
            <div className="col-6 px-5 d-flex justify-content-center flex-column">
                {CardName('Tapa')}
                {CardName('Base')}
                {CardName('Cuerpo')}
            </div>
        </div>
    );
}
export default NamePart;
