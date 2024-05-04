// src/components/ContentGrid.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContentCard from './ContentCard';
import { useAuth } from '../context/AuthContext';
import '../assets/ContentGrid.css';

const ContentGrid = () => {
    const [contents, setContents] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/contents', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setContents(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching contents:', error);
            }
        };

        if (token) {
            fetchContents();
        }
    }, [token]);

    return (
        <div className="content-grid">
            {contents.map((content, index) => (
                <ContentCard key={`${content.title}-${index}`} content={content} />
            ))}
        </div>
    );
};

export default ContentGrid;
