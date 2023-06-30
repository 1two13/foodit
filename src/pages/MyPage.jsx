import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyPageCategory from '../components/myPage/MyPageCategory';
import MyProfile from '../components/common/MyProfile';
import TabBar from '../components/common/navBar/TabBar';

import { MY_PAGE, SETTING_LOCATION, CHANGE_INFO, LOGOUT } from '../static/constants';
import { logoutFailure, logoutStart, logoutSuccess } from '../redux/slices/authSlice';
import { getUserInfoFailure, getUserInfoStart, getUserInfoSuccess } from '../redux/slices/myPageSlice';

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  /** 내정보 변경 */
  const moveToEditProfile = () => {
    try {
      dispatch(getUserInfoStart());
      dispatch(getUserInfoSuccess(username));
      navigate('/editProfile');
    } catch (error) {
      dispatch(getUserInfoFailure());
    }
  };

  /** 로그아웃 시도 */
  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      dispatch(logoutSuccess());
      navigate('/');
    } catch (error) {
      console.log('로그아웃 실패');
      dispatch(logoutFailure('로그아웃에 실패했습니다.'));
    }
  };

  return (
    <div className="mt-[47px]">
      <div className="flex flex-col justify-center items-center">
        <div className="text-[16px] font-medium">{MY_PAGE}</div>
        <MyProfile
          // cameraSvg={
          //   <svg
          //     className="absolute top-[100px] right-[142px]"
          //     width="31"
          //     height="31"
          //     viewBox="0 0 31 31"
          //     fill="none"
          //     xmlns="http://www.w3.org/2000/svg"
          //   >
          //     <rect width="31" height="31" rx="15.5" fill="black" fillOpacity="0.6" />
          //     <path
          //       d="M9.5 11.3333H11.75L13.25 10H17.75L19.25 11.3333H21.5C21.8978 11.3333 22.2794 11.4738 22.5607 11.7239C22.842 11.9739 23 12.313 23 12.6667V20.6667C23 21.0203 22.842 21.3594 22.5607 21.6095C22.2794 21.8595 21.8978 22 21.5 22H9.5C9.10218 22 8.72064 21.8595 8.43934 21.6095C8.15804 21.3594 8 21.0203 8 20.6667V12.6667C8 12.313 8.15804 11.9739 8.43934 11.7239C8.72064 11.4738 9.10218 11.3333 9.5 11.3333ZM15.5 13.3333C14.5054 13.3333 13.5516 13.6845 12.8483 14.3096C12.1451 14.9348 11.75 15.7826 11.75 16.6667C11.75 17.5507 12.1451 18.3986 12.8483 19.0237C13.5516 19.6488 14.5054 20 15.5 20C16.4946 20 17.4484 19.6488 18.1517 19.0237C18.8549 18.3986 19.25 17.5507 19.25 16.6667C19.25 15.7826 18.8549 14.9348 18.1517 14.3096C17.4484 13.6845 16.4946 13.3333 15.5 13.3333ZM15.5 14.6667C16.0967 14.6667 16.669 14.8774 17.091 15.2525C17.5129 15.6275 17.75 16.1362 17.75 16.6667C17.75 17.1971 17.5129 17.7058 17.091 18.0809C16.669 18.456 16.0967 18.6667 15.5 18.6667C14.9033 18.6667 14.331 18.456 13.909 18.0809C13.4871 17.7058 13.25 17.1971 13.25 16.6667C13.25 16.1362 13.4871 15.6275 13.909 15.2525C14.331 14.8774 14.9033 14.6667 15.5 14.6667Z"
          //       fill="white"
          //     />
          //   </svg>
          // }
          writingSvg={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.1677 0.732422L12.2771 2.62305L17.3552 7.70117L19.2458 5.81055C20.2224 4.83398 20.2224 3.25195 19.2458 2.27539L17.7068 0.732422C16.7302 -0.244141 15.1482 -0.244141 14.1716 0.732422H14.1677ZM11.3943 3.50586L2.28879 12.6152C1.88254 13.0215 1.58567 13.5254 1.4216 14.0762L0.0387918 18.7754C-0.0588645 19.1074 0.0309793 19.4629 0.273167 19.7051C0.515354 19.9473 0.870823 20.0371 1.19895 19.9434L5.89817 18.5605C6.44895 18.3965 6.95285 18.0996 7.3591 17.6934L16.4724 8.58398L11.3943 3.50586Z"
                fill="#9D9D9D"
              />
            </svg>
          }
        />
      </div>

      <div>
        <MyPageCategory name={SETTING_LOCATION} />
        <MyPageCategory name={CHANGE_INFO} onClick={moveToEditProfile} />
        <MyPageCategory name={LOGOUT} color={'#EE0707'} onClick={handleLogout} />
      </div>

      <TabBar />
    </div>
  );
}

export default MyPage;
