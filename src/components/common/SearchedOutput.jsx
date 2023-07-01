import React from 'react';
import { WON } from '../../static/constants';
import { useNavigate } from 'react-router-dom';

function SearchedOutput({ src, postId, name, category, location, price }) {
  const navigate = useNavigate();
  return (
    <div className="flex cursor-pointer" onClick={() => navigate(`/posts/${postId}`)}>
      <img alt={'searchedImage'} src={src} className="w-[100px] rounded-[10px] h-[100px]" />
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
