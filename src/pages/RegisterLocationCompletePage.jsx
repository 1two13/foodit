import React from 'react';
import { useNavigate } from 'react-router-dom';

import TextAndBackBar from '../components/common/navBar/TextAndBackBar';
import LongButton from '../components/common/LongButton';
import ImageAndMessage from '../components/common/ImageAndMessage';

import { MOVE_TO_HOME } from '../static/constants';
import { useSelector } from 'react-redux';

const RegisterLocationCompletePage = () => {
  const navigate = useNavigate();
  const moveToHomePage = () => navigate('/');
  const { user } = useSelector((state) => state.auth);
  const nickname = user.nickname ? user.nickname : localStorage.getItem('signup-nickname');

  return (
    <div className="relative w-[390px] overflow-hidden">
      <TextAndBackBar title={'위치등록'} />
      <ImageAndMessage
        marginTop={'60px'}
        color={'#39B54A'}
        src={process.env.PUBLIC_URL + '/images/signup-success.gif'}
        mainMessage={'동네설정 완료'}
        subMessage={
          <>
            {/* data 받아와서 user.name 넣어주기 */}'{nickname}' 님의 동네 설정이
            <br />
            성공적으로 변경되었습니다.
          </>
        }
      />
      <LongButton type={'button'} contents={MOVE_TO_HOME} onClick={moveToHomePage} />
    </div>
  );
};

export default RegisterLocationCompletePage;
