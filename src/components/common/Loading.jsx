import React from 'react';

const Loading = () => {
  return (
    <div className="bg-[rgba(0,0,0,0.55)] w-[390px] h-full fixed top-0 z-[999]">
      <div className="flex flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div
          className="w-[87px] h-[87px]"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/loading.gif)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
        <p className="text-white font-semibold text-center">로딩중...</p>
      </div>
    </div>
  );
};

export default Loading;
