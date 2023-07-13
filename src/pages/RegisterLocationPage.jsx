import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import NearLoacation from '../components/registerLocationPage/NearLoacation';
import SearchBar from '../components/common/navBar/SearchBar';
import { Show } from '../components/common/ShowCase';

import useDebounce from '../hooks/useDebounce';
import convertConventionUtil from '../utils/convertConventionUtil';
import { signUpAPI } from '../redux/api/authApi';
import { DEBOUNCE_LIMIT_TIME, NEAR_LOCATION, SEARCH_LOCATION } from '../static/constants';

function RegisterLocationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const debounceValue = useDebounce(inputText, DEBOUNCE_LIMIT_TIME);

  const navigate = useNavigate();
  const location = useLocation();
  const prevPath = location.state?.before;

  // 전체 데이터 가져오는 API
  const { data: locationList } = useQuery(
    'location',
    () =>
      fetch('/api/vi/address/list')
        .then((res) => res.json())
        .then((json) => convertConventionUtil.snakeToCamelCase(json)),
    {
      onSuccess: (data) => setSearchedData(data),
    },
  );

  const onClickLocation = async (address) => {
    console.log(address);
    try {
      if (prevPath === '/permission') {
        await signUpAPI({ addressId: address.id });
        navigate('/register-complete');
      } else {
        navigate('/register-location-complete');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = (e) => setInputText(e.target.value);

  useEffect(() => {
    const api = async () => {
      try {
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) return;
        const filteredData = locationList?.filter((el) => el.address.includes(trimmed)) ?? [];
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
      <Show className="w-full h-[668px] px-[15px] overflow-scroll">
        {searchedData &&
          searchedData.map((el, id) => (
            <NearLoacation key={id} location={el.address} onClick={() => onClickLocation(el)} isLoading={isLoading} />
          ))}
      </Show>
    </div>
  );
}

export default RegisterLocationPage;
