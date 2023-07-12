import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { setErrors, setNewNickname } from '../../redux/slices/userInfoChangeSlice';
import { updateNicknameAPI } from '../../redux/api/userInfoUpdateAPI';
import { setNickname } from '../../redux/slices/authSlice';
import { FcCheckmark } from 'react-icons/fc';

function MyProfile({ cameraSvg = '', writingSvg }) {
  const [isEditing, setIsEditing] = useState(false);
  const { newNickname, errors } = useSelector((state) => state.userInfoChange);
  const { user } = useSelector((state) => state.auth);
  const nickname = user.nickname;

  const inputRef = useRef();
  const dispatch = useDispatch();

  /** 닉네임 초기값 렌더링 */
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = nickname;
    }
  }, [nickname]);

  /** 수정모드 토글 */
  const isUpdateMode = () => {
    setIsEditing((prevState) => !prevState);
    if (inputRef.current) {
      inputRef.current.readOnly = !inputRef.current.readOnly;
      inputRef.current.focus();
    }
  };

  /** 닉네임 변경 시도 */
  const handleUpdateNickname = useCallback(() => {
    isUpdateMode();
    dispatch(updateNicknameAPI({ token: user.token, nickname: newNickname }));
    dispatch(setNickname(newNickname));
  }, [dispatch, newNickname]);

  /** 닉네임 유효성 검사 */
  const handleNicknameChange = useCallback(
    debounce((event) => {
      event.preventDefault();
      const { value } = event.target;

      const validationErrors = { ...errors };
      dispatch(setNewNickname(value));
      validationErrors.newNickname = {
        message: value.trim() === '' ? '닉네임을 입력해주세요.' : '',
        isError: value.trim() === '',
      };

      dispatch(setErrors(validationErrors));
    }, 300),
    [dispatch],
  );

  return (
    <div className="mt-[30px] flex flex-col items-center w-[100%] relative">
      {/* <button className="mt-[25px] w-[105px] h-[105px] mb-[18px] rounded-full bg-mainColor">{cameraSvg}</button> */}

      <div className="mt-[30px] w-[100%]">
        <div className="flex flex-col items-center mx-[16px] mb-[20px] pb-[9px] border-b-[0.5px] border-gray">
          <input
            className="text-[16px] font-bold text-center focus:outline-none"
            readOnly={!isEditing}
            ref={inputRef}
            onChange={handleNicknameChange}
          ></input>
        </div>
        <button
          className="text-[20px] float-right mt-[10px] absolute top-[21px] right-[4%]"
          onClick={() => handleUpdateNickname()}
        >
          {isEditing ? <FcCheckmark /> : writingSvg}
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
