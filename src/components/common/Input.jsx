import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: ${(props) => props.width || '360px'};
  margin-bottom: ${(props) => props.mb || 0};
  border-color: ${(props) => props.color};
  background: ${(props) => (props.readOnly ? '#ccc' : '#fff')};
  color: ${(props) => (props.readOnly ? '#6B6B6B' : '#6B6B6B')};

  &:focus {
    outline-color: ${(props) => (props.readOnly ? 'none' : '#39b54a')};
  }
`;

function Input({ type, onChange, placeholder, name, value, width, mb, color, autoComplete, readOnly }) {
  return (
    <StyledInput
      className={`h-[48px] border-[1px] border-solid border-gray rounded-[10px] text-[14px] indent-[20px] placeholder-[#d9d9d9]`}
      width={width}
      mb={mb}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={onChange}
      color={color}
      readOnly={readOnly}
    />
  );
}
export default Input;
