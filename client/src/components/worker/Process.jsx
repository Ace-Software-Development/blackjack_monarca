import { useParams } from 'react-router-dom';
import Card from './Card';
import Header from './Header';

function Process() {
    const { process } = useParams();
    const { nextProcess } = useParams();
    const href = `/parte/${process}/${nextProcess}`;
    return (
        <div>
            <Header processName={process} />
            <div className="d-flex flex-column align-items-center">
                <div className="row mt-5 pt-5">
                    <div className="col">
                        <a href={href}>
                            {Card('home', 'Recibir')}
                        </a>
                    </div>
                    <div className="col">
                        <a href={href}>
                            {Card('home', 'Entregar')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Process;
