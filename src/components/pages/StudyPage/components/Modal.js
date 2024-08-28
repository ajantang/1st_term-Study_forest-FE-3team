import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Modal.css";

import { studyIdContext } from "./StudyBody";
import { API_ADDRESS } from "../../../../constants/global";

const instance = axios.create({
  baseURL: API_ADDRESS,
  header: {
    "Content-Type": "application/json",
  },
});

export function Modal({ studyName, isOpen, onClose, modalType }) {
  const [inputValue, setInputValue] = useState("");
  const [isIncorrectPasswordWarnOpen, setIsIncorrectPasswordWarnOpen] =
    useState(false);
  const [isPasswordLengWarnOpen, setIsPasswordLengWWarnOpen] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [toggleVisibleClass, setToggleVisibleClass] = useState(
    "modal__password-input-visible-off"
  );
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  const afterModalPass = [
    afterDeleteStudyModalPass,
    afterEditStudyModalPass,
    afterGotoHabitModalPass,
    afterGotoConcentrationModalPass,
  ];

  let studyId = useContext(studyIdContext);

  const buttonClass = [
    "modal__btn-confirm",
    "modal__btn-edit",
    "modal__btn-habit",
    "modal__btn-concentration",
  ];

  /** 스터디 삭제 modal 창 통과 후 로직 : DELETE API 사용 & 홈페이지로 이동 */
  function afterDeleteStudyModalPass() {
    const path = "/study";

    instance
      .delete(path)
      .then((res) => {
        if (res.status === 204) {
          navigate("/");
        }
      })
      .catch((err) => alert(err.name));
  }

  function afterEditStudyModalPass() {
    alert("수정 페이지로 이동 로직 추가 예정");
  }

  function afterGotoHabitModalPass() {
    navigate(`/study/${studyId}/todayHabit`);
  }

  function afterGotoConcentrationModalPass() {
    const path = `/study/${studyId}/todaysFocus`;
    navigate(path);
  }

  const initModal = () => {
    setInputValue("");
    setInputType("password");
    setToggleVisibleClass("modal__password-input-visible-off");
  };

  const onModalClick = () => {
    if (inputValue.trim().length < 8 || 24 < inputValue.trim().length) {
      setIsPasswordLengWWarnOpen(true);
      return;
    }

    const path = `/study/${studyId}/auth`;
    instance.post(path, { password: inputValue }).then((res) => {
      if (res.data.result === true) {
        afterModalPass[modalType]();
      } else {
        setIsIncorrectPasswordWarnOpen(true);
      }
    });
  };

  const onInputChange = (e) => {
    setIsIncorrectPasswordWarnOpen(false);
    setIsPasswordLengWWarnOpen(false);
    setInputValue(e.target.value);
  };

  const wrongPasswordLengthWarn = () => {
    const warning = (
      <div className="flex-row modal__warning">
        <p className="font16 medium modal__warning-text">
          🚨 8 ~ 24 자리의 비밀번호를 입력해주세요.
        </p>
      </div>
    );

    return isPasswordLengWarnOpen ? warning : undefined;
  };

  const incorrectPasswordWarn = () => {
    const warning = (
      <div className="flex-row modal__warning">
        <p className="font16 medium modal__warning-text">
          🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.
        </p>
      </div>
    );

    return isIncorrectPasswordWarnOpen ? warning : undefined;
  };

  const toggleVisiblePassword = () => {
    if (inputType === "text") {
      setInputType("password");
      setToggleVisibleClass("modal__password-input-visible-off");
    } else {
      setInputType("text");
      setToggleVisibleClass("modal__password-input-visible-on");
    }
  };

  const handleModalClose = () => {
    setIsIncorrectPasswordWarnOpen(false);
    setIsPasswordLengWWarnOpen(false);
    initModal();
    onClose();
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog className="modal" ref={dialogRef} onClose={handleModalClose}>
      <div className="flex-col modal__content">
        <div className="font24 extra-bold modal__studyname">{studyName}</div>
        <div className="font18 medium modal__message">권한이 필요해요!</div>
        <div className="modal__password">
          <div className="font18 semi-bold modal__password-label">비밀번호</div>
          <div className="modal__password-inputset">
            <input
              className="font16 regular modal__password-input"
              onChange={onInputChange}
              placeholder="비밀번호를 입력해 주세요"
              value={inputValue}
              type={inputType}
            ></input>
            <svg
              onClick={toggleVisiblePassword}
              className={toggleVisibleClass}
            />
          </div>
        </div>
        <svg className={buttonClass[modalType]} onClick={onModalClick} />
        <p
          className="font16 medium modal__btn-close"
          onClick={handleModalClose}
        >
          나가기
        </p>
      </div>
      {incorrectPasswordWarn()}
      {wrongPasswordLengthWarn()}
    </dialog>
  );
}

export default Modal;
