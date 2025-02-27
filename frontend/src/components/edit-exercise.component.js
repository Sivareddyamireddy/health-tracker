import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/exercises/${id}`);
        const exercise = response.data;
        setUsername(exercise.username);
        setDescription(exercise.description);
        setDuration(exercise.duration);
        setDate(new Date(exercise.date));
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };

    fetchExercise();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    try {
      await axios.post(`http://localhost:5000/exercises/update/${id}`, exercise);
      navigate('/'); // Redirect to the exercises list after successful update
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <input type="date" className="form-control" value={date.toISOString().substring(0, 10)} onChange={(e) => setDate(new Date(e.target.value))} />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;