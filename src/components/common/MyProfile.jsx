import React from 'react';

function MyProfile({ cameraSvg = '', writingSvg }) {
  return (
    <div className="mt-[30px] flex flex-col items-center w-[100%] relative">
      {/* <button className="mt-[25px] w-[105px] h-[105px] mb-[18px] rounded-full bg-mainColor">{cameraSvg}</button> */}

      <div className="mt-[30px] w-[100%]">
        <div className="flex flex-col items-center mx-[16px] mb-[20px] pb-[9px] border-b-[0.5px] border-gray">
          <div className="text-[16px] font-bold">{'우리동네'}</div>
        </div>
        <button className="float-right mt-[10px] absolute top-[21px] right-[4%]">{writingSvg}</button>
      </div>
    </div>
  );
}

export default MyProfile;
