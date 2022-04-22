function Card(cardIcon, title) {
  return (
    <div className="card home-card text-center ">
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <div>
          <ion-icon className="card-icon align-middle" name={`${cardIcon}-outline`} />
        </div>
        <div>
          <p className="card-title align-middle">{title}</p>
        </div>
      </div>
    </div>

  );
}

export default Card;
