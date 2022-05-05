import Card from './Card';
import Header from './Header';

function Process() {
    return (
        <div>
            <div className="header">{Header('Conteo')}</div>
            {Card('home', 'Check In')}
            {Card('home', 'Check Out')}
        </div>
    );
}

export default Process;
