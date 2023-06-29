import React from 'react';

import { useSelector } from 'react-redux';
import FriendProfile from './FriendProfile';

function FriendsProfile() {
  let friendsList = useSelector((state) => state.friends.friendsList);
  let recruteList = JSON.parse(localStorage.getItem('recruteList'));
  let isJoin = JSON.parse(localStorage.getItem('isJoin'));
  console.log(friendsList, recruteList);

  return (
    <div className="mt-[22px] flex items-center pb-[17px] gap-[20px] border-b-[0.5px] border-gray">
      <FriendProfile
        name="동네친구"
        svg={
          <svg
            className="absolute top-[-12px]"
            width="21"
            height="14"
            viewBox="0 0 21 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.17793 14C2.69021 14 2.27363 13.6482 2.19203 13.1673L0.513043 3.27329C0.351153 2.3193 1.50353 1.71447 2.19669 2.38963L5.47154 5.57942C5.94609 6.04164 6.73078 5.92305 7.04755 5.34124L9.62173 0.613146C10.0005 -0.0826294 10.9995 -0.0826298 11.3783 0.613146L13.9525 5.34124C14.2692 5.92305 15.0539 6.04164 15.5285 5.57942L18.8033 2.38963C19.4965 1.71448 20.6488 2.31929 20.487 3.27329L18.808 13.1673C18.7264 13.6482 18.3098 14 17.8221 14H3.17793Z"
              fill="#FFD600"
            />
          </svg>
        }
      />

      {!isJoin
        ? friendsList.map((el, index) => (
            <FriendProfile key={index} name={el ? '모집대기중' : ''} color={el ? '#A4A4A4' : '#F0F0F0'} />
          ))
        : recruteList.map((el, index) => (
            <FriendProfile
              key={index}
              name={el === '파티원' || el === '모집대기중' ? el : ''}
              color={
                el === '파티원'
                  ? index === 0
                    ? '#FF6B00'
                    : index === 1
                    ? '#2572E5'
                    : index === 2
                    ? '#FFD600'
                    : index === 3
                    ? '#EE0707'
                    : '#EE0707'
                  : el === '모집대기중'
                  ? '#A4A4A4'
                  : '#F0F0F0'
              }
            />
          ))}
    </div>
  );
}

export default FriendsProfile;
