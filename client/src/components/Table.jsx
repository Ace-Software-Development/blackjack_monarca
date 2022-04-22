import 'bootstrap/dist/css/bootstrap.css';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

const $ = require('jquery');
$.DataTable = require('datatables.net');

function Table() {
  return (
    <div className="table-container top-50 start-50 translate-middle">
      <table id="table_id" className="display">
        <thead>
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
