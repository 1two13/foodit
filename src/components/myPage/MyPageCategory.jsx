import React from 'react';
import styled from 'styled-components';

import { TEMPORARY_SRC } from '../../static/constants';

const Button = styled.button`
  color: ${(props) => props.color || '#6B6B6B'};
`;

function MyPageCategory({ name, color }) {
  return (
    <div class="flex mb-[29px]">
      <img alt="myPageCategory" src={TEMPORARY_SRC} class="w-[30px] h-[30px] ml-[15px] mr-[26px]" />
      <Button className="text-[16px] text-medium" color={color}>
        {name}
      </Button>
    </div>
  );
}

export default MyPageCategory;