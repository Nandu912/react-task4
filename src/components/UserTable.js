
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/users')
      .then((response) => {
        const userData = response.data.users;
        setUsers(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (users.length === 0) {
    return <p>No user data available.</p>;
  }

  const columnNames = Object.keys(users[0]);

  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            {columnNames.map((columnName) => (
              <th key={columnName}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              {columnNames.map((columnName) => (
                <td key={columnName}>
                  {typeof user[columnName] === 'object'
                    ? JSON.stringify(user[columnName])
                    : user[columnName]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
