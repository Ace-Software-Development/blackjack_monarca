/* eslint-disable jsx-a11y/anchor-is-valid */

function NumberButton(number) {
    return (
        <div className="col-4 m-2 numberBtn">
            <div>
                {number}
            </div>
        </div>
    );
}

function NumKey() {
    return (
        <div className="col-5 h-100 p-5 position-absolute top-0 end-0 keypad bg-white">
            <div className="row d-flex justify-content-evenly">
                {NumberButton(1)}
                {NumberButton(2)}
                {NumberButton(3)}
            </div>
            <div className="row d-flex justify-content-evenly">
                {NumberButton(4)}
                {NumberButton(5)}
                {NumberButton(6)}
            </div>
            <div className="row d-flex justify-content-evenly">
                {NumberButton(7)}
                {NumberButton(8)}
                {NumberButton(9)}
            </div>
            <div className="row d-flex justify-content-evenly">
                <div className="col-4 m-2 numberBtn">
                    {NumberButton(0)}
                </div>
            </div>
        </div>
    );
}
export { NumberButton, NumKey };
