import ProgressBar from 'react-bootstrap/ProgressBar';

function orderCard(prog, title) {
  return (
    <div className="card home-card text-center ">
      <div className="card-body align-items-center justify-content-center">
        <div>
          <br />
          <br />
          <ProgressBar variant="warning" now={prog} style={{ height: '25px' }} />
          <h2 className="card-title align-middle">{title}</h2>
        </div>
      </div>
    </div>

  );
}

export default orderCard;
