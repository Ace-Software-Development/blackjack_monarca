import 'bootstrap/dist/css/bootstrap.css';

function SuccessAlert(message) {
    return (
        <div className="alert alert-success" role="alert">
            { message }
        </div>
    );
}

export default SuccessAlert;
