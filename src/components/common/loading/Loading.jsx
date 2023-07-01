import React from 'react';
import { LoadingContents } from './LoadingContents';

function Loading() {
  return (
    <div className="bg-[rgba(0,0,0,0.55)] w-full h-full fixed top-0 z-[999]">
      <LoadingContents textColor={'#fff'} />
    </div>
  );
}

export default Loading;
