import React from 'react';
import { useSelector } from 'react-redux';
import FavoriteButton from '../common/FavoriteButton';
import Title from './Title';

const Favorite = () => {
  const { category1, category2, category3, category4, category5 } = useSelector((state) => state.userFavorite);
  const favoriteCategories = [
    { category: category1.name, src: category1.src },
    { category: category2.name, src: category2.src },
    { category: category3.name, src: category3.src },
    { category: category4.name, src: category4.src },
    { category: category5.name, src: category5.src },
  ];
  console.log(favoriteCategories);
  return (
    <div className="pt-[25px] pb-[30px] w-full overflow-x-hidden">
      <Title title={'즐겨찾기'} />
      <div className="flex justify-between">
        {favoriteCategories.map((item, index) => (
          <FavoriteButton key={index} category={item.category} src={item.src} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
