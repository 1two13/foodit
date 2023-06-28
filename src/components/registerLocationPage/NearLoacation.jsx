import React from 'react';

function NearLoacation({ location, onClick }) {
  return (
    <div className="w-[360px] h-[42px] pb-[13px] border-b-[0.5px] border-gray" onClick={onClick}>
      {location}
    </div>
  );
}

export default NearLoacation;
