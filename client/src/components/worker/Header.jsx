import 'bootstrap/dist/css/bootstrap.css';

function Header(processName) {
    return (
        <div>
            <div className="row header">
                <div className="col">
                    <div className="header-icon">
                        <ion-icon name="home-outline" size="large" />
                    </div>
                </div>
                <div className="col align-self-center">
                    <h3>{processName}</h3>
                </div>
            </div>
        </div>
    );
}

export default Header;
