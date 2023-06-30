import axios from 'axios';
import CryptoJS from 'crypto-js';

const encryptionKey = process.env.REACT_APP_SECRET_KEY;
const BASE_URL = 'http://localhost:8080/api/v1';

// 유저정보 암호화 후 로컬스토리지에 저장
export const saveUserInfo = async ({ username, password, nickname }) => {
  const encryptedusername = CryptoJS.AES.encrypt(username, encryptionKey).toString();
  const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();

  try {
    localStorage.setItem('signup-username', encryptedusername);
    localStorage.setItem('signup-password', encryptedPassword);
    localStorage.setItem('signup-nickname', nickname);
  } catch (error) {
    throw new Error(error.message);
  }
};

// 사용자 아이디 검증
export const checkEmail = async ({ email }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/join/check`, email);
    const result = response.data;
    return result; // 서버로부터 중복 여부 확인 결과 반환
  } catch (error) {
    throw new Error(error.message);
  }
};

// 회원가입 API 호출
export const signUpAPI = async ({ address }) => {
  const nickname = localStorage.getItem('signup-nickname');
  const encryptedUsername = localStorage.getItem('signup-email');
  const encryptedPassword = localStorage.getItem('signup-password');

  const decryptedUsername = CryptoJS.AES.decrypt(encryptedUsername, encryptionKey).toString(CryptoJS.enc.Utf8);
  const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey).toString(CryptoJS.enc.Utf8);

  const userInfo = {
    userId: '',
    pw: decryptedPassword,
    email: decryptedUsername,
    name: nickname,
    address: address, // 복호화 확인 필요
  };

  try {
    const response = await axios.post(`${BASE_URL}/auth/join/Proc`, userInfo);
    const result = response.data;

    if (result.ACCESS_TOKEN) {
      userInfo.userId = result.ACCESS_TOKEN; // userId 값 설정
    }
    console.log(result);
  } catch (error) {
    throw new Error(error.message);
  }
};

// 로그인 API 호출
export const signInAPI = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
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