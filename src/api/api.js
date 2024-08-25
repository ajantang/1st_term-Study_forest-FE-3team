import axios from 'axios';
import { API_ADDRESS } from '../constants/global';

const instance = axios.create({
  baseURL: API_ADDRESS,
});

// 리스트 조회 API
const gethabitList = async (studyId) => {
  const res = await instance.get(`/study/${studyId}/habitList`);
  return res.data;
};

// 습관 완료 APi
const postSuccess = async (habitId) => {
  const res = await instance.post(`/habit/${habitId}/success`);
  return res.data;
};

// 완료한 습관 삭제 API
const deleteSuccess = async (habitSuccessId) => {
  const res = await instance.delete(`/success/${habitSuccessId}`);
  return res.data;
};

// 습관 삭제(PATCH) API
const deleteHabit = async (habitId) => {
  const res = await instance.patch(`/habit/${habitId}/delete`);
  return res.data;
};

// 습관 생성 API
const postHabit = async (studyId, surveyData) => {
  const res = await instance.post(`/study/${studyId}/habit`, surveyData);
  return res.data;
};

// 습관 이름 변경 API
const patchHabit = async (habitId, surveyData) => {
  const res = await instance.patch(`/habit/${habitId}`, surveyData);
  return res.data;
};

// 이율리
export async function getPoint(id) {
  try {
    const res = await instance.get(`/study/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePoint(id, data) {
  try {
    const res = await instance.patch(`/study/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export { gethabitList, postSuccess, deleteSuccess, deleteHabit, postHabit, patchHabit };

// 스터디 생성 API
export const getStudyData = (id) => {
  return axios.get(`${API_ADDRESS}/study/${id}`);
};
