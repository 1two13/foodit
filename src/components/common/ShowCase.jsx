import React from 'react';
import styled from 'styled-components';

export const Show = styled.div`
  /* 스크롤바 숨기기 */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

function ShowCase({ contents }) {
  return <Show className="w-full flex-1 px-[15px] overflow-hidden flex flex-col">{contents}</Show>;
}

export default ShowCase;
