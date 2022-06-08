function Card2(cardIcon, title) {
    return (
        <div className="card home-card2 text-center ">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div>
                    <ion-icon className="card-icon align-middle" name={`${cardIcon}-outline`} />
                </div>
                <div className="card-title align-middle">
                    {title}
                </div>
            </div>
        </div>

    );
}

export default Card2;
