// src/components/ContentCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/ContentCard.css';  // Stil dosyası

const ContentCard = ({ content }) => {
    return (
        <div className="content-card">
            <Link to={`/contents/${content.content_id}`}>
                <img src={content.thumbnail} alt={content.title} className="content-image" />
                <div className="content-title">{content.title}</div>
            </Link>
        </div>
    );
};

export default ContentCard;
