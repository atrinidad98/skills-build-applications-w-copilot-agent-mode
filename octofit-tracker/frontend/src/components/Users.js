import React, { useEffect, useState } from 'react';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = `https://${codespaceName}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results ? data.results : data;
        setUsers(items);
        console.log('Fetched Users:', items);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Users</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td>{idx + 1}</td>
                <td>{user.username || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>{user.team || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
