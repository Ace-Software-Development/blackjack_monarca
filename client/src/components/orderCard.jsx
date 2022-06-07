function orderCard(title, city) {
    return (
        <div className="card home-card text-center ">
            <div className="card-body align-items-center justify-content-center">
                <div>
                    <br />
                    <br />
                    <h2 className="card-title align-middle mt-3">{title}</h2>
                    <h5 className="card-title align-middle mt-1">{city}</h5>
                </div>
            </div>
        </div>

    );
}

export default orderCard;
