/* eslint-disable jsx-a11y/anchor-is-valid */
import { CardName } from './NamePart';
import { NumKey } from './NumKey';
import Search from './Search';

function ModelNumber() {
    return (
        <div className="row">
            <div className="col-7 p-4">
                <div className="row">
                    {Search()}
                </div>
                <div className="row">
                    <div className="col-4">
                        {CardName('80')}
                    </div>
                    <div className="col-4">
                        {CardName('70')}
                    </div>
                    <div className="col-4">
                        {CardName('60')}
                    </div>
                    <div className="col-4">
                        {CardName('80')}
                    </div>
                    <div className="col-4">
                        {CardName('70')}
                    </div>
                    <div className="col-4">
                        {CardName('60')}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {CardName('Parka')}
                    </div>
                    <div className="col-6">
                        {CardName('Vaporera')}
                    </div>
                </div>
            </div>
            {NumKey()}
        </div>
    );
}

export default ModelNumber;
