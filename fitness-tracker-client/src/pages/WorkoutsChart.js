import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

function WorkoutChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await axios.get('/workouts');
      const formatted = res.data.map(w => ({
        date: new Date(w.date).toLocaleDateString(),
        calories: w.caloriesBurned
      }));
      setData(formatted);
    };
    fetchWorkouts();
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Calories Burned Over Time</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="calories" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WorkoutChart;