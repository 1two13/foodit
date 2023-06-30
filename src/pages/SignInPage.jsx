import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Input from '../components/common/Input';
import LongButton from '../components/common/LongButton';
import TextAndBackBar from '../components/common/navBar/TextAndBackBar';
import { setUsername, setError, setPassword } from '../redux/slices/signinSlice';
import { loginFailure, loginStart } from '../redux/slices/authSlice';

const SignInPage = () => {
  const { username, password, error } = useSelector((state) => state.signin);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();

  /** TODO: 응답 데이터의 이메일 정보를 이메일 입력 필드에 자동으로 채워넣기 수정예정 */
  // const storedEmail = localStorage.getItem('signup-username');
  // useEffect(() => {
  //   if (emailRef.current && storedEmail) {
  //     emailRef.current.value = storedEmail;
  //   }
  // }, [storedEmail]);

  // 아이디/비밀번호 상태관리 & 디바운스 처리
  const onChangeHandler = useCallback(
    debounce((event) => {
      event.preventDefault();
      const { name, value } = event.target;
      if (name === 'email') {
        dispatch(setUsername(value));
      } else if (name === 'password') {
        dispatch(setPassword(value));
      }
      console.log(value);
    }, 300),
    [dispatch],
  );

  // 로그인 시도
  const handleSignIn = () => {
    setIsButtonClicked(true);

    try {
      dispatch(loginStart());

      if (loginSuccess) {
        dispatch(loginSuccess({ username, password }));
        navigate('/');
        localStorage.removeItem('signup-username');
      } else {
        dispatch(setError('일치하는 회원정보가 없거나, 비밀번호가 일치하지 않습니다.'));
        setLoginSuccess(false);
      }
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  // 회원가입 페이지 & 게스트 로그인 이동
  /** 게스트 로그인은 추후 서버에서 데이터 받아와서 연결 필요 */
  const handleMovePage = (route) => {
    navigate(route);
  };

  return (
    <div className="relative">
      <TextAndBackBar title={'로그인'} />
      <form className="input-wrapper flex flex-wrap justify-center mt-[122px]">
        <Input
          type={'text'}
          placeholder={'아이디(이메일) 입력'}
          mb={'15px'}
          useRef={emailRef}
          onChange={onChangeHandler}
          color={isButtonClicked && !loginSuccess ? '#ff0000' : '#d9d9d9'}
        />
        <Input
          type={'password'}
          placeholder={'비밀번호 입력'}
          autoComplete={'autoComplete'}
          onChange={onChangeHandler}
          color={isButtonClicked && !loginSuccess ? '#ff0000' : '#d9d9d9'}
        />
        {!loginSuccess && isButtonClicked && (
          <span className="text-[13px] relative left-[-25px] mt-[15px] text-[#ff0000]">{error}</span>
        )}
      </form>
      <LongButton type={'submit'} contents={'로그인'} bottom={'405px'} onClick={handleSignIn} />
      <div className="w-full h-[44px] px-[15px] fixed top-[444px] left-1/2 translate-x-[-50%] flex flex-nowrap justify-between text-[13px] text-gray text-center leading-[44px]">
        <p className="cursor-pointer" onClick={() => handleMovePage('/')}>
          게스트 로그인
        </p>
        <p className="cursor-pointer" onClick={() => handleMovePage('/register')}>
          회원가입
        </p>
      </div>

      {/* 간편로그인 : 추후 api 생성 시 기능개발예정 */}
      {/* <div className="fixed bottom-[70px] left-[50%] translate-x-[-50%]">
        <p className="text-[13px] text-[#6b6b6b] text-center">또는</p>
        <div className="flex mt-[25px]">
          <div className="w-[44px] h-[44px] rounded-full bg-[#ea4235] mr-[15px]"></div>
          <div className="w-[44px] h-[44px] rounded-full bg-[#02CD39] mr-[15px]"></div>
          <div className="w-[44px] h-[44px] rounded-full bg-[#FBE300]"></div>
        </div>
      </div> */}
    </div>
  );
};
export default SignInPage;
