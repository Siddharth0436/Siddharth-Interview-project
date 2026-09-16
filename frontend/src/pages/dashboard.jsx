import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Dashboard() {
   const [user, setUser] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
    getUser();
    }, []);

    const getUser = async () => {
        try {
            const response = await api.get('/user');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/login');
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
return (
    <div>
        <h2>Dashboard</h2>
        <p>Welcome, {user?.name}!</p>
        <button onClick={logout}>Logout</button>
    </div>
);
}
export default Dashboard;