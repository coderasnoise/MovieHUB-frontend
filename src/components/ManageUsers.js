import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../assets/Manage.css';

const ManageUsers = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: '' });

    useEffect(() => {
        fetchUsers();
    }, [token]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user.user_id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/admin/users', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers([...users, response.data]);
            setFormData({ username: '', email: '', password: '', role: '' });
            setShowForm(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="manage-container">
            <h2>Manage Users</h2>
            <button className="manage-button-form" onClick={() => setShowForm(!showForm)}>Add User</button>
            {showForm && (
                <form className="manage-form" onSubmit={handleSubmit}>
                    <input className="manage-input" type="text" name="username" placeholder="Username"
                           value={formData.username} onChange={handleFormChange}/>
                    <input className="manage-input" type="email" name="email" placeholder="Email" value={formData.email}
                           onChange={handleFormChange}/>
                    <input className="manage-input" type="password" name="password" placeholder="Password"
                           value={formData.password} onChange={handleFormChange}/>
                    <select className="manage-input" name="role" value={formData.role} onChange={handleFormChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button className="manage-button-form" type="submit">Submit</button>
                </form>
            )}
            <ul className="manage-list">
                {users.map(user => (
                    <li key={user.user_id}>
                        {user.username}     -     {user.email}     -     {user.role}
                        <button className="manage-button" onClick={() => deleteUser(user.user_id) }>Delete</button>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default ManageUsers;
