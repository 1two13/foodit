import React from 'react';
import { LoadingContents } from '../common/loading/LoadingContents';

function NearLoacation({ location, onClick, isLoading }) {
  return (
    <>
      {!isLoading ? (
        <div
          className="w-full h-[42px] border-b-[0.5px] border-gray text-[13px] leading-[29px] mb-[13px] cursor-pointer"
          onClick={onClick}
        >
          {location}
        </div>
      ) : (
        <LoadingContents />
      )}
    </>
  );
}

export default NearLoacation;
