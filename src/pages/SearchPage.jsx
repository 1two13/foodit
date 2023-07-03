import React, { useState } from 'react';
import Select from 'react-select';

import SearchBar from '../components/common/navBar/SearchBar';
import SearchedOutputList from '../components/common/SearchedOutputList';
import TabBar from '../components/common/navBar/TabBar';

import { ENTER_INPUT } from '../static/constants';
import { useSearchParams } from 'react-router-dom';

// TODO: 하드코딩되어 있는 값들 모두 수정 필요
function SearchPage() {
  const options = [
    { value: '낮은 가격순', label: '낮은 가격순', orderBy: 'countAsc' },
    { value: '높은 가격순', label: '높은 가격순', orderBy: 'countDesc' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') ?? '전체';
  const [keyword, setKeyword] = useState(searchParams.get('keyword') ?? '');
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === searchParams.get('orderBy')) ?? options[0],
  );

  const [reload, setReload] = useState(false);

  const onChangeKeyword = (event) => setKeyword(event.target.value);
  const onSubmitKeyword = async (event) => {
    event.preventDefault();
    setSearchParams({ category: selectedCategory, orderBy: selectedOption.orderBy, keyword });

    // fetch data
    setReload(true);
  };

  const onChangeSelector = async (selectedOption) => {
    setSelectedOption(options.find((option) => option.value === selectedOption.value));
    setSearchParams({ category: selectedCategory, orderBy: selectedOption.orderBy, keyword });

    // fetch data
    setReload(true);
  };

  return (
    <div className="flex flex-col max-height">
      <SearchBar
        placeholder={ENTER_INPUT}
        placeholderColor={'white'}
        onChange={onChangeKeyword}
        onSubmit={onSubmitKeyword}
        keyword={keyword}
      />

      <div className="flex mx-[15px] mt-[15px] mb-[25px] justify-between items-center">
        <div className="flex w-[152px] h-[38px] items-center justify-center rounded-[5px] bg-orange text-white text-[15px]">
          {selectedCategory}
        </div>
        <Select defaultValue={selectedOption} options={options} onChange={onChangeSelector} />
      </div>

      <SearchedOutputList
        reload={reload}
        reloadFinishCallback={() => setReload(false)}
        keyword={keyword}
        category={selectedCategory}
        orderBy={selectedOption.orderBy}
        paddingTitleX={'px-[15px]'}
        paddingListX={'px-[30px]'}
      />

      <TabBar />
    </div>
  );
}

export default SearchPage;
