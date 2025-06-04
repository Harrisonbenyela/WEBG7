import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="container">
      <h2>Fitness Tracker Dashboard</h2>
      <nav>
        <Link to="/workouts">View Workouts</Link> |{' '}
        <Link to="/goals">Manage Goals</Link> |{' '}
        <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
      </nav>
    </div>
  );
}

export default Dashboard;