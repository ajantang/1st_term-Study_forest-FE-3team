import { useContext, useEffect, useState } from "react";
import TodayButton from "../../../UI/TodayButton";
import { getStudyDetailInfo } from "../../../../api/api";
import "./StudyTitle.css";
import { useNavigate } from "react-router-dom";
import { studyIdContext } from "../TodayHabitPage.js";

function StudyTitle({ buttonName }) {
  const [studyName, setStudyName] = useState("스터디 이름");
  const navigate = useNavigate();
  let studyId = useContext(studyIdContext);

  useEffect(() => {
    getStudyDetailInfo(studyId).then((res) => {
      setStudyName(`${res.nickname}의 ${res.studyName}`);
    });
  });

  function navigateHandler() {
    if (buttonName === "오늘의 집중") {
      const path = `/study/${studyId}/todaysFocus`;
      navigate(path, { state: "focus" });
    } else if (buttonName === "오늘의 습관") {
      const path = `/study/${studyId}/todayHabit`;
      navigate(path, { state: "habit" });
    }
  }

  function homeNavigateHandler() {
    navigate("/");
  }

  function studyNavigateHandler() {
    const path = `/study/${studyId}`
    navigate(path)
  }

  return (
    <div>
      <div className="StudyTitle__body flex-row border-box">
        <p className="StudyTitle__studyName font32 extra-bold border-box" onClick={studyNavigateHandler}>
          {studyName}
        </p>
        <div className="StudyTitle__TodayButton flex-row font16 medium border-box">
          <TodayButton onClick={navigateHandler}>{buttonName}</TodayButton>
          <TodayButton onClick={homeNavigateHandler}>홈</TodayButton>
        </div>
      </div>
    </div>
  );
}

export default StudyTitle;
