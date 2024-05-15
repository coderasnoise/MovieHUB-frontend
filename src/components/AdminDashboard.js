import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/AdminDashboard.css'

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Yönetici Paneli</h1>
            <nav>
                <ul>
                    <li><Link to="/admin/manage-users">Kullanıcıları Yönet</Link></li>
                    <li><Link to="/admin/manage-contents">İçerikleri Yönet</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
