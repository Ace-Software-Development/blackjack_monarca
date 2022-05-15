/* eslint-disable jsx-a11y/anchor-is-valid */

export function CardCategory(name) {
    return (
        <div className="text-center my-4">
            <a href="#">
                <button type="button" className="cardName btn text-center w-100 py-4">
                    {name}
                </button>
            </a>
        </div>
    );
}

function Category() {
    return (
        <div className="row w-100 justify-content-center align-self-stretch">
            <div className="col-4 px-5">
                {CardCategory('Ollas')}
            </div>
            <div className="col-4 px-5">
                {CardCategory('Sartenes')}
            </div>
            <div className="col-4 px-5">
                {CardCategory('Vaporera')}
            </div>
            <div className="col-4 px-5">
                {CardCategory('Charola')}
            </div>
            <div className="col-4 px-5">
                {CardCategory('Moldes')}
            </div>
            <div className="col-4 px-5">
                {CardCategory('Recta')}
            </div>
            <div className="col-4 px-5">
                {CardCategory('Arrocera')}
            </div>
            <div className="col-4 px-5">
                {CardCategory('Antiadherente')}
            </div>
            <div className="col-4 px-5">
                {CardCategory('Paella')}
            </div>
            <div className="col-4 px-5">
                {CardCategory('Circular')}
            </div>
        </div>
    );
}
export default Category;
