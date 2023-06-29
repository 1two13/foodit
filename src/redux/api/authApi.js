import axios from 'axios';
import CryptoJS from 'crypto-js';

const encryptionKey = process.env.REACT_APP_SECRET_KEY;
const BASE_URL = 'http://localhost:8080/api/v1/';

// 유저정보 암호화 후 로컬스토리지에 저장
export const saveUserInfo = async ({ email, password, nickname }) => {
  const encryptedEmail = CryptoJS.AES.encrypt(email, encryptionKey).toString();
  const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();

  try {
    localStorage.setItem('signup-email', encryptedEmail);
    localStorage.setItem('signup-password', encryptedPassword);
    localStorage.setItem('signup-nickname', nickname);
  } catch (error) {
    throw new Error(error.message);
  }
};

// 회원가입 API 호출
export const signUpAPI = async ({ address }) => {
  const nickname = localStorage.getItem('signup-nickname');
  const encryptedEmail = localStorage.getItem('signup-email');
  const encryptedPassword = localStorage.getItem('signup-password');

  const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, encryptionKey).toString(CryptoJS.enc.Utf8);
  const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey).toString(CryptoJS.enc.Utf8);

  const userInfo = {
    userId: decryptedEmail,
    pw: decryptedPassword,
    email: decryptedEmail,
    name: nickname,
    address: address, // 복호화 확인 필요
  };

  try {
    const response = await axios.post(`${BASE_URL}/auth/join/Proc`, userInfo);
    const result = response.data;

    if (result.ACCESS_TOKEN) {
      localStorage.setItem('signup-token', result.ACCESS_TOKEN);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// 로그인 API 호출
export const signInAPI = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/join/check`, {
      email,
      password,
    });
    const result = response.data;

    if (result.ACCESS_TOKEN) {
      localStorage.setItem('signin-token', result.ACCESS_TOKEN);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// 로그아웃 API 호출
export const logoutAPI = async () => {
  try {
    await axios.get(`${BASE_URL}/logout`);
    localStorage.removeItem('signin-token');
  } catch (error) {
    throw new Error(error.message);
  }
};
