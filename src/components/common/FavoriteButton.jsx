import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FavoriteButton = ({ category, src, isSelected, selectCallback }) => {
  const navigate = useNavigate();

  const onMoveToCategories = () => {
    if (!category) {
      navigate('/favorite-categories');
    } else {
      const tempCategory = category.split('\n').join('/');
      navigate(`/?category=${tempCategory}`);
      /** TODO: 클릭한 카테고리 리스트 뿌려주는 로직 작성 */
      console.log('리스트 출력!', tempCategory);
      selectCallback(category);
    }
  };

  return (
    <div onClick={onMoveToCategories} className="flex flex-col items-center w-[1/5px] cursor-pointer">
      <button>
        {!category ? (
          <div className="w-[35px] h-[35px] m-[10px] bg-gray rounded-full border-none flex justify-center items-center overflow-hidden">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.7916 7.45832H9.54163V1.20832C9.54163 0.932056 9.43188 0.667104 9.23653 0.471754C9.04118 0.276403 8.77623 0.166656 8.49996 0.166656C8.22369 0.166656 7.95874 0.276403 7.76339 0.471754C7.56804 0.667104 7.45829 0.932056 7.45829 1.20832V7.45832H1.20829C0.932025 7.45832 0.667074 7.56807 0.471723 7.76342C0.276373 7.95877 0.166626 8.22372 0.166626 8.49999C0.166626 8.77626 0.276373 9.04121 0.471723 9.23656C0.667074 9.43191 0.932025 9.54166 1.20829 9.54166H7.45829V15.7917C7.45829 16.0679 7.56804 16.3329 7.76339 16.5282C7.95874 16.7236 8.22369 16.8333 8.49996 16.8333C8.77623 16.8333 9.04118 16.7236 9.23653 16.5282C9.43188 16.3329 9.54163 16.0679 9.54163 15.7917V9.54166H15.7916C16.0679 9.54166 16.3328 9.43191 16.5282 9.23656C16.7235 9.04121 16.8333 8.77626 16.8333 8.49999C16.8333 8.22372 16.7235 7.95877 16.5282 7.76342C16.3328 7.56807 16.0679 7.45832 15.7916 7.45832Z"
                fill="white"
              />
            </svg>
          </div>
        ) : (
          <img src={src} alt="즐겨찾는 카테고리" className="w-[48px] h-[48px] mb-[4px]" />
        )}
      </button>
      <div
        className={`${isSelected ? 'font-bold' : ''} text-center text-[13px]`}
        style={{ color: category ? '#000' : '#D9D9D9', whiteSpace: 'pre-wrap' }}
      >
        {category ? category : '추가'}
      </div>
    </div>
  );
};

export default FavoriteButton;
