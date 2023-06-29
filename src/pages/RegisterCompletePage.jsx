import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageAndMessage from '../components/common/ImageAndMessage';
import LongButton from '../components/common/LongButton';
import TextBar from '../components/common/navBar/TextAndBackBar';

const RegisterCompletePage = () => {
  const navigate = useNavigate();

  const handleMoveSignIn = () => {
    navigate(`/signin`);
  };
  const nickname = localStorage.getItem('signup-nickname');

  return (
    <>
      <TextBar title={'회원가입'} />
      <ImageAndMessage
        marginTop={'26px'}
        color={'#39B54A'}
        src={process.env.PUBLIC_URL + '/images/walkthrough.gif'}
        mainMessage={'회원가입 완료'}
        subMessage={
          <>
            {/* data 받아와서 user.name 넣어주기 */}'{nickname}' 님의 회원가입이
            <br />
            성공적으로 완료되었습니다.
          </>
        }
      />
      <LongButton className="start-button" contents={'로그인 바로가기'} onClick={handleMoveSignIn} />
    </>
  );
};
export default RegisterCompletePage;
