import React, { useEffect, useState } from 'react';

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
                <tbody>
                    <th>{roles.objectId}</th>
                    <th>{roles.username}</th>
                </tbody>
            </table>
        </div>
    );
}
