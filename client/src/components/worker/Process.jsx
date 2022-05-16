import { useParams } from 'react-router-dom';
import Card from './Card';
import Header from './Header';

function Process() {
    const { process } = useParams();
    const href = `/parte/${process}`;
    return (
        <div>
            <Header processName={process} />
            <a href={href}>
                {Card('home', 'Recibir')}
            </a>
            <a href={href}>
                {Card('home', 'Entregar')}
            </a>
        </div>
    );
}

export default Process;
