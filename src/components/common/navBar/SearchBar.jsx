import React from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from './BackButton';

function SearchBar({ placeholder }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-[44px] mt-[47px]">
      <BackButton />
      <input
        placeholder={placeholder}
        className="w-[100%] mr-[15px] px-[27px] rounded-[5px] bg-[#F0F0F0] placeholder-gray text-[13px] outline-mainColor"
      />
    </div>
  );
}

export default SearchBar;
