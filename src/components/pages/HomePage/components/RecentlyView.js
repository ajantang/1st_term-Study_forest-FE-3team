import React, { useEffect, useState } from 'react';
import './recentlyView.css';
import StudyCard from './StudyCard.js';

const RecentlyView = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const studyRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewed(studyRecentlyViewed);
  }, []);

  return (
    <div className="recently-view__container">
      <p>최근 조회한 스터디</p>
      <div className="recently-view__list">
        {recentlyViewed.length > 0 ? (
          recentlyViewed.slice(0, 3).map((id, index) => <StudyCard key={index} id={id} />)
        ) : (
          <p className="recently-view__no-list">아직 조회한 스터디가 없어요</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyView;
