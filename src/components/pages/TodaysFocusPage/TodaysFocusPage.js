import { getStudyDetailInfo } from "../../../api/api";
import { useEffect, useState, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Timer from "./components/Timer";
import TodayButton from "../../UI/TodayButton";
import "./todaysFocusPage.css";
import UpdateRecentlyViewed from "../../../utils/UpdateRecentlyViewed";
import LodingPage from "../../Layout/LodingPage";

export const studyIdContext = createContext();

const TodaysFocusPage = () => {
  const [point, setPoint] = useState("");
  const [nickname, setNickname] = useState("");
  const [studyName, setStudyName] = useState("");
  const [alertGetPoint, setAlertGetPoint] = useState("");
  const [loding, setLoding] = useState(false)

  const { studyId } = useParams();

  const navigate = useNavigate();

  const handleGotoStudy = () => {
    const path = `/study/${studyId}`;
    navigate(path);
  };

  const handleGotoHabit = () => {
    const path = `/study/${studyId}/todayHabit`;
    navigate(path, { state: "focus" });
  };

  const handleGotoHome = () => {
    const path = `/`;
    navigate(path);
  };

  useEffect(() => {
    const getInfo = async (studyId) => {
      setLoding(true)
      const pointField = await getStudyDetailInfo(studyId);
      setNickname(pointField.nickname);
      setStudyName(pointField.studyName);
      setPoint(pointField.point);
      setLoding(false)
    };

    getInfo(studyId);
  }, [point, studyId]);

  useEffect(() => {
    UpdateRecentlyViewed(studyId);
  }, [studyId]);

  return (
    <>
      <studyIdContext.Provider value={studyId}>
        <div className="content">
          <div className="content__container">
            <div className="content__container__top">
              <div className="content__container__top__title extra-bold font32">
                <span onClick={handleGotoStudy}>
                  {nickname}의 {studyName}
                </span>
                <div className="flex-row content__container__top__title_btn">
                  <TodayButton onClick={handleGotoHabit}>
                    오늘의 습관
                  </TodayButton>
                  <TodayButton onClick={handleGotoHome}>홈</TodayButton>
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
        {loding && <LodingPage />}
      </studyIdContext.Provider>
    </>
  );
};

export default TodaysFocusPage;
