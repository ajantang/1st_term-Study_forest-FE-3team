import './studyCard.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import pointIcon from '../../../assets/images/ic_point.png';

const StudyCard = ({ id }) => {
  const [studyData, setStudyData] = useState([]);

  useEffect(() => {
    axios.get(`https://onest-term-study-forest-be-3team-rovo.onrender.com/study/${id}`).then((response) => {
      setStudyData(response.data);
    });
  }, [id]);

  const { studyName, description, nickname, point, background } = studyData;

  const handleCardClick = () => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const updatedRecentlyViewed = [id, ...recentlyViewed.filter((studyId) => studyId !== id)].slice(0, 3);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
  };

  return (
    <Link to={`/study/${id}`} className="study-card" style={{ backgroundImage: `url(${background})` }} onClick={handleCardClick}>
      <div className="study-card__title__container">
        <h2 className="study-card__title">
          {nickname}
          <span className="study-card_title_name">의 {studyName}</span>
        </h2>
        <div className="study-card__point-container">
          <img src={pointIcon} alt="pointIcon" className="study-card__ic_point" />
          <span className="study-card__point">{point}P 획득</span>
        </div>
      </div>
      <p className="study-card__description">{description}</p>
    </Link>
  );
};

export default StudyCard;
