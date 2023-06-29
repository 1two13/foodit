import React from 'react';
import { BEFORE, WON } from '../../static/constants';

function SearchedOutput({ src, name, location, price }) {
  // TODO: price에 콤마 추가해야할 수도
  return (
    <div className="flex">
      <img alt={'searchedImage'} src={src} className="w-[100px] rounded-[10px]" />
      <div className="ml-[15px] flex flex-col justify-between">
        <div>
          <div className="text-[13px] font-semibold">{name}</div>
          <div className="text-[10px] text-smokeGray">{location}</div>
        </div>
        <div className="text-[16px] font-bold">{`${price}${WON}`}</div>
      </div>
    </div>
  );
}

export default SearchedOutput;
