import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import MyProfile from '../components/common/MyProfile';
import LongButton from '../components/common/LongButton';
import TextAndBackBar from '../components/common/navBar/TextAndBackBar';
import IdPasswordForm from '../components/common/IdPasswordForm';

import { EDIT, CHANGE_INFO } from '../static/constants';
import {
  resetFields,
  setErrors,
  setNewPassword,
  setNewPasswordCheck,
  updatePasswordFailure,
  updatePasswordStart,
  updatePasswordSuccess,
} from '../redux/slices/userInfoChangeSlice';

function EditProfilePage() {
  const inputFields = [
    { id: 'email', label: '아이디', type: 'email' },
    { id: 'newPassword', label: '비밀번호', type: 'password' },
    { id: 'newPasswordCheck', label: '비밀번호 재확인', type: 'password' },
  ];
  const { newPassword, newPasswordCheck, errors } = useSelector((state) => state.userInfoChange);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // TODO: 서버에서 가져온 데이터로 추후 변경
  const email = localStorage.getItem('signup-email');

  // 유효성 검사
  const validateField = useCallback(
    debounce((name, value) => {
      const validationErrors = { ...errors };

      if (name === 'newPassword') {
        dispatch(setNewPassword(value));
        validationErrors.newPassword = {
          message:
            value.trim() === ''
              ? ''
              : value.length < 8 || value.length > 16
              ? '8~16자리의 비밀번호를 입력해주세요.'
              : '',
          isError: value.trim() === '' || value.length < 8 || value.length > 16,
        };
      } else if (name === 'newPasswordCheck') {
        dispatch(setNewPasswordCheck(value));
        validationErrors.newPasswordCheck = {
          message: value.trim() === '' ? '' : value !== newPassword ? '비밀번호가 틀렸습니다. 다시 입력해주세요.' : '',
          isError: value.trim() === '' || value !== newPassword,
        };
      }

      dispatch(setErrors(validationErrors));
    }, 300),
    [errors, newPassword, newPasswordCheck, dispatch],
  );

  /** 비밀번호 변경 */
  const updatePassword = () => {
    return async (dispatch) => {
      try {
        dispatch(updatePasswordStart());
        await dispatch(updatePasswordSuccess({ newPassword }));
        alert('비밀번호 변경이 완료되었습니다.');
        dispatch(resetFields());
        navigate('/myPage');
      } catch (error) {
        dispatch(updatePasswordFailure(error.message));
      }
    };
  };

  /** 유효성검사 확인 후 폼제출 */
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    Object.keys(errors).forEach((key) => {
      if (validationErrors[key] === undefined) {
        validationErrors[key] = errors[key];
      }
    });
    dispatch(setErrors(validationErrors));

    const isFormValid = Object.values(validationErrors).every((error) => !error.isError);

    if (isFormValid) {
      dispatch(updatePassword());
      console.log('클릭');
    }
  };

  return (
    <div>
      <TextAndBackBar title={CHANGE_INFO} />
      <MyProfile />

      <form className="flex flex-wrap justify-center">
        <div className="flex flex-wrap w-[360px]">
          {inputFields.slice(0, 3).map((field) => (
            <React.Fragment key={field.id}>
              <IdPasswordForm
                key={field.id}
                label={field.label}
                type={field.type}
                value={field.id === 'email' ? email : null}
                color={errors[field.id] && errors[field.id].isError ? '#ff0000' : '#d9d9d9'}
                onChange={(event) => validateField(field.id, event.target.value)}
                errors={errors[field.id] && errors[field.id].isError ? errors[field.id] : ''}
                readOnly={field.id === 'email' ? 'readOnly' : ''}
              />
            </React.Fragment>
          ))}
        </div>
      </form>
      <LongButton contents={EDIT} onClick={handleSubmit} />
    </div>
  );
}

export default EditProfilePage;
