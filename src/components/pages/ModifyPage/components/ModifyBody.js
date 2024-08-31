import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidateInput from "../../../hooks/useValidateInput";
import { getStudyDetailInfo, setStudyInfo } from "../../../../api/api";

import BackgroundSelector from "../../../UI/BackgroundSelector";
import "./ModifyBody.css";

const VALID_DATA = 999;
const MIN_NICKNAME_LENGTH = 2;
const WARN_MIN_NICKNAME_LENGTH = 402;
const MAX_NICKNAME_LENGTH = 12;
const WARN_MAX_NICKNAME_LENGTH = 412;

const MIN_STUDY_NAME_LENGTH = 2;
const WARN_MIN_STUDY_NAME_LENGTH = 402;
const MAX_STUDY_NAME_LENGTH = 20;
const WARN_MAX_STUDY_NAME_LENGTH = 420;

const MAX_DESCRIPTION_LENGTH = 100;
const WARN_MAX_DESCRIPTION_LENGTH = 200;

export function ModifyBody({ studyId }) {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [backgroundUrl, setBackgroundUrl] = useState(
    "https://ifh.cc/g/zaNc6p.jpg"
  );
  // const [passwordInputType, setPasswordInputType] = useState("password");
  // const [toggleVisiblePasswordClass, setToggleVisiblePasswordClass] = useState(
  //   "modify-study__password-input-visible-off"
  // );
  // const [passwordConfirmInputType, setPasswordConfirmInputType] =
  //   useState("password");
  // const [
  //   toggleVisiblePasswordConfirmClass,
  //   setVisibleTogglePasswordConfirmClass,
  // ] = useState("modify-study__password-input-visible-off");

  const navigate = useNavigate();
  const backgroundSelectorRefs = useRef([]);

  function validateNickname(value) {
    const length = value.length;

    if (length < MIN_NICKNAME_LENGTH) {
      return WARN_MIN_NICKNAME_LENGTH;
    } else if (MAX_NICKNAME_LENGTH < length) {
      return WARN_MAX_NICKNAME_LENGTH;
    } else {
      return VALID_DATA;
    }
  }

  const nickname = useValidateInput(validateNickname);

  function invalidNicknameWarn() {
    switch (nickname.isValid) {
      case WARN_MIN_NICKNAME_LENGTH: {
        return (
          <p className="regular modify-study__inputset-warning">
            2자 이상 입력해주세요
          </p>
        );
      }
      case WARN_MAX_NICKNAME_LENGTH: {
        return (
          <p className="regular modify-study__inputset-warning">
            12자 이내로 입력해주세요
          </p>
        );
      }
      case VALID_DATA:
      default: {
        return undefined;
      }
    }
  }

  function validateStudyName(value) {
    const length = value.length;

    if (length < MIN_STUDY_NAME_LENGTH) {
      return WARN_MIN_STUDY_NAME_LENGTH;
    } else if (MAX_STUDY_NAME_LENGTH < length) {
      return WARN_MAX_STUDY_NAME_LENGTH;
    } else {
      return VALID_DATA;
    }
  }

  const studyName = useValidateInput(validateStudyName);

  function invalidStudyNameWarn() {
    switch (studyName.isValid) {
      case WARN_MIN_STUDY_NAME_LENGTH: {
        return (
          <p className="regular modify-study__inputset-warning">
            2자 이상 입력해주세요
          </p>
        );
      }
      case WARN_MAX_STUDY_NAME_LENGTH: {
        return (
          <p className="regular modify-study__inputset-warning">
            20자 이내로 입력해주세요
          </p>
        );
      }
      case VALID_DATA:
      default: {
        return undefined;
      }
    }
  }

  function validateDescription(value) {
    const length = value.length;

    if (MAX_DESCRIPTION_LENGTH < length) {
      return WARN_MAX_DESCRIPTION_LENGTH;
    } else {
      return VALID_DATA;
    }
  }

  const description = useValidateInput(validateDescription);

  function invalidDescriptionWarn() {
    switch (description.isValid) {
      case WARN_MAX_DESCRIPTION_LENGTH: {
        return (
          <p className="regular modify-study__inputset-warning">
            100자 이내로 입력해주세요
          </p>
        );
      }
      case VALID_DATA:
      default: {
        return undefined;
      }
    }
  }

  const handleClickBackgroundSelector = (index, imageUrl) => {
    if (backgroundIndex === index) return;

    if (backgroundSelectorRefs.current[backgroundIndex]) {
      backgroundSelectorRefs.current[backgroundIndex].setSelect(false);
    }

    setBackgroundIndex(index);
    setBackgroundUrl(imageUrl);
  };

  const backgroundSelectorList = [0, 1, 2, 3, 4, 5, 6, 7];

  const backgroundSelectors = backgroundSelectorList.map((item) => {
    return (
      <BackgroundSelector
        key={item}
        ref={(ref) => {
          if (ref) backgroundSelectorRefs.current[item] = ref;
          else delete backgroundSelectorRefs.current[item];
        }}
        classListIndex={item}
        onClick={handleClickBackgroundSelector}
      />
    );
  });

  // const toggleVisiblePassword = () => {
  //   if (passwordInputType === "text") {
  //     setPasswordInputType("password");
  //     setToggleVisiblePasswordClass("modify-study__password-input-visible-off");
  //   } else {
  //     setPasswordInputType("text");
  //     setToggleVisiblePasswordClass("modify-study__password-input-visible-on");
  //   }
  // };

  // const toggleVisiblePasswordConfirm = () => {
  //   if (passwordInputType === "text") {
  //     setPasswordConfirmInputType("password");
  //     setVisibleTogglePasswordConfirmClass(
  //       "modify-study__password-input-visible-off"
  //     );
  //   } else {
  //     setPasswordConfirmInputType("text");
  //     setVisibleTogglePasswordConfirmClass(
  //       "modify-study__password-input-visible-on"
  //     );
  //   }
  // };

  const btnModify = () => {
    if (
      [nickname.isValid, studyName.isValid, description.isValid].every(
        (value) => value === 999
      )
    ) {
      return (
        <svg className="modify-study__btn-modify" onClick={handleModifyStudy} />
      );
    } else {
      return <svg className="modify-study__btn-modify-disable" />;
    }
  };

  const handleModifyStudy = () => {
    setStudyInfo(
      studyId,
      nickname.value,
      studyName.value,
      description.value,
      backgroundUrl,
      null
    )
      .then((data) => {
        const path = `/study/${studyId}`;
        navigate(path);
      })
      .catch((err) => {
        alert(err);
      })
      .finally();
  };

  useEffect(() => {
    getStudyDetailInfo(studyId)
      .then((data) => {
        nickname.setValue(data.nickname);
        studyName.setValue(data.studyName);
        description.setValue(data.description);
      })
      .catch((err) => {})
      .finally();

    backgroundSelectorList.forEach((index) => {
      if (backgroundSelectorRefs.current[index]) {
        backgroundSelectorRefs.current[index].setSelect(false);
      }
    });

    if (backgroundSelectorRefs.current[backgroundIndex]) {
      backgroundSelectorRefs.current[backgroundIndex].setSelect(true);
    }
    // eslint-disable-next-line
  }, [studyId]);

  return (
    <main className="modify-study__main">
      <section className="modify-study__section">
        <div className="modify-study__section_content">
          <div className="extra-bold modify-study__title">스터디 수정하기</div>
          <div className="flex-col modify-study__inputset margin-top-title-content">
            <div className="semi-bold modify-study__inputset-label">닉네임</div>
            <input
              className="modify-study__inputset-input"
              onChange={nickname.onChange}
              value={nickname.value}
            />
            {invalidNicknameWarn()}
          </div>
          <div className="flex-col modify-study__inputset">
            <div className="semi-bold modify-study__inputset-label">
              스터디 이름
            </div>
            <input
              className="modify-study__inputset-input"
              onChange={studyName.onChange}
              value={studyName.value}
            />
            {invalidStudyNameWarn()}
          </div>
          <div className="flex-col modify-study__inputset">
            <div className="semi-bold modify-study__inputset-label">소개</div>
            <textarea
              className="modify-study__inputset-textarea"
              onChange={description.onChange}
              value={description.value}
            />
            {invalidDescriptionWarn()}
          </div>
          <div className="flex-col modify-study__select-background">
            <div className="semi-bold modify-study__inputset-label">
              배경을 선택해주세요
            </div>
            <div className="flex-row modify-study__select-gp-background">
              {backgroundSelectors}
            </div>
          </div>
          {/* <div className="flex-col modify-study__inputset">
            <div className="semi-bold modify-study__inputset-label">
              비밀번호
            </div>
            <div className="modify-study__password-inputset">
              <input
                className="modify-study__password-input"
                type={passwordInputType}
              />
              <svg
                onClick={toggleVisiblePassword}
                className={toggleVisiblePasswordClass}
              />
            </div>
            <p className="modify-study__inputset-warning">
              임시 에러 텍스트 영역
            </p>
          </div>
          <div className="flex-col modify-study__inputset">
            <div className="semi-bold modify-study__inputset-label">
              비밀번호 확인
            </div>
            <div className="modify-study__password-inputset">
              <input
                className="modify-study__password-input"
                type={passwordConfirmInputType}
              />
              <svg
                onClick={toggleVisiblePasswordConfirm}
                className={toggleVisiblePasswordConfirmClass}
              />
            </div>
            <p className="modify-study__inputset-warning">
              임시 에러 텍스트 영역
            </p>
          </div> */}
          {btnModify()}
        </div>
      </section>
    </main>
  );
}

export default ModifyBody;
