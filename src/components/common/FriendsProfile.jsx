import React from 'react';
import FriendProfile from './FriendProfile';

function FriendsProfile({ friendsList, maxPeople }) {
  const colorMap = {
    0: '#39B54A',
    1: '#FF6B00',
    2: '#2572E5',
    3: '#FFD600',
    4: '#EE0707',
  };

  return (
    <div className="mt-[22px] flex items-center pb-[17px] gap-[20px] border-b-[0.5px] border-gray">
      {
        // 참여자
        friendsList.map((friend, index) => (
          <FriendProfile
            key={friend.id}
            name={friend.nickname}
            svg={
              index === 0 ? (
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
              ) : null
            }
            color={index === 0 ? null : colorMap[index]}
          />
        ))
      }
      {
        // 모집중
        [...Array(maxPeople - friendsList.length)].map((_, index) => (
          <FriendProfile key={index} name="모집중" color="#A4A4A4" />
        ))
      }
      {
        // 공란
        [...Array(5 - maxPeople)].map((_, index) => (
          <FriendProfile key={index} color="#F0F0F0" />
        ))
      }
    </div>
  );
}

export default FriendsProfile;
