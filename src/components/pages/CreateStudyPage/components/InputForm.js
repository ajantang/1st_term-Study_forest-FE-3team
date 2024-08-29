import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidation from "../../../hooks/useValidation.js";
import "./inputForm.css";
import invisiblePassword from "../../../../assets/images/btn_visibility_off.png";
import visiblePassword from "../../../../assets/images/btn_visibility_on.png";
import { createStudy } from "../../../../api/api.js";

const BASE_BACKGROUND = "https://ifh.cc/g/zaNc6p.jpg";

const CreateStudy = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [toggleBtn, setToggleBtn] = useState(invisiblePassword);
  const [confirmToggleBtn, setConfirmToggleBtn] = useState(invisiblePassword);
  const [focusedBackground, setFocusedBackground] = useState(BASE_BACKGROUND);
  const {
    state: {
      nickname,
      studyName,
      description,
      password,
      confirmPassword,
      isFormValid,
    },
    setters: {
      setNickname,
      setStudyName,
      setDescription,
      setPassword,
      setConfirmPassword,
    },
    validators: {
      validateNickname,
      validateStudyName,
      validateDescription,
      validatePassword,
      validateConfirmPassword,
    },
  } = useValidation();

  useEffect(() => {
    const selectedBtn = document.createElement("div");
    const backgrounds = document.querySelectorAll(".background");
    const defaultBackground = document.querySelector(".background.green");

    selectedBtn.className = "selectedBtn";
    defaultBackground.appendChild(selectedBtn);
    selectedBtn.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    const handleBackgroundClick = (event) => {
      const currentSelectedBtn = document.querySelector(".selectedBtn");
      if (currentSelectedBtn) {
        currentSelectedBtn.remove();
      }
      event.target.appendChild(selectedBtn);

      const backgroundUrl = window
        .getComputedStyle(event.target)
        .backgroundImage.slice(5, -2);
      setFocusedBackground(backgroundUrl);
    };

    backgrounds.forEach((background) => {
      background.addEventListener("click", handleBackgroundClick);
    });
  }, []);

  const togglePasswordVisibility = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setToggleBtn(visiblePassword);
    } else {
      setPasswordType("password");
      setToggleBtn(invisiblePassword);
    }
  };

  const toggleConfirmPasswordVisibility = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
      setConfirmToggleBtn(visiblePassword);
    } else {
      setConfirmPasswordType("password");
      setConfirmToggleBtn(invisiblePassword);
    }
  };

  const handleSubmit = () => {
    createStudy(nickname, studyName, description, focusedBackground, password)
      .then((response) => {
        const { id } = response;
        navigate(`/study/${id}`);
      })
      .catch((error) => {
        alert("이미 사용 중인 닉네임입니다");
      });
  };

  const navigate = useNavigate();

  return (
    <form className="create-study">
      <div className="font18 semi-bold create-study__title">스터디 만들기</div>
      <div className="create-study__form">
        <label className="font18 semi-bold  create-study__label nickname">
          닉네임
        </label>
        <br />
        <input
          type="text"
          className={`create-study__input nickname ${
            validateNickname() === null
              ? ""
              : validateNickname()
              ? "invalid"
              : "valid"
          }`}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해 주세요"
        />
        <span className="create-study__input-error">{validateNickname()}</span>
      </div>
      <div className="create-study__form">
        <label className="font18 semi-bold create-study__label studyName">
          스터디 이름
        </label>
        <br />
        <input
          type="text"
          className={`create-study__input studyName ${
            validateStudyName() === null
              ? ""
              : validateStudyName()
              ? "invalid"
              : "valid"
          }`}
          value={studyName}
          onChange={(e) => setStudyName(e.target.value)}
          placeholder="스터디 이름을 입력해주세요"
        />
        <span className="create-study__input-error">{validateStudyName()}</span>
      </div>
      <div className="create-study__form">
        <label className="font18 semi-bold create-study__label description">
          소개
        </label>
        <br />
        <textarea
          className={`create-study__input description ${
            validateDescription() === null
              ? ""
              : validateDescription()
              ? "invalid"
              : "valid"
          }`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="소개 멘트를 작성해주세요"
        />
        <span className="create-study__input-error">
          {validateDescription()}
        </span>
      </div>
      <div className="create-study__form">
        <label className="font18 semi-bold create-study__label card-background">
          배경을 선택해주세요
        </label>
        <br />
        <div className="create-study__grid-container">
          <div className="background green"></div>
          <div className="background yellow"></div>
          <div className="background blue"></div>
          <div className="background pink"></div>
          <div className="background one"></div>
          <div className="background two"></div>
          <div className="background three"></div>
          <div className="background four"></div>
        </div>
      </div>
      <div>
        <div className="create-study__form">
          <label className="font18 semi-bold create-study__label password">
            비밀번호
          </label>
          <div className="create-study__password-container">
            <input
              type={passwordType}
              className={`create-study__input password ${
                validatePassword() === null
                  ? ""
                  : validatePassword()
                  ? "invalid"
                  : "valid"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
            <img
              src={toggleBtn}
              alt="togglePassword"
              className="create-study__password-toggle-btn"
              onClick={togglePasswordVisibility}
            />
          </div>
          <span className="create-study__input-error">
            {validatePassword()}
          </span>
        </div>
        <div className="create-study__form">
          <label className="font18 semi-bold create-study__label confirmPassword">
            비밀번호 확인
          </label>
          <div className="create-study__confirmPassword-container">
            <input
              type={confirmPasswordType}
              className={`create-study__input confirmPassword ${
                validateConfirmPassword() === null
                  ? ""
                  : validateConfirmPassword()
                  ? "invalid"
                  : "valid"
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
            <img
              src={confirmToggleBtn}
              alt="togglePassword"
              className="create-study__password-toggle-btn"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
          <span className="create-study__input-error">
            {validateConfirmPassword() || ""}
          </span>
        </div>
      </div>
      <div className="create-study__create-btn-frame">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="create-study__create-btn"
        >
          만들기
        </button>
      </div>
    </form>
  );
};

export default CreateStudy;
