import React from 'react';

export function LoadingContents({ textColor }) {
  return (
    <div className="flex flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div
        className="w-[87px] h-[87px]"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/loading.gif)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></div>
      <p className="font-semibold text-center" style={{ color: `${textColor ? textColor : '#39b549'}` }}>
        로딩중...
      </p>
    </div>
  );
}
