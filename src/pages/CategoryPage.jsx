import React from 'react';

import SearchBar from '../components/common/navBar/SearchBar';
import CategoryList from '../components/common/CategoryList';
import TabBar from '../components/common/navBar/TabBar';

import { ENTER_INPUT } from '../static/constants';

function CategoryPage() {
  return (
    <div className="max-height flex flex-col">
      <SearchBar placeholder={ENTER_INPUT} placeholderColor={'white'} />
      <div className="h-[39px] mx-[15px] mt-[20px] border-b-[0.5px] border-deepGray text-[13px]">카테고리</div>
      <CategoryList />
      <TabBar />
    </div>
  );
}

export default CategoryPage;
