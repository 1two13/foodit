import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectedCategorySlice } from '../../redux/slices/selectedCategorySlice';

import { addFavoriteCategory } from '../../redux/slices/userFavoriteSlice';
function Category({ src, firstName, lastName = '' }) {
  const name = lastName === '' ? firstName : `${firstName}\n${lastName}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onCategorySelect = () => {
    const currentPath = location.pathname;
    dispatch(selectedCategorySlice.actions.setCategory(name));
    dispatch(addFavoriteCategory({ name, src }));
    if (currentPath === '/category') {
      navigate('/search');
    } else {
      navigate('/');
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
