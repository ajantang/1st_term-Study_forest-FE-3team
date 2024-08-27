import axios from 'axios';
import { API_ADDRESS } from '../constants/global';

const instance = axios.create({
  baseURL: API_ADDRESS,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** /study POST - 스터디 생성 */
export const createStudy = async (nickname, studyName, description, background, password) => {
  const path = `/study`;
  const data = { nickname, studyName, description, background, password };

  try {
    const res = await instance.post(path, data);
    return res.data;
  } catch (err) {
    console.log(err);
    return err.name;
  }
};

/** /study GET - 스터디 목록 조회 */
export const getStudyInfo = async (page, pageSize, order, keyWord) => {
  const path = `/study`;

  const params = {
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(order && { order }),
    ...(keyWord && { keyWord }),
  };

  try {
    const res = await instance.get(path, { params });
    return res.data;
  } catch (err) {
    console.log(err);
    return err.name;
  }
};

/** /study/:id GET - 상세 스터디 조회 */
export const getStudyDetailInfo = async (studyId) => {
  const path = `/study/${studyId}`;

  try {
    const res = await instance.get(path);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /study/:id PATCH - 상세 스터디 수정 */
export const setStudyInfo = async (studyId) => {
  const path = `/study/${studyId}`;

  try {
    const res = await instance.patch(path);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** study/:id DELETE - 상세 스터디 삭제 */
export const deleteStudyInfo = async (studyId) => {
  const path = `/study/${studyId}`;

  try {
    const res = await instance.delete(path);
    return res.status;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /study/:id/auth POST - 비밀번호 */
export const authStudyPassword = async (studyId, password) => {
  const path = `/study/${studyId}/auth`;
  const castedPassword = password.toString();
  const data = { password: castedPassword };

  try {
    const res = await instance.post(path, data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /study/:id/habit POST - 습관 생성 */
export const createHabit = async (studyId, habitName) => {
  const path = `/study/${studyId}/habit`;
  const data = { name: habitName };

  try {
    const res = await instance.post(path, data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /study/:id/habitData GET - 습관 데이터 조회 */
export const gethabitData = async (studyId) => {
  const path = `/study/${studyId}/habitData`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const queryTimeZone = encodeURIComponent(timeZone);
  const params = { timeZone: queryTimeZone };

  try {
    const res = await instance.get(path, { params });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /study/:studyId/habitList GET - 습관 리스트 조회 */
export const gethabitList = async (studyId) => {
  const path = `/study/${studyId}/habitList`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const queryTimeZone = encodeURIComponent(timeZone);
  const params = { timeZone: queryTimeZone };

  try {
    const res = await instance.get(path, { params });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /habit/:habitId PATCH” - 습관 이름 수정 */
export const setHabitName = async (habitId, newHabitName) => {
  const path = `/habit/${habitId}`;
  const data = { name: newHabitName };

  try {
    const res = await instance.patch(path, data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /habit/:habitId/delete - PATCH 습관 삭제 */
export const setHabitDelete = async (habitId) => {
  const path = `/habit/${habitId}/delete`;

  try {
    const res = await instance.patch(path);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /success POST - 완료한 습관 추가 */
export const createSuccessHabitDate = async (habitId) => {
  const path = `/success`;
  const data = { id: habitId };

  try {
    const res = await instance.post(path, data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /success/:habitId DELETE - 완료한 습관 취소 */
export const deleteSuccessHabitDate = async (successHabitDateId) => {
  const path = `/success/${successHabitDateId}`;

  try {
    const res = await instance.delete(path);
    return res.status();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /study/:id/emoji GET - 응원 이모지 조회 */
export const getEmojiInfo = async (studyId) => {
  const path = `/study/${studyId}/emoji`;

  try {
    const res = await instance.get(path);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/** /study/:id/emoji PUT - 응원 이모지 카운트 추가 */
export const addEmojiInfo = async (studyId, emojiCode) => {
  const path = `/study/${studyId}/emoji`;
  const data = { emojiCode: emojiCode };

  try {
    const res = await instance.put(path, data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
