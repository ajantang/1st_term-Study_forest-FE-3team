import React, { useEffect, useState } from "react";
import "./recentlyView.css";
import StudyCard from "./StudyCard.js";
import { getStudyDetailInfo } from "../../../../api/api.js";

const RecentlyView = ({ setLoding }) => {
  // const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [studyData, setStudyData] = useState([]);

  // 이거...코드 리뷰 좀 해야할듯 임시로 수정함
  useEffect(() => {
    const recentlyViewedStudy =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    // setRecentlyViewed(recentlyViewedStudy);

    const handleStudyData = async () => {
      setLoding(true);
      const studyData = [];
      for (let i = 0; i < recentlyViewedStudy.length; i++) {
        const id = recentlyViewedStudy[i];

        try {
          const response = await getStudyDetailInfo(id);
          studyData.push(response); // 유효한 데이터를 배열에 추가합니다.
        } catch (error) {
          recentlyViewedStudy.splice(i, 1); // 삭제된 id를 배열에서 제거합니다.
          localStorage.setItem(
            "recentlyViewed",
            JSON.stringify(recentlyViewedStudy)
          ); // 로컬 스토리지 업데이트
          i--; // 배열에서 요소를 제거했으므로 인덱스를 조정합니다.
        }
      }
      setStudyData(studyData);
    };
    handleStudyData().then((res) => {
      setLoding(false);
    });
  }, []);

  return (
    <div className="recently-view__container">
      <p className="recently-view__container__text">최근 조회한 스터디</p>

      {studyData.length > 0 ? (
        <div className="recently-view__list">
          {studyData.map((study, index) => (
            <StudyCard
              key={index}
              id={study.id}
              studyName={study.studyName}
              description={study.description}
              nickname={study.nickname}
              point={study.point}
              background={study.background}
              createdAt={study.createdAt}
              isRecentlyViewed={true}
            />
          ))}
        </div>
      ) : (
        <div className="recently-view__text-box">
          <p className="recently-view__no-list">아직 조회한 스터디가 없어요</p>
        </div>
      )}
    </div>
  );
};

export default RecentlyView;
