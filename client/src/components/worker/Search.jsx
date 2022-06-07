/* eslint-disable jsx-a11y/anchor-is-valid */

function Search() {
    return (
        <div className="card-shadow bg-white">
            <div className="row">
                <h5>Medidas</h5>
            </div>
            <div className="row">
                <div className="col-9">
                    <div className="search-box">
                        <ion-icon name="search" className="search-outline" />
                        <input type="text" className="w-100" name="modelNumber" placeholder="Ingrese número de modelo" aria-label="modelNumber" />
                    </div>
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-monarca w-100 h-100">Buscar</button>
                </div>
            </div>
        </div>
    );
}

export default Search;
