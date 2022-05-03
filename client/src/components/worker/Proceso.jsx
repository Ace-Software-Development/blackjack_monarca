import Header from './Header';
import Table from '../Table';

function Proceso() {
    return (
        <div>
            <div className="header">{Header('Conteo')}</div>
            {Table()}
        </div>
    );
}

export default Proceso;
