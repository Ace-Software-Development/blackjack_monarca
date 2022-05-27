import { useParams } from 'react-router-dom';
import Card from './Card';
import Header from './Header';

/**
   * Process
   * @description Displays cards which redirect to check in and checkout features
   */
function Process() {
    const { process } = useParams();
    const { nextProcess } = useParams();
    const { prevProcess } = useParams();
    const hrefEntrega = `/parte/${process}/${nextProcess}`;
    const hrefConfirm = `/confirmar/${process}/${prevProcess}`;
    const hrefIncident = '/rechazado/incidente';
    if (process === 'Rechazado') {
        return (
            <div>
                <Header processName={process} />
                <div className="d-flex flex-column align-items-center">
                    <div className="row mt-5 pt-5">
                        <div className="col">
                            <a href={hrefIncident}>
                                {Card('trash-bin', 'Incidentes')}
                            </a>
                        </div>
                        <div className="col">
                            <a href={hrefConfirm}>
                                {Card('home', 'Recibir')}
                            </a>
                        </div>
                        <div className="col">
                            <a href={hrefEntrega}>
                                {Card('home', 'Entregar')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Header processName={process} />
            <div className="d-flex flex-column align-items-center">
                <div className="row mt-5 pt-5">
                    <div className="col">
                        <a href={hrefConfirm}>
                            {Card('home', 'Recibir')}
                        </a>
                    </div>
                    <div className="col">
                        <a href={hrefEntrega}>
                            {Card('home', 'Entregar')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Process;
