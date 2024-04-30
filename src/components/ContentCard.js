
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/ContentCard.css';  // CSS dosyası için

const ContentCard = ({ content }) => {
    return (
        <div className="content-card">
            <Link to={`/content/${content.id}`}>
                <img src={content.thumbnail} alt={content.title} className="content-image" />
            </Link>
        </div>
    );
};

export default ContentCard;
