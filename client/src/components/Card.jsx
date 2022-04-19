function Card(cardIcon, title) {
  return (
    <div className="card home-card text-center">
      <div className="card-body">
        <ion-icon className="card-icon" name={`${cardIcon}-outline`} />
        <p className="card-title">{title}</p>
      </div>
    </div>
  );
}

export default Card;
