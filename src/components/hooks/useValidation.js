import { useState, useEffect } from 'react';

const useValidation = () => {
  const [nickname, setNickname] = useState('');
  const [studyName, setStudyName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateNickname = () => {
    if (nickname === '') return null;
    if (nickname.length < 2) return '2자 이상 입력해주세요';
    if (nickname.length > 12) return '12자 이내로 입력해주세요';
    return '';
  };

  const validateStudyName = () => {
    if (studyName === '') return null;
    if (studyName.length < 2) return '2자 이상 입력해주세요';
    if (studyName.length > 20) return '20자 이내로 입력해주세요';
    return '';
  };

  const validateDescription = () => {
    if (description === '') return null;
    if (description.length > 100) return '100자 이내로 입력해주세요';
    return '';
  };

  const validatePassword = () => {
    if (password === '') return null;
    if (password.length < 8) return '영문, 숫자를 포함하여 8자 이상 입력해주세요';
    if (password.length > 24) return '24자 이내로 입력해주세요';
    return '';
  };

  const validateConfirmPassword = () => {
    if (confirmPassword === '') return null;
    if (password !== confirmPassword || confirmPassword.length < 8) return '비밀번호가 일치하지 않습니다';
    return '';
  };

  useEffect(() => {
    const isValid =
      nickname !== '' &&
      studyName !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      !validateNickname() &&
      !validateStudyName() &&
      !validatePassword() &&
      !validateConfirmPassword();
    setIsFormValid(isValid);
  }, [nickname, studyName, description, password, confirmPassword]);

  return {
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
  };
};

export default useValidation;
