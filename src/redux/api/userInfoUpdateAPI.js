import axios from 'axios';
import CryptoJS from 'crypto-js';

const encryptionKey = process.env.REACT_APP_SECRET_KEY;
const BASE_URL = 'http://localhost:8080/api/v1';

// 유저정보 암호화 후 로컬스토리지에 저장
export const UserInfoUpdate = async ({ newPassword, newNickname }) => {
  const encryptedPassword = CryptoJS.AES.encrypt(newPassword, encryptionKey).toString();

  try {
    // TODO: 서버에 저장된 유저정보로 변경하기
    const storedPassword = localStorage.getItem('signup-password');
    const storedNickname = localStorage.getItem('signup-nickname');

    // 새로운 값을 로컬 스토리지에 비동기적으로 저장하기
    if (newPassword !== undefined) {
      localStorage.setItem('signup-password', encryptedPassword);
    } else {
      localStorage.setItem('signup-password', storedPassword);
    }

    if (newNickname !== undefined) {
      localStorage.setItem('signup-nickname', newNickname);
    } else {
      localStorage.setItem('signup-nickname', storedNickname);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// 사용자 회원정보 조회
export const inquireUserInfoAPI = async ({ username }) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/detail`, username);
    const result = response.data;
    console.log(result);
    localStorage.setItem('username', result.username);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// 사용자 정보(비밀번호) 변경
export const updatePasswordAPI = async ({ username }) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/modify`, username);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
