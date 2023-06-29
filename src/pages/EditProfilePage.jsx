import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MyProfile from '../components/common/MyProfile';
import LongButton from '../components/common/LongButton';
import TextAndBackBar from '../components/common/navBar/TextAndBackBar';
import IdPasswordForm from '../components/common/IdPasswordForm';

import { EDIT, CHANGE_INFO } from '../static/constants';

function EditProfilePage() {
  const inputFields = [
    { id: 'email', label: '아이디', type: 'email' },
    { id: 'password', label: '비밀번호', type: 'password' },
    { id: 'passwordCheck', label: '비밀번호 재확인', type: 'password' },
  ];

  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errors, setErrors] = useState({
    email: { message: '', isError: false },
    password: { message: '', isError: false },
    passwordCheck: { message: '', isError: false },
  });

  // 유효성 검사
  const validateField = (name, value) => {
    const validationErrors = { ...errors };

    if (name === 'password') {
      setPassword(value);
      validationErrors.password = {
        message:
          value.trim() === '' ? '' : value.length < 8 || value.length > 16 ? '8~16자리의 비밀번호를 입력해주세요.' : '',
        isError: value.trim() === '' || value.length < 8 || value.length > 16,
      };
    } else if (name === 'passwordCheck') {
      setPasswordCheck(value);
      validationErrors.passwordCheck = {
        message: value.trim() === '' ? '' : value !== password ? '비밀번호가 틀렸습니다. 다시 입력해주세요.' : '',
        isError: value.trim() === '' || value !== password,
      };
    }

    setErrors(validationErrors);
  };

  // 유효성검사 확인 후 폼제출
  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};
    Object.keys(errors).forEach((key) => {
      if (validationErrors[key] === undefined) {
        validationErrors[key] = errors[key];
      }
    });
    setErrors(validationErrors);

    const isFormValid = Object.values(validationErrors).every((error) => !error.isError);
    if (isFormValid) {
      setPassword('');
      setPasswordCheck('');
      setErrors({});
      navigate('/myPage');
    }
  };

  return (
    <div>
      <TextAndBackBar title={CHANGE_INFO} />
      <MyProfile />

      <form className="flex flex-wrap justify-center">
        <div className="flex flex-wrap w-[360px]">
          {/* TODO: 아이디의 경우 저장된 아이디 값 보여주기 */}
          {inputFields.slice(0, 3).map((field) => (
            <React.Fragment key={field.id}>
              <IdPasswordForm
                key={field.id}
                label={field.label}
                type={field.type}
                value={field.id}
                color={errors[field.id].isError ? '#ff0000' : '#d9d9d9'}
                onChange={(event) => validateField(field.id, event.target.value)}
                errors={errors[field.id].isError ? errors[field.id] : ''}
                readOnly={field.id === 'email' ? 'readOnly' : ''}
              />
            </React.Fragment>
          ))}
        </div>
      </form>

      {/* TODO: 수정된 값으로 정보 변경하기 */}
      <LongButton contents={EDIT} onClick={handleSubmit} />
    </div>
  );
}

export default EditProfilePage;
