import React from 'react';

function NearLoacation({ location, onClick }) {
  return (
    <div
      className="w-full h-[42px] border-b-[0.5px] border-gray text-[13px] leading-[29px] mb-[13px] cursor-pointer"
      onClick={onClick}
    >
      {location}
    </div>
  );
}

export default NearLoacation;
