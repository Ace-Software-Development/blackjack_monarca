function orderCard(title, city, date, order) {
    return (
        <div className="card home-card text-center ">
            <div className="card-body align-items-center justify-content-center">
                <div>
                    <a href={`/empacado/pedidos/${order.objectId}`}>
                        <div className="row">
                            <h2 className="align-middle mt-3">{title}</h2>
                            <h5 className="align-middle mt-1 orange-text">{city}</h5>
                            <h5 className="align-middle mt-1">{date}</h5>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default orderCard;
