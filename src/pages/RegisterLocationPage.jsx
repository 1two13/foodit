import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import NearLoacation from '../components/registerLocationPage/NearLoacation';
import SearchBar from '../components/common/navBar/SearchBar';
import ShowCase from '../components/common/ShowCase';
import useDebounce from '../hooks/useDebounce';
import { signUpAPI } from '../redux/api/authApi';

import { SEARCH_LOCATION, NEAR_LOCATION, DEBOUNCE_LIMIT_TIME } from '../static/constants';

function RegisterLocationPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchedData, setSearchedData] = useState();
  const debounceValue = useDebounce(inputText, DEBOUNCE_LIMIT_TIME);

  const onClickLocation = (location) => {
    signUpAPI(location);
    navigate('/register-complete');
  };

  const onChangeHandler = (e) => setInputText(e.target.value);

  useEffect(() => {
    const api = async () => {
      try {
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) return;

        // FIXME: 서버에서 trimmed를 포함하는 API를 매번 호출
        let locationList = axios({
          method: 'post',
          url: '/address/list',
          data: {
            address_depth3: trimmed,
          },
        });
        // TODO: locationList => id, address_depth1, address_depth2, address_depth3
        // setSearchedData(locationList);
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
        // contents={
        //   searchedData &&
        //   searchedData.map((el, id) => <NearLoacation key={id} location={el} onClick={() => onClickLocation(el)} />)
        // }
      />
    </div>
  );
}

export default RegisterLocationPage;
