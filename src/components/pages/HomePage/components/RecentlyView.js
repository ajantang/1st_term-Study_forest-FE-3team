import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './recentlyView.css';
import StudyCard from './StudyCard.js';
import { API_ADDRESS } from '../../../../constants/global.js';

const RecentlyView = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [studyData, setStudyData] = useState([]);

  useEffect(() => {
    const studyRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewed(studyRecentlyViewed);
  }, []);

  useEffect(() => {
    const fetchStudyData = async () => {
      const studyDetails = await Promise.all(
        recentlyViewed.map(async (id) => {
          const response = await axios.get(`${API_ADDRESS}/study/${id}`);
          return response.data;
        })
      );
      setStudyData(studyDetails);
    };
    fetchStudyData();
  }, [recentlyViewed]);

  return (
    <div className="recently-view__container">
      <p>최근 조회한 스터디</p>
      <div className="recently-view__list">
        {studyData.length > 0 ? (
          studyData
            .slice(0, 3)
            .map((study, index) => (
              <StudyCard
                key={index}
                id={study.id}
                studyName={study.studyName}
                description={study.description}
                nickname={study.nickname}
                point={study.point}
                background={study.background}
                createdAt={study.createdAt}
              />
            ))
        ) : (
          <p className="recently-view__no-list">아직 조회한 스터디가 없어요</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyView;
