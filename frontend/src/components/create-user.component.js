import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username };

    try {
      const res = await axios.post('http://localhost:5000/users/add', user);
      console.log(res.data);
      setUsername(''); // Reset input field
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div >
      <h3 style={{color: '#333', marginBottom: '20px' }}>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '20px' }}> 
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Username:</label>
          <input 
            type="text"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div className="form-group">
          <input 
            type="submit" 
            value="Create User" 
            className="btn btn-primary" 
            style={{ width: '15%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} 
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
