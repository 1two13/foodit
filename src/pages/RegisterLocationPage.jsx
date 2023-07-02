import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import NearLoacation from '../components/registerLocationPage/NearLoacation';
import SearchBar from '../components/common/navBar/SearchBar';
import ShowCase from '../components/common/ShowCase';
import useDebounce from '../hooks/useDebounce';

import { DEBOUNCE_LIMIT_TIME, NEAR_LOCATION, SEARCH_LOCATION } from '../static/constants';
import { signUpAPI } from '../redux/api/authApi';
import { useQuery } from 'react-query';
import convertConventionUtil from '../utils/convertConventionUtil';

function RegisterLocationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const debounceValue = useDebounce(inputText, DEBOUNCE_LIMIT_TIME);

  const navigate = useNavigate();
  const location = useLocation();
  const prevPath = location.state?.before;

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
    console.log('hi', address);
    try {
      if (prevPath === '/permission') {
        await signUpAPI(address.id);
        navigate('/register-complete');
      } else {
        // TODO modify location
        navigate('/register-location-complete');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = (e) => {
    setInputText(e.target.value);
    // TODO: e.target.value를 포함하고 있는 데이터만 보여주기
  };

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
      <ShowCase
        className="flex flex-col items-center gap-[13px]"
        contents={
          searchedData &&
          searchedData.map((el, id) => (
            <NearLoacation key={id} location={el.address} onClick={() => onClickLocation(el)} isLoading={isLoading} />
          ))
        }
      />
    </div>
  );
}

export default RegisterLocationPage;
