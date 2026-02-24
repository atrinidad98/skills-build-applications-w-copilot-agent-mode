import React, { useEffect, useState } from 'react';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results ? data.results : data;
        setWorkouts(items);
        console.log('Fetched Workouts:', items);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Workouts</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <td>{idx + 1}</td>
                <td>{workout.name || '-'}</td>
                <td>{workout.description || '-'}</td>
                <td>{workout.duration || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
