import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ManageContents = () => {
    const { token } = useAuth();
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', release_date: '', duration: '', type: '', thumbnail: null, video: null });

    useEffect(() => {
        const fetchContents = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/admin/contents', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setContents(response.data);
            } catch (error) {
                console.error('Error fetching contents:', error);
            }
            setLoading(false);
        };

        if (token) {
            fetchContents();
        }
    }, [token]); // fetchContents'i bağımlılıklar dizisine eklemenize gerek yok

    const deleteContent = async (contentId) => {
        try {
            await axios.delete(`http://localhost:5000/admin/contents/${contentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContents(contents.filter(content => content.content_id !== contentId));
        } catch (error) {
            console.error('Error deleting content:', error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:5000/admin/contents', formDataObj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setContents([...contents, response.data]);
            setFormData({ title: '', description: '', release_date: '', duration: '', type: '', thumbnail: null, video: null });
            setShowForm(false);
        } catch (error) {
            console.error('Error adding content:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="manage-container">
            <h2>Manage Contents</h2>
            <button className="manage-button-form" onClick={() => setShowForm(!showForm)}>Add Content</button>
            {showForm && (
                <form className="manage-form" onSubmit={handleSubmit}>
                    <input className="manage-input" type="text" name="title" placeholder="Title" value={formData.title}
                           onChange={handleFormChange}/>
                    <input className="manage-input" type="text" name="description" placeholder="Description"
                           value={formData.description} onChange={handleFormChange}/>
                    <input className="manage-input" type="text" name="release_date" placeholder="Release Date (Year)"
                           value={formData.release_date} onChange={handleFormChange}/>
                    <input className="manage-input" type="text" name="duration" placeholder="Duration (minutes)"
                           value={formData.duration} onChange={handleFormChange}/>
                    <input className="manage-input" type="text" name="type" placeholder="Type"
                           value={formData.type} onChange={handleFormChange}/>
                    <input className="manage-input" type="file" name="thumbnail" onChange={handleFileChange} />
                    <input className="manage-input" type="file" name="video" onChange={handleFileChange} />
                    <button className="manage-button-form" type="submit">Submit</button>
                </form>
            )}
            <ul className="manage-list">
                {contents.map(content => (
                    <li key={content.content_id}>
                        {content.title} - {content.type}
                        <button className="manage-button" onClick={() => deleteContent(content.content_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageContents;
