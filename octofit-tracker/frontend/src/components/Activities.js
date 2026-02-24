import React, { useEffect, useState } from 'react';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = `https://${codespaceName}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results ? data.results : data;
        setActivities(items);
        console.log('Fetched Activities:', items);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Activities</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Duration</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <td>{idx + 1}</td>
                <td>{activity.name || '-'}</td>
                <td>{activity.date || '-'}</td>
                <td>{activity.duration || '-'}</td>
                <td>{activity.user || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-3">Add Activity</button>
      </div>
    </div>
  );
}

export default Activities;
