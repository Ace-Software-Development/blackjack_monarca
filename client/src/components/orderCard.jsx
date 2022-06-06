function orderCard(title, city) {
    return (
        <div className="h-100 card home-card text-center ">
            <div className="align-items-center justify-content-center">
                <div>
                    <h2 className="align-middle mt-4">{title}</h2>
                    <h5 className="align-middle mt-1 mb-3 orange-text">{city}</h5>
                </div>
            </div>
        </div>

    );
}

export default orderCard;
