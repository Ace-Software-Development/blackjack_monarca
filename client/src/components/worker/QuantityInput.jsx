function QuantityInput() {
    function sum() {
        document.getElementById('quantityInput').stepUp();
    }
    function res() {
        document.getElementById('quantityInput').stepDown();
    }
    return (
        <div className="row quantity-input">
            <div className="col-3">
                <button className="btn btnNumber w-100 ratio ratio-1x1 p-5" type="button" onClick={() => res()}>
                    <ion-icon name="remove-outline" />
                </button>
            </div>
            <div className="col-6">
                <input className="w-100 h-100" type="number" min="1" pattern="^[0-9]+" name="quantityNumber" id="quantityInput" />
            </div>
            <div className="col-3">
                <button className="btn btnNumber w-100 ratio ratio-1x1 p-5" type="button" onClick={() => sum()}>
                    <ion-icon name="add-outline" />
                </button>
            </div>
        </div>
    );
}

export default QuantityInput;
