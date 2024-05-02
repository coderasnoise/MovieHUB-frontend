// src/components/ContentGrid.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentCard from './ContentCard';
import '../assets/ContentGrid.css';  // CSS dosyası için

const ContentGrid = () => {
    const [contents, setContents] = useState([]);

   /* useEffect(() => {
        const fetchContents = async () => {
            const response = await axios.get('http://localhost:5000/contents');  // Backend URL'niz
            setContents(response.data);
        };

        fetchContents();
    }, []);
*/
    return (
        <div className="content-grid">
            {contents.map(content => (
                <ContentCard key={content.id} content={content} />
            ))}
        </div>
    );
};

export default ContentGrid;
