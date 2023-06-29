import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import BackButton from '../components/common/navBar/BackButton';
import FriendsProfile from '../components/common/FriendsProfile';
import { friendsSlice } from '../redux/slices/friendsSlice';

import { JOIN_ALERT, CONFIRM, CANCEL, SUM, WON, DIVISION, ACTUAL_PAYMENT_AMOUNT, JOIN } from '../static/constants';

function PostsPage() {
  const dispatch = useDispatch();

  const imageUrl = JSON.parse(localStorage.getItem('imageUrl'));
  const title = JSON.parse(localStorage.getItem('title'));
  const category = JSON.parse(localStorage.getItem('category'));
  const totalAmount = JSON.parse(localStorage.getItem('totalAmount'));
  const maxPeople = JSON.parse(localStorage.getItem('maxPeople'));
  const textarea = JSON.parse(localStorage.getItem('textarea'));
  const divisionAmount = (totalAmount / (maxPeople + 1)).toLocaleString();

  let friendsList = useSelector((state) => state.friends.friendsList);
  friendsList = friendsList.map((el, idx) => (idx < maxPeople ? (el = true) : (el = false)));
  let recruteList = useSelector((state) => state.friends.recruteList);
  recruteList = friendsList.map((el) => (el ? (el = '모집대기중') : ''));

  useEffect(() => {
    dispatch(friendsSlice.actions.setFriendsList(friendsList));
    dispatch(friendsSlice.actions.setRecruteList(recruteList));
  }, []);

  const joinAsMember = () => {
    Swal.fire({
      text: JOIN_ALERT,
      showCancelButton: true,
      confirmButtonColor: '#39B54A',
      cancelButtonColor: '#CCCCCC',
      confirmButtonText: CONFIRM,
      cancelButtonText: CANCEL,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('isJoin', true);
        localStorage.setItem('recruteList', JSON.stringify(recruteList));

        const index = recruteList.findIndex((item) => item === '모집대기중');

        if (index !== -1) {
          recruteList[index] = '파티원';
          localStorage.setItem('recruteList', JSON.stringify(recruteList));

          let test = JSON.parse(localStorage.getItem('recruteList'));
          dispatch(friendsSlice.actions.setRecruteList(test));
        }
      }
    });
  };

  let isJoin = JSON.parse(localStorage.getItem('isJoin'));

  return (
    <div className="">
      <div className="w-[100%] mt-[47px]">
        <BackButton />
      </div>

      <div className="flex justify-center">
        <img
          alt=""
          src={imageUrl}
          className="flex w-[360px] h-[238px] mt-[11px] bg-gray rounded-[15px] cursor-pointer"
        />
      </div>

      <div className="overflow-scroll h-[400px]">
        <div className="mx-[15px]">
          <FriendsProfile />
        </div>
        <div className="mt-[15px] mx-[15px] mb-[3px] text-[16px] font-semibold">{title}</div>
        <div className="mx-[15px] text-[10px] text-smokeGray">{category}</div>
        <div className="pt-[34px] mb-[26px] mx-[15px] text-[13px]">{textarea}</div>

        <div className="w-[360px] h-[200px] p-[14px] mx-[15px] mb-[93px] rounded-[10px] bg-hexGray">
          <div className="w-[332px] h-[113px] p-[13px] rounded-[10px] bg-white font-medium text-[13px]">
            <div className="flex justify-between pb-[13px] border-b-[0.5px] border-gray font-medium">
              <div>{SUM}</div>
              <div>
                <div>{`${totalAmount.toLocaleString()}${WON}`}</div>
                <div className="float-right">{DIVISION}</div>
              </div>
            </div>

            <div className="flex justify-between items-center h-[47px] font-bold text-[16px] text-mainColor">
              <div>{ACTUAL_PAYMENT_AMOUNT}</div>
              <div>{`${divisionAmount}${WON}`}</div>
            </div>
          </div>

          <div className="flex justify-between px-[13px] pt-[10px] text-[13px] font-medium">
            <div>{`내 1/${maxPeople + 1} 부담금`}</div>
            <div>{`${divisionAmount}${WON}`}</div>
          </div>

          <div className="flex justify-between px-[13px] pt-[10px] text-[13px] font-medium">
            <div>{`파티원 ${maxPeople}명의 몫`}</div>
            <div>{`${(totalAmount - totalAmount / maxPeople).toLocaleString()}${WON}`}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-[100%] h-[107px] px-[15px] pt-[18px] fixed bottom-0 border-t-[0.2px] border-gray bg-white">
        <div className="flex flex-col h-[50px]">
          <div className="text-[10px] text-smokeGray">{`${SUM} ${totalAmount.toLocaleString()}${WON}`}</div>
          <div className="font-bold text-[16px] text-mainColor">{`${ACTUAL_PAYMENT_AMOUNT} ${divisionAmount}${WON}`}</div>
        </div>
        <button
          onClick={joinAsMember}
          className={`w-[133px] h-[36px] rounded-[5px] text-white text-[13px] ${
            isJoin ? 'bg-smokeGray' : 'bg-mainColor'
          }`}
          disabled={isJoin}
        >
          {JOIN}
        </button>
      </div>
    </div>
  );
}

export default PostsPage;
