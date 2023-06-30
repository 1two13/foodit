import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FcCheckmark } from 'react-icons/fc';
import { debounce } from 'lodash';
import {
  setErrors,
  setNewNickname,
  updateNicknameFailure,
  updateNicknameStart,
  updateNicknameSuccess,
} from '../../redux/slices/userInfoChangeSlice';

function MyProfile({ cameraSvg = '', writingSvg }) {
  const [isEditing, setIsEditing] = useState(false);
  const { newNickname, errors } = useSelector((state) => state.userInfoChange);

  /** TODO: 서버에서 가져온 데이터로 추후 변경 */
  const nickname = localStorage.getItem('signup-nickname');
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
  const updateNickname = useCallback(async () => {
    isUpdateMode();

    try {
      dispatch(updateNicknameStart());
      await dispatch(updateNicknameSuccess({ newNickname }));
    } catch (error) {
      dispatch(updateNicknameFailure(error.message));
    }
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
          onClick={() => updateNickname()}
        >
          {isEditing ? <FcCheckmark /> : writingSvg}
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
