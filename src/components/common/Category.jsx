import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { selectedCategorySlice } from '../../redux/slices/selectedCategorySlice';

function Category({ src, firstName, lastName = '' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onCategorySelect = (name) => {
    const currentPath = location.pathname;

    dispatch(selectedCategorySlice.actions.setCategory(name));
    if (currentPath === '/category') navigate('/search');
    else navigate('/');
  };

  return (
    <div
      className="border flex flex-col items-center w-[1/5px] h-[90px] cursor-pointer"
      onClick={() => onCategorySelect(lastName === '' ? firstName : `${firstName}/${lastName}`)}
    >
      <button>
        <img alt="category" src={src} className="w-[49px] h-[49px]" />
      </button>
      <div className="mt-[7px] text-[13px]">{firstName}</div>
      <div className="mt-[-5px] text-[13px]">{lastName}</div>
    </div>
  );
}

export default Category;
