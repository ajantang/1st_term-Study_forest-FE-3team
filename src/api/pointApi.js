import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://onest-term-study-forest-be-3team-rovo.onrender.com/study',
});

export async function getStudy() {
  try {
    const res = await instance.get(``);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPoint(id) {
  try {
    const res = await instance.get(`${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePoint(id, data) {
  try {
    const res = await instance.patch(`${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
