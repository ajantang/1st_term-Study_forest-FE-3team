import { useEffect, useState } from "react";
import TodayButton from "../../../UI/TodayButton";
import { getPoint } from "../../../../api/api";
// import {
//   API_ADDRESS,
//   MODAL_CONFIRM,
//   MODAL_EDIT_STUDY,
//   MODAL_GOTO_HABIT,
//   MODAL_GOTO_CONCENTRATION,
// } from "../../../../constants/global";
// import Modal from "../../StudyPage/components/Modal";
import "./StudyTitle.css";

function StudyTitle({ studyId }) {
  const [studyName, setStudyName] = useState("스터디 이름");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalType, setModalType] = useState(-1);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  const handleGotoHabit = () => {
    // setModalType(MODAL_GOTO_HABIT);
    // openModal();
  };

  const handleGotoConcentration = () => {
    // setModalType(MODAL_GOTO_CONCENTRATION);
    // openModal();
  };

  useEffect(() => {
    getPoint(studyId).then((res) => {
      setStudyName(`${res.nickname}의 ${res.studyName}`);
    });
  });

  return (
    <div>
      <div className="StudyTitle__body flex-row border-box">
        <p className="StudyTitle__studyName-color font32 extra-bold border-box">{studyName}</p>
        <div className="StudyTitle__TodayButton flex-row font16 medium border-box">
          <TodayButton onClick={handleGotoHabit}>오늘의 집중</TodayButton>
          <TodayButton onClick={handleGotoConcentration}>홈</TodayButton>
        </div>
      </div>
      {/* <Modal
          studyName={studyName}
          isOpen={isModalOpen}
          onClose={closeModal}
          modalType={modalType}
        /> */}
    </div>
  );
}

export default StudyTitle;