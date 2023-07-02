import React from 'react';
import { useSelector } from 'react-redux';

import FavoriteButton from '../common/FavoriteButton';
import Title from './Title';

const Favorite = () => {
  const { categories } = useSelector((state) => state.userFavorite);
  const favoriteCategories = Object.values(categories).map((category) => ({
    category: category.name,
    src: category.src,
  }));

  return (
    <div className="pt-[25px] pb-[28px] w-full overflow-x-hidden">
      <Title title={'즐겨찾기'} />
      <div className="flex justify-between min-h-[91px]">
        {favoriteCategories.map((item, index) => (
          <FavoriteButton key={index} category={item.category} src={item.src} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
