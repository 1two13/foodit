import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { writingSlice } from '../../../redux/slices/writingSlice.js';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('TabHome');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const changeTab = (tabId) => {
    let path = '/';

    if (tabId === 'TabCategories') path = '/category';
    else if (tabId === 'TabAddPost') {
      path = '/writing';
      localStorage.clear();
      dispatch(writingSlice.actions.setImageUrl(null));
    } else if (tabId === 'TabChat') path = '/chatlist';
    else if (tabId === 'TabMyPage') path = '/myPage';

    navigate(path);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    let tabId = 'TabHome';

    if (currentPath === '/') tabId = 'TabHome';
    else if (currentPath === '/category') tabId = 'TabCategories';
    else if (currentPath === '/writing') tabId = 'TabAddPost';
    else if (currentPath === '/chatlist') tabId = 'TabChat';
    else if (currentPath === '/myPage') tabId = 'TabMyPage';

    setActiveTab(tabId);
  }, [location.pathname]);

  const Tabs = [
    {
      id: 'TabHome',
      title: '홈',
      svg: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 19.75V9.125C21 8.93094 20.9548 8.73955 20.868 8.56598C20.7812 8.39241 20.6552 8.24143 20.5 8.125L11.75 1.5625C11.5336 1.40022 11.2705 1.3125 11 1.3125C10.7295 1.3125 10.4664 1.40022 10.25 1.5625L1.5 8.125C1.34476 8.24143 1.21875 8.39241 1.13197 8.56598C1.04518 8.73955 1 8.93094 1 9.125V19.75C1 20.0815 1.1317 20.3995 1.36612 20.6339C1.60054 20.8683 1.91848 21 2.25 21H7.25C7.58152 21 7.89946 20.8683 8.13388 20.6339C8.3683 20.3995 8.5 20.0815 8.5 19.75V16C8.5 15.6685 8.6317 15.3505 8.86612 15.1161C9.10054 14.8817 9.41848 14.75 9.75 14.75H12.25C12.5815 14.75 12.8995 14.8817 13.1339 15.1161C13.3683 15.3505 13.5 15.6685 13.5 16V19.75C13.5 20.0815 13.6317 20.3995 13.8661 20.6339C14.1005 20.8683 14.4185 21 14.75 21H19.75C20.0815 21 20.3995 20.8683 20.6339 20.6339C20.8683 20.3995 21 20.0815 21 19.75Z"
            stroke={activeTab === 'TabHome' ? '#000000' : '#9D9D9D'}
            fill={activeTab === 'TabHome' ? '#000000' : '#9D9D9D'}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'TabCategories',
      title: '카테고리',
      svg: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="black" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_310_109)">
            <path
              d="M23.1112 20.9444H2.88897C2.69743 20.9444 2.51372 20.8684 2.37828 20.7329C2.24284 20.5975 2.16675 20.4138 2.16675 20.2222C2.16675 20.0307 2.24284 19.847 2.37828 19.7115C2.51372 19.5761 2.69743 19.5 2.88897 19.5H23.1112C23.3027 19.5 23.4864 19.5761 23.6219 19.7115C23.7573 19.847 23.8334 20.0307 23.8334 20.2222C23.8334 20.4138 23.7573 20.5975 23.6219 20.7329C23.4864 20.8684 23.3027 20.9444 23.1112 20.9444Z"
              fill={activeTab === 'TabCategories' ? '#000000' : '#9D9D9D'}
            />
            <path
              d="M23.1112 13.7218H2.88897C2.69743 13.7218 2.51372 13.6457 2.37828 13.5103C2.24284 13.3748 2.16675 13.1911 2.16675 12.9996C2.16675 12.808 2.24284 12.6243 2.37828 12.4889C2.51372 12.3534 2.69743 12.2773 2.88897 12.2773H23.1112C23.3027 12.2773 23.4864 12.3534 23.6219 12.4889C23.7573 12.6243 23.8334 12.808 23.8334 12.9996C23.8334 13.1911 23.7573 13.3748 23.6219 13.5103C23.4864 13.6457 23.3027 13.7218 23.1112 13.7218Z"
              fill={activeTab === 'TabCategories' ? '#000000' : '#9D9D9D'}
            />
            <path
              d="M23.1112 6.50011H2.88897C2.69743 6.50011 2.51372 6.42402 2.37828 6.28857C2.24284 6.15313 2.16675 5.96943 2.16675 5.77789C2.16675 5.58634 2.24284 5.40264 2.37828 5.2672C2.51372 5.13176 2.69743 5.05566 2.88897 5.05566H23.1112C23.3027 5.05566 23.4864 5.13176 23.6219 5.2672C23.7573 5.40264 23.8334 5.58634 23.8334 5.77789C23.8334 5.96943 23.7573 6.15313 23.6219 6.28857C23.4864 6.42402 23.3027 6.50011 23.1112 6.50011Z"
              fill={activeTab === 'TabCategories' ? '#000000' : '#9D9D9D'}
            />
          </g>
          <defs>
            <clipPath id="clip0_310_109">
              <rect width="26" height="26" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'TabAddPost',
      title: '글쓰기',
      svg: (
        <div className="w-[48px] h-[48px] rounded-full bg-mainColor flex items-center justify-center fixed bottom-[55px] left-1/2 translate-x-[-50%]">
          <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M26 16.996H16V26.996C16 27.5264 15.7893 28.0351 15.4142 28.4102C15.0391 28.7853 14.5304 28.996 14 28.996C13.4696 28.996 12.9609 28.7853 12.5858 28.4102C12.2107 28.0351 12 27.5264 12 26.996V16.996H2C1.46957 16.996 0.96086 16.7853 0.585787 16.4102C0.210714 16.0351 0 15.5264 0 14.996C0 14.4655 0.210714 13.9568 0.585787 13.5818C0.96086 13.2067 1.46957 12.996 2 12.996H12V2.99597C12 2.46554 12.2107 1.95683 12.5858 1.58176C12.9609 1.20668 13.4696 0.995972 14 0.995972C14.5304 0.995972 15.0391 1.20668 15.4142 1.58176C15.7893 1.95683 16 2.46554 16 2.99597V12.996H26C26.5304 12.996 27.0391 13.2067 27.4142 13.5818C27.7893 13.9568 28 14.4655 28 14.996C28 15.5264 27.7893 16.0351 27.4142 16.4102C27.0391 16.7853 26.5304 16.996 26 16.996Z"
              fill="white"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 'TabChat',
      title: '채팅',
      svg: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_310_1144)">
            <path
              d="M4.14505 24.8463C3.73118 24.8463 3.33419 24.6822 3.04107 24.39C2.74796 24.0978 2.58262 23.7014 2.5813 23.2875V21.1425L2.58505 8.125C2.58505 7.2962 2.91429 6.50134 3.50034 5.91529C4.08639 5.32924 4.88125 5 5.71005 5H24.3C24.7104 5 25.1168 5.08083 25.4959 5.23788C25.8751 5.39492 26.2196 5.62511 26.5098 5.91529C26.7999 6.20547 27.0301 6.54997 27.1872 6.92911C27.3442 7.30826 27.425 7.71462 27.425 8.125V18.6375C27.425 19.0479 27.3442 19.4542 27.1872 19.8334C27.0301 20.2125 26.7999 20.557 26.5098 20.8472C26.2196 21.1374 25.8751 21.3676 25.4959 21.5246C25.1168 21.6817 24.7104 21.7625 24.3 21.7625H8.64755C8.40139 21.7619 8.15754 21.81 7.93011 21.9042C7.70268 21.9984 7.49618 22.1368 7.32255 22.3113L5.25005 24.3875C5.1052 24.533 4.933 24.6485 4.74336 24.7272C4.55372 24.8059 4.35038 24.8464 4.14505 24.8463ZM5.71005 6.2525C5.21277 6.2525 4.73585 6.45004 4.38422 6.80167C4.03259 7.15331 3.83505 7.63022 3.83505 8.1275L3.82505 21.1413V23.2838C3.82519 23.3455 3.84363 23.4059 3.87806 23.4572C3.91248 23.5085 3.96134 23.5484 4.01846 23.572C4.07558 23.5955 4.1384 23.6016 4.19897 23.5895C4.25955 23.5773 4.31517 23.5475 4.3588 23.5038L6.4388 21.425C6.72815 21.134 7.07236 20.9033 7.4515 20.7462C7.83064 20.5891 8.23717 20.5089 8.64755 20.51H24.3C24.7973 20.51 25.2742 20.3125 25.6259 19.9608C25.9775 19.6092 26.175 19.1323 26.175 18.635V8.1275C26.175 7.63022 25.9775 7.15331 25.6259 6.80167C25.2742 6.45004 24.7973 6.2525 24.3 6.2525H5.71005Z"
              fill={activeTab === 'TabChat' ? '#000000' : '#9D9D9D'}
            />
            <path
              d="M5 23.5L4 24L3 23.5V7.5L5 6H22.5H25.5L26.5 7L27 18L26 20.5L23.5 21H8L5 23.5Z"
              fill={activeTab === 'TabChat' ? '#000000' : '#9D9D9D'}
            />
          </g>
          <defs>
            <clipPath id="clip0_310_1144">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'TabMyPage',
      title: '마이페이지',
      svg: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 18.5C1 17.1739 1.52678 15.9021 2.46447 14.9645C3.40215 14.0268 4.67392 13.5 6 13.5H16C17.3261 13.5 18.5979 14.0268 19.5355 14.9645C20.4732 15.9021 21 17.1739 21 18.5C21 19.163 20.7366 19.7989 20.2678 20.2678C19.7989 20.7366 19.163 21 18.5 21H3.5C2.83696 21 2.20107 20.7366 1.73223 20.2678C1.26339 19.7989 1 19.163 1 18.5Z"
            fill={activeTab === 'TabMyPage' ? '#000000' : '#9D9D9D'}
            stroke={activeTab === 'TabMyPage' ? '#000000' : '#9D9D9D'}
            strokeLinejoin="round"
          />
          <path
            d="M11 8.5C13.0711 8.5 14.75 6.82107 14.75 4.75C14.75 2.67893 13.0711 1 11 1C8.92893 1 7.25 2.67893 7.25 4.75C7.25 6.82107 8.92893 8.5 11 8.5Z"
            fill={activeTab === 'TabMyPage' ? '#000000' : '#9D9D9D'}
            stroke={activeTab === 'TabMyPage' ? '#000000' : '#9D9D9D'}
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bg-white px-[15px] bottom-0 z-50 h-[85px] w-full border-t-[0.5px] border-solid border-[#A4A4A4]">
      <ul className="flex justify-between">
        {Tabs.map((tab) => (
          <li
            key={tab.id}
            className={`flex flex-col items-center justify-end w-[57px] h-[54px] text-[13px] text-center cursor-pointer ${
              tab.id === activeTab ? 'text-black' : 'text-gray'
            }`}
            onClick={() => changeTab(tab.id)}
          >
            <div className="w-full flex justify-center">{tab.svg}</div>
            <span>{tab.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabBar;
