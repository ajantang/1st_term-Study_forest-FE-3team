import './studyCard.css';
import { Link } from 'react-router-dom';
import React from 'react';
import pointIcon from '../../../../assets/images/ic_point.png';

const StudyCard = ({ id, studyName, description, nickname, point, background, createdAt }) => {
  const handleCardClick = () => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const updatedRecentlyViewed = [id, ...recentlyViewed.filter((studyId) => studyId !== id)].slice(0, 5);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
  };

  const calculateDays = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const timeDifference = today - createdDate;
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    return dayDifference;
  };

  const days = calculateDays(createdAt);

  const getNicknameColor = (background) => {
    switch (background) {
      case 'https://ifh.cc/g/zaNc6p.jpg':
        return '#578246';
      case 'https://ifh.cc/g/QkXtRJ.jpg':
        return '#C18E1B';
      case 'https://ifh.cc/g/Lc8rN9.jpg':
        return '#418099';
      case 'https://ifh.cc/g/3YoYNa.jpg':
        return '#BC3C6A';
      default:
        return '#ffffff';
    }
  };

  const colorBackgrounds = [
    'https://ifh.cc/g/zaNc6p.jpg',
    'https://ifh.cc/g/QkXtRJ.jpg',
    'https://ifh.cc/g/Lc8rN9.jpg',
    'https://ifh.cc/g/3YoYNa.jpg',
  ];

  const getProgressDateColor = (background) => {
    if (colorBackgrounds.includes(background)) {
      return '#818181';
    } else {
      return '#eeeeee';
    }
  };

  const getAnotherColor = (background) => {
    if (colorBackgrounds.includes(background)) {
      return '#414141';
    } else {
      return '#ffffff';
    }
  };

  const getPointBackgroundColor = (background) => {
    if (colorBackgrounds.includes(background)) {
      return '#ffffff4D';
    } else {
      return '#00000080';
    }
  };

  const nicknameColor = getNicknameColor(background);
  const pointBackgroundColor = getPointBackgroundColor(background);
  const progressDate = getProgressDateColor(background);
  const anotherColor = getAnotherColor(background);

  return (
    <Link to={`/study/${id}`} className="study-card" style={{ backgroundImage: `url(${background})` }} onClick={handleCardClick}>
      <div className="study-card__title__container">
        <h2 className="study-card__title">
          <span style={{ color: nicknameColor }}>{nickname}</span>
          <span className="study-card__title__study-name" style={{ color: anotherColor }}>
            의 {studyName}
          </span>
        </h2>
        <div className="study-card__point-container" style={{ backgroundColor: pointBackgroundColor }}>
          <img src={pointIcon} alt="pointIcon" className="study-card__ic_point" />
          <span className="study-card__point" style={{ color: anotherColor }}>
            {point}P 획득
          </span>
        </div>
      </div>
      <div className="study-card__date" style={{ color: progressDate }}>
        {days}일째 진행중
      </div>
      <p className="study-card__description" style={{ color: anotherColor }}>
        {description}
      </p>
      <div className="study-card__emoji-container"></div>
    </Link>
  );
};

export default StudyCard;
