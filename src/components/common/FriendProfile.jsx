import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  background-color: ${(props) => props.color || '#39B54A'};
`;

function FriendProfile({ name = '', svg, color }) {
  return (
    <div className="flex flex-col items-center w-[56px] relative">
      <div className="flex flex-col items-center justify-center">
        <Div className="w-[45px] h-[45px] rounded-full" color={color}></Div>
      </div>
      {svg}
      <div className="h-[20px] pt-[4px] text-[11px]">{name}</div>
    </div>
  );
}

export default FriendProfile;
