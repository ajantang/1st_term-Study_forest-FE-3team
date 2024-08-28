<<<<<<< HEAD
import axios from "axios";
import { useState, useEffect, createContext } from "react";

import Emoji from "./Emoji";
import StudyPoint from "./StudyPoint";
=======
import { useState, useEffect, createContext } from "react";

import Emojis from "../../../UI/Emojis";
import StudyPoint from "../../../UI/StudyPoint";
>>>>>>> develop
import HabitRecord from "./HabitRecord";
import Modal from "./Modal";

import TodayButton from "../../../UI/TodayButton";

<<<<<<< HEAD
import "./studybody.css";

import {
  API_ADDRESS,
=======
import "./StudyBody.css";

import {
>>>>>>> develop
  MODAL_CONFIRM,
  MODAL_EDIT_STUDY,
  MODAL_GOTO_HABIT,
  MODAL_GOTO_CONCENTRATION,
} from "../../../../constants/global";
<<<<<<< HEAD

const instance = axios.create({
  baseURL: API_ADDRESS,
  header: {
    "Content-Type": "application/json",
  },
});

const PATH = "/study";
=======
import { getStudyDetailInfo } from "../../../../api/api";
>>>>>>> develop

export const studyIdContext = createContext();

export function StudyBody({
  studyId = "8523e4cc-0985-4c20-b8b2-2d86e4fe56d5",
}) {
  const [studyName, setStudyName] = useState("스터디 이름");
  const [description, setDescription] = useState("스터이 설명");
  const [studyPoint, setStudyPoint] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(-1);

<<<<<<< HEAD
  const path = `${PATH}/${studyId}`;

=======
>>>>>>> develop
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleShareStudy = () => {
    navigator.clipboard.writeText(document.location.href);
    alert("주소를 복사했습니다");
  };

  const handleDeleteStudy = () => {
    setModalType(MODAL_CONFIRM);
    openModal();
  };

  const handleEditStudy = () => {
    setModalType(MODAL_EDIT_STUDY);
    openModal();
  };

  const handleGotoHabit = () => {
    setModalType(MODAL_GOTO_HABIT);
    openModal();
  };

  const handleGotoConcentration = () => {
    setModalType(MODAL_GOTO_CONCENTRATION);
    openModal();
  };

  useEffect(() => {
<<<<<<< HEAD
    instance.get(path).then((res) => {
      setStudyName(res.data.studyName);
      setDescription(res.data.description);
      setStudyPoint(res.data.point);
    });
=======
    getStudyDetailInfo(studyId)
      .then((data) => {
        setStudyName(data.studyName);
        setDescription(data.description);
        setStudyPoint(data.point);
      })
      .catch((err) => {
        /* 에러 처리 : 기획 필요필요 */
      });
>>>>>>> develop
  });

  return (
    <main className="study__main">
      <studyIdContext.Provider value={studyId}>
        <section className="study__section">
          <div className="study__content">
            <div className="flex-row study__topbar">
<<<<<<< HEAD
              <Emoji />
=======
              <Emojis />
>>>>>>> develop
              <div className="flex-row study__topbar-gp-btn">
                <p
                  className="font16 medium study__topbar-btn"
                  onClick={handleShareStudy}
                >
                  공유하기
                </p>
                <p>|</p>
                <p
                  className="font16 medium study__topbar-btn"
                  onClick={handleEditStudy}
                >
                  수정하기
                </p>
                <p>|</p>
                <p
                  className="font16 medium study__topbar-btn-delete"
                  onClick={handleDeleteStudy}
                >
                  스터디 삭제하기
                </p>
              </div>
            </div>
            <div className="flex-row study__middlebar">
              <p className="font32 extra-bold study__middlebar-studyname">
                {studyName}
              </p>
              <div className="flex-row study__middlebar-gp-btn">
<<<<<<< HEAD
                {/* <button
                  className="font16 medium study__middlebar-btn"
                  onClick={handleGotoHabit}
                >
                  오늘의 습관
                </button> */}
                <TodayButton onClick={handleGotoHabit}>오늘의 습관</TodayButton>
                {/* <button
                  className="font16 medium study__middlebar-btn"
                  onClick={handleGotoConcentration}
                >
                  오늘의 집중
                </button> */}
=======
                <TodayButton onClick={handleGotoHabit}>오늘의 습관</TodayButton>
>>>>>>> develop
                <TodayButton onClick={handleGotoConcentration}>
                  오늘의 집중
                </TodayButton>
              </div>
            </div>
            <div className="study__description">
              <div className="font18 regular study__description-label">
                소개
              </div>
              <div className="font18 medium study__description-text">
                {description}
              </div>
            </div>
            <StudyPoint point={studyPoint} />
          </div>
          <HabitRecord studyId={studyId} />
        </section>
        <Modal
          studyName={studyName}
          isOpen={isModalOpen}
          onClose={closeModal}
          modalType={modalType}
        />
      </studyIdContext.Provider>
    </main>
  );
}

export default StudyBody;
