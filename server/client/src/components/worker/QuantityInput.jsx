function QuantityInput() {
    return (
        <div className="row quantity-input">
            <div className="col-3">
                <button className="btn btnNumber w-100 ratio ratio-1x1 p-5" type="submit">
                    <ion-icon name="remove-outline" />
                </button>
            </div>
            <div className="col-6">
                <input className="w-100 h-100" type="text" name="quantityNumber" disabled />
            </div>
            <div className="col-3">
                <button className="btn btnNumber w-100 ratio ratio-1x1 p-5" type="submit">
                    <ion-icon name="add-outline" />
                </button>
            </div>
        </div>
    );
}

export default QuantityInput;
