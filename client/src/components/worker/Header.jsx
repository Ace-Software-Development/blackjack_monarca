import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

function Header({ processName }) {
    return (
        <div>
            <div className="row header">
                <div className="col">
                    <a href="/inicio" className="header-icon">
                        <ion-icon name="home-outline" size="large" />
                    </a>
                </div>
                <div className="col align-self-center">
                    <h3>{processName}</h3>
                </div>
            </div>
        </div>
    );
}
Header.propTypes = {
    processName: PropTypes.string.isRequired,
};

export default Header;
