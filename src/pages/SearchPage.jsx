import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import SearchBar from '../components/common/navBar/SearchBar';
import SearchedOutputList from '../components/common/SearchedOutputLists';
import TabBar from '../components/common/navBar/TabBar';

import { ENTER_INPUT } from '../static/constants';

// TODO: 하드코딩되어 있는 값들 모두 수정 필요
function SearchPage() {
  const options = [
    { value: '낮은 가격순', label: '낮은 가격순' },
    { value: '높은 가격순', label: '높은 가격순' },
  ];
  const searchedOutputList = [
    {
      id: 1,
      name: '전체',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '전체',
    },
    {
      id: 2,
      name: '과일',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '과일',
    },
    {
      id: 3,
      name: '채소',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '채소',
    },
    {
      id: 4,
      name: '쌀/잡곡/견과',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '쌀/잡곡/견과',
    },
    {
      id: 5,
      name: '정육/계란류',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '정육/계란류',
    },
    {
      id: 6,
      name: '수산물/건해산',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '수산물/건해산',
    },
    {
      id: 7,
      name: '우유/유제품',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '우유/유제품',
    },
    {
      id: 8,
      name: '김치/반찬/델리',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '김치/반찬/델리',
    },
    {
      id: 100,
      name: '김치/반찬/델리',
      location: '서울시 서초구 서초대로',
      price: '15000',
      category: '김치/반찬/델리',
    },
    {
      id: 9,
      name: '생수/음료/주류',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '생수/음료/주류',
    },
    {
      id: 10,
      name: '커피/차/원두',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '커피/차/원두',
    },
    {
      id: 11,
      name: '면류/통조림',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '면류/통조림',
    },
    {
      id: 12,
      name: '양념/오일',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '양념/오일',
    },
    {
      id: 13,
      name: '과자/간식',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '과자/간식',
    },
    {
      id: 14,
      name: '베이커리/잼',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '베이커리/잼',
    },
    {
      id: 15,
      name: '친환경/유기농',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '친환경/유기농',
    },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const selectedCategory = useSelector((state) => state.selectedCategory.category);
  const onChangeSelector = (selectedOption) => setSelectedOption(selectedOption.value);

  useEffect(() => {
    setSelectedOption(options[0].value);
  }, []);

  return (
    <div className="flex flex-col">
      <SearchBar placeholder={ENTER_INPUT} placeholderColor={'white'} />

      <div className="flex mx-[15px] mt-[15px] mb-[25px] justify-between items-center">
        <div className="flex w-[152px] h-[38px] items-center justify-center rounded-[5px] bg-orange text-white text-[15px]">
          {selectedCategory}
        </div>
        <Select defaultValue={selectedOption} options={options} onChange={onChangeSelector} />
      </div>

      <div className="mx-[16px] mb-[15px] text-[13px]">총 {searchedOutputList.length}개</div>
      <SearchedOutputList
        searchedOutputList={
          selectedOption === '낮은 가격순'
            ? searchedOutputList
                .filter((el) => el.category === selectedCategory)
                .sort((a, b) => parseInt(a.price) - parseInt(b.price))
            : searchedOutputList
                .filter((el) => el.category === selectedCategory)
                .sort((a, b) => parseInt(b.price) - parseInt(a.price))
        }
      />
      <TabBar />
    </div>
  );
}

export default SearchPage;
