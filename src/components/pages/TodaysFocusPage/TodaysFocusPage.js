import { getStudyDetailInfo } from "../../../api/api";
import { useEffect, useState, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Timer from "./components/Timer";
import TodayButton from "../../UI/TodayButton";
import "./todaysFocusPage.css";

export const studyIdContext = createContext();

const TodaysFocusPage = () => {
  const [point, setPoint] = useState("");
  const [studyName, setStudyName] = useState("");
  const [alertGetPoint, setAlertGetPoint] = useState("");

  const { studyId } = useParams();

  const navigate = useNavigate();

  const handleGotoHabit = () => {
    const path = `/study/${studyId}/todayHabit`;
    navigate(path, { state: 'focus' });
  };

  const handleGotoHome = () => {
    const path = `/`;
    navigate(path);
  };

  useEffect(() => {
    const getInfo = async (studyId) => {
      const pointField = await getStudyDetailInfo(studyId);
      setStudyName(pointField.studyName);
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
                  {studyName}
                <div className="flex-row content__container__top__title_btn">
                <TodayButton onClick={handleGotoHabit}>오늘의 습관</TodayButton>
                <TodayButton onClick={handleGotoHome}>
                  홈
                </TodayButton>
              </div>
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
      </studyIdContext.Provider >
    </>
  );
}

export default TodaysFocusPage;
