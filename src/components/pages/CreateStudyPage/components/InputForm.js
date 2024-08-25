import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useValidation from '../../../hooks/useValidation.js';
import './inputForm.css';
import invisiblePassword from '../../../../assets/images/btn_visibility_off.png';
import visiblePassword from '../../../../assets/images/btn_visibility_on.png';

import { API_ADDRESS } from '../../../../constants/global.js';

const CreateStudy = () => {
  const {
    state: { nickname, studyName, description, password, confirmPassword, isFormValid },
    setters: { setNickname, setStudyName, setDescription, setPassword, setConfirmPassword },
    validators: { validateNickname, validateStudyName, validateDescription, validatePassword, validateConfirmPassword },
  } = useValidation();

  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [toggleBtn, setToggleBtn] = useState(invisiblePassword);
  const [confirmToggleBtn, setConfirmToggleBtn] = useState(invisiblePassword);

  const togglePasswordVisibility = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setToggleBtn(visiblePassword);
    } else {
      setPasswordType('password');
      setToggleBtn(invisiblePassword);
    }
  };

  const toggleConfirmPasswordVisibility = () => {
    if (confirmPasswordType === 'password') {
      setConfirmPasswordType('text');
      setConfirmToggleBtn(visiblePassword);
    } else {
      setConfirmPasswordType('password');
      setConfirmToggleBtn(invisiblePassword);
    }
  };

  const [focusedBackground, setFocusedBackground] = useState('https://ifh.cc/g/zaNc6p.jpg');
  useEffect(() => {
    const selectedBtn = document.createElement('div');
    const backgrounds = document.querySelectorAll('.background');
    const defaultBackground = document.querySelector('.background.green');

    selectedBtn.className = 'selectedBtn';
    defaultBackground.appendChild(selectedBtn);
    selectedBtn.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    const handleBackgroundClick = (event) => {
      const currentSelectedBtn = document.querySelector('.selectedBtn');
      if (currentSelectedBtn) {
        currentSelectedBtn.remove();
      }
      event.target.appendChild(selectedBtn);

      const backgroundUrl = window.getComputedStyle(event.target).backgroundImage.slice(5, -2);
      setFocusedBackground(backgroundUrl);
    };

    backgrounds.forEach((background) => {
      background.addEventListener('click', handleBackgroundClick);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_ADDRESS}/study`, {
        nickname,
        studyName,
        description,
        background: focusedBackground,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating study:', error);
    }
  };

  return (
    <form className="create-study-form">
      <div className="font18 semi-bold label title">스터디 만들기</div>
      <div className="form">
        <label className="font18 semi-bold label nickname">닉네임</label>
        <br />
        <input
          type="text"
          className={`input nickname ${validateNickname() === null ? '' : validateNickname() ? 'invalid' : 'valid'}`}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
          placeholder="닉네임을 입력해 주세요"
        />
        <span className="error">{validateNickname()}</span>
      </div>
      <div className="form">
        <label className="font18 semi-bold label studyName">스터디 이름</label>
        <br />
        <input
          type="text"
          className={`input studyName ${validateStudyName() === null ? '' : validateStudyName() ? 'invalid' : 'valid'}`}
          value={studyName}
          onChange={(e) => setStudyName(e.target.value)}
          required
          placeholder="스터디 이름을 입력해주세요"
        />
        <span className="error">{validateStudyName()}</span>
      </div>
      <div className="form">
        <label className="font18 semi-bold label description">소개</label>
        <br />
        <textarea
          className={`input description ${validateDescription() === null ? '' : validateDescription() ? 'invalid' : 'valid'}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="소개 멘트를 작성해주세요"
        />
        <span className="error">{validateDescription()}</span>
      </div>
      <div className="form">
        <label className="font18 semi-bold label card-background">배경을 선택해주세요</label>
        <br />
        <div className="grid-container">
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
        <div className="form">
          <label className="font18 semi-bold label password">비밀번호</label>
          <div className="password-container">
            <input
              type={passwordType}
              className={`input password ${validatePassword() === null ? '' : validatePassword() ? 'invalid' : 'valid'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력해주세요"
            />
            <img src={toggleBtn} alt="togglePassword" className="password-toggle-btn" onClick={togglePasswordVisibility} />
          </div>
          <span className="error">{validatePassword()}</span>
        </div>
        <div className="form">
          <label className="font18 semi-bold label confirmPassword">비밀번호 확인</label>
          <div className="confirmPassword-container">
            <input
              type={confirmPasswordType}
              className={`input confirmPassword ${
                validateConfirmPassword() === null ? '' : validateConfirmPassword() ? 'invalid' : 'valid'
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
            <img src={confirmToggleBtn} alt="togglePassword" className="password-toggle-btn" onClick={toggleConfirmPasswordVisibility} />
          </div>
          <span className="error">{validateConfirmPassword() || ''}</span>
        </div>
      </div>
      <div className="create-study__btn-create-frame">
        <button type="button" onClick={handleSubmit} disabled={!isFormValid} className="create-btn">
          만들기
        </button>
      </div>
    </form>
  );
};

export default CreateStudy;
