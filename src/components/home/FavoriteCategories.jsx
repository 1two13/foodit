import React from 'react';
import CategoryList from '../common/CategoryList';
import TextAndBackBar from '../common/navBar/TextAndBackBar';

const FavoriteCategories = () => {
  return (
    <div>
      <TextAndBackBar title={'카테고리'} />
      <CategoryList />
    </div>
  );
};

export default FavoriteCategories;
