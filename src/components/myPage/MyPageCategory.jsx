import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: ${(props) => props.color || '#6B6B6B'};
`;

function MyPageCategory({ name, color, onClick }) {
  return (
    <div className="flex mb-[29px] ml-[15px]" onClick={onClick}>
      {/* <div className="w-[30px] h-[30px] ml-[15px] mr-[26px] bg-gray"></div> */}
      <Button className="text-[16px] text-medium" color={color}>
        {name}
      </Button>
    </div>
  );
}

export default MyPageCategory;
