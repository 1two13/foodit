import React from 'react';
import styled from 'styled-components';

const Show = styled.div`
  /* 스크롤바 숨기기 */
  overflow-x: auto;
  overflow-y: auto;
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
  return <Show className="w-full h-[668px] px-[15px] overflow-hidden">{contents}</Show>;
}
export default ShowCase;
