import { useState, useEffect } from 'react';
import api from '../api';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);
    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask.id}`, { title, description });
                setTasks(tasks.map(task => task.id === editingTask.id ? { ...task, title, description } : task));
                setEditingTask(null);
            } else {
                const response = await api.post('/tasks', { title, description });
                setTasks([...tasks, response.data]);
            }
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const editTask = (task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description) || "";
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${Id}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const toggleComplete = async (task) => {
        try {
            const response = await api.put(`/tasks/${task.id}`, { completed: !task.completed });
            setTasks(tasks.map(t => t.id === task.id ? response.data : t));
        } catch (error) {
            console.error('Error toggling task completion:', error);
        }
    };
    return (
        <div>
            <h2>Task Manager</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">{editingTask ? 'Update' : 'Create'} Task</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.title}
                        </span>
                        <p>{task.description}</p>
                        <button onClick={() => editTask(task)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        <button onClick={() => toggleComplete(task)}>
                            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Task;