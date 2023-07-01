import React from 'react';

import BackButton from './BackButton';

function SearchBar({ placeholder, onChange, onSubmit, keyword }) {
  return (
    <form className="flex h-[44px] mt-[47px]" onSubmit={onSubmit}>
      <BackButton />
      <input
        placeholder={placeholder}
        className="w-[100%] mr-[15px] px-[27px] rounded-[5px] bg-[#F0F0F0] placeholder-gray text-[13px] outline-mainColor"
        onChange={onChange}
        value={keyword}
      />
    </form>
  );
}

export default SearchBar;
