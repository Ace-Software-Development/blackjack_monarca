import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

function Header({ processName }) {
    return (
        <Container className="d-flex">
            <Row className="w-100 mt-2">
                <Col xs={3} s={4} md={4} lg={3} className="d-flex align-items-start flex-column">
                    <a href="/inicio">
                        <ion-icon name="home-outline" size="large" />
                    </a>
                </Col>
                <Col className="justify-content-center">
                    <div className="justify-content-center">
                        <h1>{processName}</h1>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
Header.propTypes = {
    processName: PropTypes.string.isRequired,
};

export default Header;
