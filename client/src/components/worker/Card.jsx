function Card(cardIcon, title) {
    return (
        <div className="card home-card text-center">
            <div className="card-body">
                <ion-icon className="card-icon align-middle" name={`${cardIcon}-outline`} />
                <p className="card-title align-middle">{title}</p>
            </div>
        </div>
    );
}

export default Card;
