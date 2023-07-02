import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

function TextAndBackBar({ title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleMoveBack = () => (location.state?.before ? navigate(location.state.before) : navigate(-1));

  return (
    <>
      <div className="mt-[47px] bg-white z-10">
        <div className="flex">
          <BackButton onClickHandler={handleMoveBack} />
          <h2 className="w-[190px] text-center text-ellipsis line-clamp-1 whitespace-normal overflow-hidden leading-[44px] absolute left-1/2 translate-x-[-50%] font-semibold">
            {title}
          </h2>
        </div>
      </div>
    </>
  );
}

export default TextAndBackBar;
