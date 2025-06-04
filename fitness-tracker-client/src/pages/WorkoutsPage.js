import { useEffect, useState } from 'react';
import axios from '../api/axios';
import WorkoutChart from './WorkoutsChart';

function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({ type: '', duration: '', caloriesBurned: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchWorkouts = async () => {
    const res = await axios.get('/workouts');
    setWorkouts(res.data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(/workouts/${editingId}, form);
    } else {
      await axios.post('/workouts', form);
    }
    setForm({ type: '', duration: '', caloriesBurned: '' });
    setEditingId(null);
    fetchWorkouts();
  };

  const handleEdit = (workout) => {
    setForm({
      type: workout.type,
      duration: workout.duration,
      caloriesBurned: workout.caloriesBurned,
    });
    setEditingId(workout._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(/workouts/${id});
    fetchWorkouts();
  };

  return (
    <div className="container">
      <h2>My Workouts</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="type"
          placeholder="Workout type (e.g., Cardio)"
          value={form.type}
          onChange={handleChange}
          required
        />
        <input
          name="duration"
          type="number"
          placeholder="Duration (mins)"
          value={form.duration}
          onChange={handleChange}
          required
        />
        <input
          name="caloriesBurned"
          type="number"
          placeholder="Calories burned"
          value={form.caloriesBurned}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Workout</button>
      </form>

      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            {workout.type} - {workout.duration} mins - {workout.caloriesBurned} cal
            <button onClick={() => handleEdit(workout)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(workout._id)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  <WorkoutChart/>
}

export default WorkoutsPage;