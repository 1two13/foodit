import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { selectedCategorySlice } from '../../redux/slices/selectedCategorySlice';
import { addFavoriteCategory } from '../../redux/slices/userFavoriteSlice';
import { addFavoriteAPI } from '../../redux/api/userInfoUpdateAPI';

function Category({ src, firstName, lastName = '' }) {
  const name = lastName === '' ? firstName : `${firstName}\n${lastName}`;
  const { username, categories } = useSelector((state) => state.userFavorite);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCategorySelect = async () => {
    const currentPath = location.pathname;
    dispatch(selectedCategorySlice.actions.setCategory(name.split('\n').join('/')));

    if (currentPath === '/category') {
      navigate(`/search?category=${name.split('\n').join('/')}&orderBy=낮은+가격순`);
    } else {
      navigate('/home');
      dispatch(addFavoriteCategory({ name, src }));

      try {
        await dispatch(addFavoriteAPI({ username, categories }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center w-[1/5px] h-[90px] cursor-pointer"
      onClick={() => onCategorySelect(name, src)}
    >
      <button>
        <img alt="category" src={src} className="w-[49px] h-[49px] mb-[7px]" />
      </button>
      <div className="text-[13px] text-center" style={{ whiteSpace: 'pre-wrap' }}>
        {name}
      </div>
    </div>
  );
}

export default Category;
