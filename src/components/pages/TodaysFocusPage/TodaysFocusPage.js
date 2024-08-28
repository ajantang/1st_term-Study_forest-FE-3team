import "./todaysFocusPage.css";
import Timer from "./components/Timer";
import { getStudyDetailInfo } from "../../../api/api";
import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";

export const studyIdContext = createContext();

const TodaysFocusPage = () => {
  const [point, setPoint] = useState("");
  const [alertGetPoint, setAlertGetPoint] = useState("");

  const { studyId } = useParams();

  useEffect(() => {
    const getInfo = async (studyId) => {
      const pointField = await getStudyDetailInfo(studyId);
      setPoint(pointField.point);
    };

    getInfo(studyId);
  }, [point, studyId]);

  return (
    <>
      <studyIdContext.Provider value={studyId}>
        <div className="content">
          <div className="content__container">
            <div className="content__container__top">
              <div className="content__container__top__title extra-bold font32">
                연우의 개발공장
              </div>
              <div className="content__container__top__middle">
                <span className="font18 regular">현재까지 획득한 포인트</span>
                <div className="content__container__top__middle__points font16 medium">
                  <div className="content__container__top__middle__points__icon"></div>
                  {point}P 획득
                </div>
              </div>
            </div>
            <div className="content__container__main">
              <div className="content__container__main__top">
                <span className="font24 extra-bold">오늘의 집중</span>
                <Timer
                  initialPoint={point}
                  setPoint={setPoint}
                  setAlertGetPoint={setAlertGetPoint}
                ></Timer>
              </div>
            </div>
          </div>
          <div className="content__alert">{alertGetPoint}</div>
        </div>
      </studyIdContext.Provider>
    </>
  );
};

export default TodaysFocusPage;
