import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/');
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
          setUsername(response.data[0].username);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exercise = { username, description, duration, date };

    try {
      const res = await axios.post('http://localhost:5000/exercises/add', exercise);
      console.log(res.data);
      window.location = '/';
    } catch (error) {
      console.error("Error creating exercise:", error);
    }
  };

  return (
    <div >
      <h3 style={{ color: '#333', marginBottom: '20px' }}>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}> 
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            {users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}> 
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Description: </label>
          <input 
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Duration (in minutes): </label>
          <input 
            type="number"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Date: </label>
          <DatePicker 
            selected={date} 
            onChange={(date) => setDate(date)} 
            style={{ width: '30%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div className="form-group">
          <input 
            type="submit" 
            value="Create Exercise Log" 
            className="btn btn-primary" 
            style={{ width: '15%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} 
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
