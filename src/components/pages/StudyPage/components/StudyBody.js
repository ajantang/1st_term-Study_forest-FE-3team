import { useState, useEffect, createContext } from "react";

import Emojis from "../../../UI/Emojis";
import StudyPoint from "../../../UI/StudyPoint";
import HabitRecord from "./HabitRecord";
import Modal from "./Modal";
import TodayButton from "../../../UI/TodayButton";
import "./StudyBody.css";
import {
  MODAL_CONFIRM,
  MODAL_EDIT_STUDY,
  MODAL_GOTO_HABIT,
  MODAL_GOTO_CONCENTRATION,
} from "../../../../constants/global";
import { getStudyDetailInfo } from "../../../../api/api";

import { ReactComponent as ICFacebook } from "../../../../assets/images/ic_facebook.svg";
import { ReactComponent as ICX } from "../../../../assets/images/ic_twitter.svg";
import { ReactComponent as ICYoutube } from "../../../../assets/images/ic_youtube.svg";
import { ReactComponent as ICInstagram } from "../../../../assets/images/ic_instagram.svg";
import { useParams } from "react-router-dom";

export const studyIdContext = createContext();

function ShareIcon({ shareIndex, onCloseShareBox }) {
  const SHARE_ICONS = [
    { component: <ICFacebook />, url: "https://www.facebook.com" },
    { component: <ICX />, url: "https://x.com" },
    { component: <ICYoutube />, url: "https://www.youtube.com" },
    { component: <ICInstagram />, url: "https://www.instagram.com" },
  ];

  const handleClickShareIcon = () => {
    navigator.clipboard.writeText(document.location.href);
    onCloseShareBox();
    window.open(SHARE_ICONS[shareIndex].url, "_blank", "noreferrer");
  };

  return (
    <div className="flex-row share-box__icon" onClick={handleClickShareIcon}>
      {SHARE_ICONS[shareIndex].component}
    </div>
  );
}

function ShareBox({ onCloseShareBox }) {
  const shareList = [0, 1, 2, 3];
  const icons = shareList.map((item) => {
    return <ShareIcon shareIndex={item} onCloseShareBox={onCloseShareBox} />;
  });

  return <div className="flex-row share-box">{icons}</div>;
}

export function StudyBody({ setLoding }) {
  const [nickname, setNickname] = useState("닉네임");
  const [studyName, setStudyName] = useState("스터디 이름");
  const [description, setDescription] = useState("스터디 설명");
  const [studyPoint, setStudyPoint] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(-1);
  const [showShareBox, setShowShareBox] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { studyId } = useParams();
  const handleShareStudy = () => {
    setShowShareBox(!showShareBox);
  };

  const handleDeleteStudy = () => {
    setModalType(MODAL_CONFIRM);
    openModal();
  };

  const handleEditStudy = () => {
    setModalType(MODAL_EDIT_STUDY);
    openModal();
  };

  const nicknameAndStudyName = () => {
    const nicknameInfo = `${nickname}의 `;
    const studyNmaeInfo = `${studyName}`;
    const studyInfo = (
      <>
        <span className="study__middlebar-studyInfo_nickname">
          {nicknameInfo}
        </span>
        {studyNmaeInfo}
      </>
    );
    return studyInfo;
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
    getStudyDetailInfo(studyId)
      .then((data) => {
        setStudyName(data.studyName);
        setDescription(data.description);
        setStudyPoint(data.point);
        setNickname(data.nickname);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <main className="study__main">
      <studyIdContext.Provider value={studyId}>
        <section className="study__section">
          <div className="study__content">
            <div className="flex-row study__topbar">
              <div className="study__topbar-emoji-frame">
                <Emojis studyId={studyId} />
              </div>
              <div className="study__topbar-gp-btn-frame">
                <div className="flex-row study__topbar-gp-btn">
                  <div className="share-box__anchor">
                    <p
                      className="font16 medium study__topbar-btn "
                      onClick={handleShareStudy}
                    >
                      공유하기
                    </p>
                    {showShareBox ? (
                      <ShareBox onCloseShareBox={handleShareStudy} />
                    ) : undefined}
                  </div>
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
            </div>
            <div className="flex-row study__middlebar">
              <p className="extra-bold study__middlebar-studyInfo">
                {nicknameAndStudyName()}
              </p>
              <div className="flex-row study__middlebar-gp-btn">
                <TodayButton onClick={handleGotoHabit}>오늘의 습관</TodayButton>
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
          <HabitRecord studyId={studyId} setLoding={setLoding} />
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
