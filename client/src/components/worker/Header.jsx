import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({ processName }) {
    const navigate = useNavigate();
    return (
        <Container className="d-flex">
            <Row className="w-100 mt-2">
                <div className="col-1 d-flex justify-content-start flex-column href=/inicio home">
                    <ion-icon name="home-outline" size="large" onClick={() => navigate('/inicio')} />
                </div>
                <div className="d-flex justify-content-center">
                    <div className="justify-content-center">
                        <h1>{processName}</h1>
                    </div>
                </div>
            </Row>
        </Container>
    );
}
Header.propTypes = {
    processName: PropTypes.string.isRequired,
};

export default Header;
