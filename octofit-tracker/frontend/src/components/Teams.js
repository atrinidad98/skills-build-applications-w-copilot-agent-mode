import React, { useEffect, useState } from 'react';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = `https://${codespaceName}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results ? data.results : data;
        setTeams(items);
        console.log('Fetched Teams:', items);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Teams</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <td>{idx + 1}</td>
                <td>{team.name || '-'}</td>
                <td>{team.members ? team.members.length : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
