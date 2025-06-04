import { useEffect, useState } from 'react';
import axios from '../api/axios';

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({
    targetType: '',
    targetValue: '',
    deadline: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchGoals = async () => {
    const res = await axios.get('/goals');
    setGoals(res.data);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(/goals/${editingId}, form);
    } else {
      await axios.post('/goals', form);
    }
    setForm({ targetType: '', targetValue: '', deadline: '' });
    setEditingId(null);
    fetchGoals();
  };

  const handleEdit = (goal) => {
    setForm({
      targetType: goal.targetType,
      targetValue: goal.targetValue,
      deadline: goal.deadline?.split('T')[0] || '',
    });
    setEditingId(goal._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(/goals/${id});
    fetchGoals();
  };

  return (
    <div className="container">
      <h2>My Fitness Goals</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="targetType"
          placeholder="Goal Type (e.g. Lose weight)"
          value={form.targetType}
          onChange={handleChange}
          required
        />
        <input
          name="targetValue"
          type="number"
          placeholder="Target Value"
          value={form.targetValue}
          onChange={handleChange}
          required
        />
        <input
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Goal</button>
      </form>

      <ul>
        {goals.map((goal) => (
          <li key={goal._id}>
            <strong>{goal.targetType}</strong> – {goal.targetValue}
            {goal.deadline && ` (by ${new Date(goal.deadline).toLocaleDateString()})`}
            <button onClick={() => handleEdit(goal)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(goal._id)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalsPage;