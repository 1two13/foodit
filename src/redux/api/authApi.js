import axios from 'axios';
import CryptoJS from 'crypto-js';
import convertConventionUtil from '../../utils/convertConventionUtil';

const encryptionKey = process.env.REACT_APP_SECRET_KEY;
const BASE_URL = '/api/vi';

/** 회원가입 유저정보 암호화 후 로컬스토리지에 저장 */
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

/** 회원가입 페이지 - 사용자 아이디 중복 검증 */
export const checkEmailAPI = async ({ username }) => {
  try {
    console.log(username);
    const response = await axios.post(`${BASE_URL}/auth/join/check`, { username });
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

/** 회원가입 API 호출 */
export const signUpAPI = async ({ addressId }) => {
  const nickname = localStorage.getItem('signup-nickname');
  const encryptedUsername = localStorage.getItem('signup-username');
  const encryptedPassword = localStorage.getItem('signup-password');

  console.log(nickname, encryptedUsername, encryptedPassword);
  const decryptedUsername = CryptoJS.AES.decrypt(encryptedUsername, encryptionKey).toString(CryptoJS.enc.Utf8);
  const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey).toString(CryptoJS.enc.Utf8);

  const userInfo = {
    username: decryptedUsername,
    password: decryptedPassword,
    nickname: nickname,
    addressId: addressId,
  };

  try {
    const response = await axios.post(`${BASE_URL}/auth/joinProc`, userInfo);
    const result = response.data;

    if (!result?.id) {
      throw new Error(result);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/** 로그인 API 호출 */
export const signInAPI = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    const user = convertConventionUtil.snakeToCamelCase(response.data);

    if (!user?.id) {
      throw new Error('signIn failed.');
    }

    localStorage.setItem('token', user.token);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserInfoAPI = async ({ token }) => {
  return fetch(`${BASE_URL}/user/detail`, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((json) => convertConventionUtil.snakeToCamelCase(json));
};

/** 로그아웃 API 호출 */
export const logoutAPI = async () => {
  try {
    await axios.get(`${BASE_URL}/logout`);
    localStorage.removeItem('signin-token');
    localStorage.removeItem('username');
  } catch (error) {
    throw new Error(error.message);
  }
};
