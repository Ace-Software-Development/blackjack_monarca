/* eslint-disable jsx-a11y/anchor-is-valid */
import { CardName } from './NamePart';
import { NumKey } from './NumKey';
import QuantityInput from './QuantityInput';

function Quantity() {
    return (
        <div className="row">
            <div className="col-7 p-4">
                <div className="row">
                    <div className="col">
                        <div className="card-shadow bg-white">
                            <div className="row">
                                <h5>Resumen</h5>
                                <p>Parka - Base - Vaporera 70</p>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <ul className="nav nav-pills nav-fill mb-3 tab-select" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Completados</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Segunda</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                {QuantityInput()}
                                            </div>
                                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                {QuantityInput()}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-monarca">Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {CardName('Parka')}
                    </div>
                    <div className="col-6">
                        {CardName('Vaporera')}
                    </div>
                </div>
            </div>
            {NumKey()}
        </div>
    );
}

export default Quantity;
