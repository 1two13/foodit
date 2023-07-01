import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import NearLoacation from '../components/registerLocationPage/NearLoacation';
import SearchBar from '../components/common/navBar/SearchBar';
import ShowCase from '../components/common/ShowCase';
import useDebounce from '../hooks/useDebounce';

import { SEARCH_LOCATION, NEAR_LOCATION, DEBOUNCE_LIMIT_TIME } from '../static/constants';

function RegisterLocationPage() {
  // TODO: 추후 받아온 데이터를 사용할 예정
  const locationList = [
    '서울특별시 서초구 1',
    '서울특별시 서초구 2',
    '서울특별시 서초구 3',
    '서울특별시 서초구 4',
    '서울특별시 서초구 5',
    '인천광역시',
    '서울특별시 역삼동 1',
    '서울특별시 역삼동 2',
    '서울특별시 역삼동 3',
    '인천광역시 연수구 송도동',
    '인천광역시 연수구 송도동 1',
    '광주광역시 서초구 역삼동',
    '부산광역시 서초구 역삼동',
    '서울특별시 서초구 1',
    '서울특별시 서초구 2',
    '서울특별시 서초구 3',
    '서울특별시 서초구 4',
    '서울특별시 서초구 5',
    '인천광역시',
    '서울특별시 역삼동 1',
    '서울특별시 역삼동 2',
    '서울특별시 역삼동 3',
    '인천광역시 연수구 송도동',
    '인천광역시 연수구 송도동 1',
    '광주광역시 서초구 역삼동',
    '부산광역시 서초구 역삼동',
  ];
  const REACT_APP_SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const debounceValue = useDebounce(inputText, DEBOUNCE_LIMIT_TIME);
  console.log(searchedData);

  const navigate = useNavigate();
  const location = useLocation();
  const prevPath = location.state?.prevPath;
  
  const onClickLocation = (address) => {
    const encrypt = CryptoJS.AES.encrypt(address, REACT_APP_SECRET_KEY).toString();
    localStorage.setItem('registeredLocation', encrypt);
    if (prevPath === '/register-location') {
      navigate('/register-complete');
    } else {
      navigate('/register-location-complete');
    }
  };

  const onChangeHandler = (e) => {
    setInputText(e.target.value);
    // e.target.value를 포함하고 있는 데이터만 보여주기
  };

  // FIXME: 처음에 전체 주소 목록을 보여줄건지
  useEffect(() => {
    setSearchedData(locationList);
  }, []);

  useEffect(() => {
    const api = async () => {
      try {
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) return;

        console.log(searchedData);
        // FIXME: 서버에서 inputText를 포함하는 API를 매번 호출하는건지, 맨처음에 렌더링될 때 연동한 API를 filter해서 보여주는 건지..
        // const { locationList } = await getSearchedList({ q: inputText, page: 1 });
        // setSearchedData(locationList);
        const filteredData = locationList.filter((el) => el.includes(trimmed));
        setSearchedData(filteredData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (debounceValue) api();
  }, [debounceValue]);

  return (
    <div className="flex flex-col">
      <SearchBar placeholder={SEARCH_LOCATION} onChange={onChangeHandler} />

      <div className="flex items-center h-[29px] my-[20px] ml-[15px] font-semibold text-[12px]">{NEAR_LOCATION}</div>
      <ShowCase
        className="flex flex-col items-center gap-[13px]"
        contents={
          searchedData &&
          searchedData.map((el, id) => <NearLoacation key={id} location={el} onClick={() => onClickLocation(el)} />)
        }
      />
    </div>
  );
}

export default RegisterLocationPage;
