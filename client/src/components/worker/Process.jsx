import { useParams } from 'react-router-dom';
import Card from './Card';
import Header from './Header';

function Process() {
    const { process } = useParams();
    return (
        <div>
            <Header processName={process} />
            {Card('home', 'Check In')}
            {Card('home', 'Check Out')}
        </div>
    );
}

export default Process;
