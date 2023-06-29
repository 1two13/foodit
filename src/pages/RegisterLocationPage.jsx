import React from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import NearLoacation from '../components/registerLocationPage/NearLoacation';
import SearchBar from '../components/common/navBar/SearchBar';
import ShowCase from '../components/common/ShowCase';

import { SEARCH_LOCATION, NEAR_LOCATION } from '../static/constants';

function RegisterLocationPage() {
  // TODO: 추후 받아온 데이터를 사용할 예정
  const locationList = [
    '서울특별시 서초구 1',
    '서울특별시 서초구 2',
    '서울특별시 서초구 3',
    '서울특별시 서초구 4',
    '서울특별시 서초구 5',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
    '서울특별시 서초구 역삼동',
  ];
  const REACT_APP_SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

  const navigate = useNavigate();
  const onClickLocation = (location) => {
    const encrypt = CryptoJS.AES.encrypt(location, REACT_APP_SECRET_KEY).toString();
    localStorage.setItem('registeredLocation', encrypt);
    navigate('/register-complete');
  };

  return (
    <div className="flex flex-col">
      <SearchBar placeholder={SEARCH_LOCATION} />

      <div className="flex items-center h-[29px] my-[20px] ml-[15px] font-semibold text-[12px]">{NEAR_LOCATION}</div>
      <ShowCase
        className="flex flex-col items-center gap-[13px]"
        contents={
          locationList &&
          locationList.map((el, id) => <NearLoacation key={id} location={el} onClick={() => onClickLocation(el)} />)
        }
      />
    </div>
  );
}

export default RegisterLocationPage;
