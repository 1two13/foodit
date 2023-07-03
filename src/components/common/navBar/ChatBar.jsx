import React, { useState } from 'react';

function ChatBar() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="top-bar fixed bottom-0 z-50 h-[85px] w-full border-t-[1px] border-solid border-[#A4A4A4]">
      <input
        type="text"
        className="w-[100%] h-[44px] pl-[5%] pr-[15%] focus:outline-none tracking-wide"
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <button
        type="submit"
        className={`w-[44px] h-[44px] absolute top-0 right-[7px] ${
          isInputFocused || !!inputValue ? 'text-blue-500' : 'text-gray-500'
        }`}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.9898 25.0102L35 10M19.9898 25.0102L24.7658 34.5622C24.8256 34.6928 24.9218 34.8035 25.0427 34.8811C25.1637 34.9587 25.3043 35 25.4481 35C25.5918 35 25.7325 34.9587 25.8534 34.8811C25.9743 34.8035 26.0705 34.6928 26.1303 34.5622L35 10M19.9898 25.0102L10.4378 20.2342C10.3072 20.1744 10.1965 20.0782 10.1189 19.9573C10.0413 19.8363 10 19.6957 10 19.5519C10 19.4082 10.0413 19.2675 10.1189 19.1466C10.1965 19.0257 10.3072 18.9295 10.4378 18.8697L35 10"
            stroke={isInputFocused || !!inputValue ? '#4372E5' : '#9D9D9D'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default ChatBar;
