import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import LongButton from '../components/common/LongButton';
import Input from '../components/writingPage/Input';
import BackButton from '../components/common/navBar/BackButton';
import postApi from '../api/postApi';

import { ADD_IMAGE, ARTICLE_TITLE, DONE, MAXIMUM_PEOPLE, PLEASE_WRITE_TEXT, TOTAL_AMOUNT } from '../static/constants';
import { useSelector } from 'react-redux';

function WritingPage() {
  const options = [
    // TODO: 하드코딩된 값 constants로 추후 변경 예정
    { value: '전체', label: '전체', categoryId: 0 },
    { value: '과일', label: '과일', categoryId: 1 },
    { value: '채소', label: '채소', categoryId: 2 },
    { value: '쌀/잡곡/견과', label: '쌀/잡곡/견과', categoryId: 3 },
    { value: '정육/계란류', label: '정육/계란류', categoryId: 4 },
    { value: '수산물/건해산', label: '수산물/건해산', categoryId: 5 },
    { value: '우유/유제품', label: '우유/유제품', categoryId: 6 },
    { value: '김치/반찬/델리', label: '김치/반찬/델리', categoryId: 7 },
    { value: '생수/음료/주류', label: '생수/음료/주류', categoryId: 8 },
    { value: '커피/차/원두', label: '커피/차/원두', categoryId: 9 },
    { value: '면류/통조림', label: '면류/통조림', categoryId: 10 },
    { value: '양념/오일', label: '양념/오일', categoryId: 11 },
    { value: '과자/간식', label: '과자/간식', categoryId: 12 },
    { value: '베이커리/잼', label: '베이커리/잼', categoryId: 13 },
    { value: '친환경/유기농', label: '친환경/유기농', categoryId: 14 },
  ];
  const min = 1;
  const max = 4;

  const imgRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [post, setPost] = useState({
    title: '',
    limit: 1,
    count: 0,
    content: '',
    imageUrl: null,
    image: null,
    category: options[0],
  });

  const addImages = () => imgRef.current?.click();
  const removeImage = () => setPost({ ...post, imageUrl: null, image: null });
  const onChangeImage = (e) => {
    const files = e.target.files[0];
    const reader = new FileReader();

    if (files === undefined) return;

    reader.readAsDataURL(files);
    reader.onload = () => {
      setPost({ ...post, imageUrl: reader.result, image: files });
    };
  };

  const onChangeTitle = (e) => {
    setPost({ ...post, title: e.target.value });
  };

  const onChangeCategory = (e) => {
    setPost({ ...post, category: options.find((o) => o.value === e.value) });
  };

  const onChangeTotalAmount = (e) => {
    const count = e.target.value;

    if (!/^[0-9]*$/.test(count)) e.target.value = '';
    else setPost({ ...post, count: Number(count) });
  };

  const decreaseCount = () => {
    const newCount = Math.max(post.limit - 1, min);
    setPost({ ...post, limit: newCount });
  };

  const increaseCount = () => {
    const newCount = Math.min(post.limit + 1, max);
    setPost({ ...post, limit: newCount });
  };

  const onChangeTextarea = (e) => {
    setPost({ ...post, content: e.target.value });
  };

  const onclickDoneButton = async () => {
    // TODO: 작성한 글 데이터를 서버로 보내기, catch 및 로딩 넣기
    const postId = await postApi.writePost(
      {
        title: post.title,
        limit: post.limit + 1,
        count: post.count,
        content: post.content,
        categoryId: post.category.categoryId,
        addressId: 1, // user.address
      },
      user,
      post.image,
    );
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="top-bar mt-[47px] h-full flex flex-col">
      <BackButton />
      <div className="flex-1 overflow-scroll">
        <div className="flex justify-center relative">
          {post.imageUrl ? (
            <button
              onClick={removeImage}
              className="absolute top-[20px] right-[25px] flex items-center justify-center h-[32px] w-[32px] rounded-full bg-[black] opacity-[60%] z-[999]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.6857 12.6573L8.02886 7.00048L13.6857 1.34362C13.8221 1.20723 13.8987 1.02225 13.8987 0.829365C13.8987 0.63648 13.8221 0.451495 13.6857 0.315104C13.5493 0.178715 13.3643 0.102091 13.1715 0.102091C12.9786 0.102091 12.7936 0.178715 12.6572 0.315105L7.00034 5.97196L1.34348 0.315104C1.20709 0.178714 1.02211 0.102091 0.829224 0.102091C0.636339 0.102091 0.451354 0.178714 0.314964 0.315104C0.245591 0.379402 0.190806 0.457824 0.154302 0.545084C0.117798 0.632344 0.100422 0.726415 0.103345 0.820958C0.10627 0.915501 0.129426 1.00832 0.171253 1.09316C0.21308 1.17799 0.272605 1.25288 0.34582 1.31277L6.00267 6.96962L0.314964 12.6573C0.178574 12.7937 0.101951 12.9787 0.101951 13.1716C0.10195 13.3645 0.178574 13.5495 0.314964 13.6859C0.451355 13.8222 0.636339 13.8989 0.829224 13.8989C1.02211 13.8989 1.20709 13.8222 1.34348 13.6859L7.00034 8.029L12.6572 13.6859C12.7936 13.8222 12.9786 13.8989 13.1715 13.8989C13.3643 13.8989 13.5493 13.8222 13.6857 13.6859C13.8221 13.5495 13.8987 13.3645 13.8987 13.1716C13.8987 12.9787 13.8221 12.7937 13.6857 12.6573Z"
                  fill="white"
                />
              </svg>
            </button>
          ) : (
            ''
          )}
          <div
            className="flex items-center justify-center w-[360px] h-[238px] mt-[11px] bg-gray rounded-[15px] cursor-pointer"
            onClick={addImages}
            onChange={onChangeImage}
          >
            <button className="flex flex-col items-center text-[13px] text-darkGray">
              <input type="file" className="hidden" multiple accept="image/png, image/jpg, image/jpeg" ref={imgRef} />
              {post.imageUrl && (
                <img
                  alt=""
                  src={post.imageUrl}
                  className="w-[360px] h-[238px] rounded-[15px] z-[50] absolute top-[10px]"
                />
              )}
              <div className="flex flex-col top-[177px]">
                <svg
                  width="76"
                  height="68"
                  viewBox="0 0 76 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-[20px]"
                >
                  <path
                    d="M8 8H19.25L26.75 0.5H49.25L56.75 8H68C69.9891 8 71.8968 8.79018 73.3033 10.1967C74.7098 11.6032 75.5 13.5109 75.5 15.5V60.5C75.5 62.4891 74.7098 64.3968 73.3033 65.8033C71.8968 67.2098 69.9891 68 68 68H8C6.01088 68 4.10322 67.2098 2.6967 65.8033C1.29018 64.3968 0.5 62.4891 0.5 60.5V15.5C0.5 13.5109 1.29018 11.6032 2.6967 10.1967C4.10322 8.79018 6.01088 8 8 8ZM38 19.25C33.0272 19.25 28.2581 21.2254 24.7417 24.7417C21.2254 28.2581 19.25 33.0272 19.25 38C19.25 42.9728 21.2254 47.7419 24.7417 51.2583C28.2581 54.7746 33.0272 56.75 38 56.75C42.9728 56.75 47.7419 54.7746 51.2583 51.2583C54.7746 47.7419 56.75 42.9728 56.75 38C56.75 33.0272 54.7746 28.2581 51.2583 24.7417C47.7419 21.2254 42.9728 19.25 38 19.25ZM38 26.75C40.9837 26.75 43.8452 27.9353 45.955 30.045C48.0647 32.1548 49.25 35.0163 49.25 38C49.25 40.9837 48.0647 43.8452 45.955 45.955C43.8452 48.0647 40.9837 49.25 38 49.25C35.0163 49.25 32.1548 48.0647 30.045 45.955C27.9353 43.8452 26.75 40.9837 26.75 38C26.75 35.0163 27.9353 32.1548 30.045 30.045C32.1548 27.9353 35.0163 26.75 38 26.75Z"
                    fill="#9D9D9D"
                  />
                </svg>
                {ADD_IMAGE}
              </div>
            </button>
          </div>
        </div>

        <Input placeholder={ARTICLE_TITLE} onChange={onChangeTitle} />

        <div className="mx-[15px] py-[15px] text-red border-b-[0.5px] border-gray">
          <Select defaultValue={post.category} options={options} onChange={onChangeCategory} />
        </div>

        <Input placeholder={TOTAL_AMOUNT} onChange={onChangeTotalAmount} />

        <div className="flex justify-between py-[15px] mx-[15px] text-[13px] text-darkGray border-b-[0.5px] border-gray">
          <div className="flex items-center">{MAXIMUM_PEOPLE}</div>
          <div className="flex">
            <button onClick={decreaseCount}>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.9167 0H2.08333C1.5308 0 1.00089 0.219493 0.610194 0.610194C0.219493 1.00089 0 1.5308 0 2.08333V22.9167C0 23.4692 0.219493 23.9991 0.610194 24.3898C1.00089 24.7805 1.5308 25 2.08333 25H22.9167C23.4692 25 23.9991 24.7805 24.3898 24.3898C24.7805 23.9991 25 23.4692 25 22.9167V2.08333C25 1.5308 24.7805 1.00089 24.3898 0.610194C23.9991 0.219493 23.4692 0 22.9167 0ZM19.7917 13.5417H5.20833C4.93207 13.5417 4.66711 13.4319 4.47176 13.2366C4.27641 13.0412 4.16667 12.7763 4.16667 12.5C4.16667 12.2237 4.27641 11.9588 4.47176 11.7634C4.66711 11.5681 4.93207 11.4583 5.20833 11.4583H19.7917C20.0679 11.4583 20.3329 11.5681 20.5282 11.7634C20.7236 11.9588 20.8333 12.2237 20.8333 12.5C20.8333 12.7763 20.7236 13.0412 20.5282 13.2366C20.3329 13.4319 20.0679 13.5417 19.7917 13.5417Z"
                  fill="#A4A4A4"
                />
              </svg>
            </button>
            <div className="flex justify-center items-center w-[63px] mx-[10px]">{post.limit}</div>
            <button onClick={increaseCount}>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.9167 0H2.08333C1.5308 0 1.00089 0.219493 0.610194 0.610194C0.219493 1.00089 0 1.5308 0 2.08333V22.9167C0 23.4692 0.219493 23.9991 0.610194 24.3898C1.00089 24.7805 1.5308 25 2.08333 25H22.9167C23.4692 25 23.9991 24.7805 24.3898 24.3898C24.7805 23.9991 25 23.4692 25 22.9167V2.08333C25 1.5308 24.7805 1.00089 24.3898 0.610194C23.9991 0.219493 23.4692 0 22.9167 0ZM19.7917 13.5417H13.5417V19.7917C13.5417 20.0679 13.4319 20.3329 13.2366 20.5282C13.0412 20.7236 12.7763 20.8333 12.5 20.8333C12.2237 20.8333 11.9588 20.7236 11.7634 20.5282C11.5681 20.3329 11.4583 20.0679 11.4583 19.7917V13.5417H5.20833C4.93207 13.5417 4.66711 13.4319 4.47176 13.2366C4.27641 13.0412 4.16667 12.7763 4.16667 12.5C4.16667 12.2237 4.27641 11.9588 4.47176 11.7634C4.66711 11.5681 4.93207 11.4583 5.20833 11.4583H11.4583V5.20833C11.4583 4.93207 11.5681 4.66711 11.7634 4.47176C11.9588 4.27641 12.2237 4.16667 12.5 4.16667C12.7763 4.16667 13.0412 4.27641 13.2366 4.47176C13.4319 4.66711 13.5417 4.93207 13.5417 5.20833V11.4583H19.7917C20.0679 11.4583 20.3329 11.5681 20.5282 11.7634C20.7236 11.9588 20.8333 12.2237 20.8333 12.5C20.8333 12.7763 20.7236 13.0412 20.5282 13.2366C20.3329 13.4319 20.0679 13.5417 19.7917 13.5417Z"
                  fill="#A4A4A4"
                />
              </svg>
            </button>
          </div>
        </div>
        <textarea
          placeholder={PLEASE_WRITE_TEXT}
          onChange={onChangeTextarea}
          className="w-[92%] h-[150px] py-[20px] mx-[15px] focus:outline-none text-[13px] text-darkGray"
        />

        {post.title.length === 0 || post.count === 0 || !post.content ? (
          <LongButton contents={DONE} background={'#CCCCCC'} customStyle={'disabled'} />
        ) : (
          <LongButton contents={DONE} onClick={onclickDoneButton} />
        )}
      </div>
    </div>
  );
}

export default WritingPage;
