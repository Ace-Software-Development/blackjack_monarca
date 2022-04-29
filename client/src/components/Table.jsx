import 'bootstrap/dist/css/bootstrap.css';

const $ = require('jquery');
$.DataTable = require('datatables.net-bs5');

function Table() {
    return (
        <div className="table-container top-50 start-50 translate-middle">
            <table id="table_id" className="table-worker table table-striped">
                <thead className="table-header">
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Row 1 Data 1</td>
                        <td>Row 1 Data 2</td>
                    </tr>
                    <tr>
                        <td>Row 2 Data 1</td>
                        <td>Row 2 Data 2</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

$(document).ready(() => {
    $('#table_id').DataTable();
});

export default Table;
