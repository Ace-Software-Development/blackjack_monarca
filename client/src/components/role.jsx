import React, { useEffect, useState } from 'react';

function ListElement(props) {
  const { record } = props;
  return (
    <tr>
      <td>{record.id}</td>
      <td>{record.name}</td>
    </tr>
  );
}

export default function Roles() {
  const [roles, setRoles] = useState([]);

  // Fetches roles from database
  useEffect(() => {
    async function getRoles() {
      const response = await fetch('http://localhost:8888/role');
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const role = await response.json();
      setRoles(role.data);
    }

    getRoles();
  });

  // Maps the roles on the table
  function roleList() {
    return roles.map((record) => (
      <ListElement record={record} key={record.id} />
    ));
  }

  // Displays a table with the roles
  return (
    <div>
      <h3>Roles</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>{roleList()}</tbody>
      </table>
    </div>
  );
}
