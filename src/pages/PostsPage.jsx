import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

import BackButton from '../components/common/navBar/BackButton';
import FriendsProfile from '../components/common/FriendsProfile';
import postApi from '../api/postApi';

import totalGray from '../images/totalGray.png';
import aquaticGray from '../images/aquaticGray.png';
import breadGray from '../images/breadGray.png';
import ecoGray from '../images/ecoGray.png';
import fruitGray from '../images/fruitGray.png';
import kimchiGray from '../images/kimchiGray.png';
import meatGray from '../images/meatGray.png';
import milkGray from '../images/milkGray.png';
import waterGray from '../images/waterGray.png';
import noodlesGray from '../images/noodlesGray.png';
import riceGray from '../images/riceGray.png';
import seasoningGray from '../images/seasoningGray.png';
import snackGray from '../images/snackGray.png';
import vegetableGray from '../images/vegetableGray.png';
import coffeeGray from '../images/coffeeGray.png';

import { ACTUAL_PAYMENT_AMOUNT, CANCEL, CONFIRM, DIVISION, JOIN, JOIN_ALERT, SUM, WON } from '../static/constants';
import { useSelector } from 'react-redux';
import { LoadingContents } from '../components/common/loading/LoadingContents';

function PostsPage() {
  const categoryList = [
    { key: '전체', image: totalGray },
    { key: '과일', image: fruitGray },
    { key: '채소', image: vegetableGray },
    { key: '쌀/잡곡/견과', image: riceGray },
    { key: '정육/계란류', image: meatGray },
    { key: '수산물/건해산', image: aquaticGray },
    { key: '우유/유제품', image: milkGray },
    { key: '김치/반찬/델리', image: kimchiGray },
    { key: '생수/음료/주류', image: waterGray },
    { key: '커피/차/원두', image: coffeeGray },
    { key: '면류/통조림', image: noodlesGray },
    { key: '양념/오일', image: seasoningGray },
    { key: '과자/간식', image: snackGray },
    { key: '베이커리/잼', image: breadGray },
    { key: '친환경/유기농', image: ecoGray },
  ];

  const postId = useParams().postId;
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // TODO: 2. 홈에서 등록된 글을 확인하는 경우 => 서버에서 가져오는 데이터로 보여주기
  const {
    isLoading,
    data: post,
    refetch,
  } = useQuery('post', () => postApi.getPost(postId), {
    refetchOnWindowFocus: false,
    retry: 0,
  });

  if (isLoading) {
    return <LoadingContents />;
  }

  const maxPeople = post.limit;
  const imageUrl = post.imageUrl;
  const title = post.title;
  const category = categoryList[post.categoryId];
  const totalAmount = post.count;
  const textarea = post.content;
  const divisionAmount = (totalAmount / maxPeople).toLocaleString();
  const friendsList = post.participants;
  const isJoin = !!friendsList.find((friend) => friend.id === user?.id);

  const joinAsMember = () => {
    Swal.fire({
      text: JOIN_ALERT,
      showCancelButton: true,
      confirmButtonColor: '#39B54A',
      cancelButtonColor: '#CCCCCC',
      confirmButtonText: CONFIRM,
      cancelButtonText: CANCEL,
      reverseButtons: true,
    }).then(async (result) => {
      if (!user?.id) {
        navigate('/signin');
        return;
      }

      if (result.isConfirmed && !isJoin) {
        await postApi.joinPost(postId, user.token);
        refetch();
      }
    });
  };

  const clearData = () => navigate('/');

  return (
    <div className="">
      <div className="w-[100%] mt-[47px]">
        <BackButton onClickHandler={clearData} />
      </div>

      <div className="flex justify-center">
        {/* TODO: map 데이터로 보여주기 */}
        <img
          alt=""
          // TODO: 정확한 사진이 올라가는지 추후 확인 필요
          src={imageUrl ? imageUrl : category.image}
          className="flex w-[360px] h-[238px] mt-[11px] bg-gray rounded-[15px] cursor-pointer"
        />
      </div>

      <div className="overflow-scroll h-[400px]">
        <div className="mx-[15px]">
          <FriendsProfile friendsList={friendsList} maxPeople={maxPeople} />
        </div>
        <div className="mt-[15px] mx-[15px] mb-[3px] text-[16px] font-semibold">{title}</div>
        <div className="mx-[15px] text-[10px] text-smokeGray">{category.key}</div>
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
            <div>{`내 1/${maxPeople} 부담금`}</div>
            <div>{`${divisionAmount}${WON}`}</div>
          </div>

          <div className="flex justify-between px-[13px] pt-[10px] text-[13px] font-medium">
            <div>{`파티원 ${maxPeople - 1}명의 몫`}</div>
            <div>{`${(totalAmount - totalAmount / maxPeople).toLocaleString()}${WON}`}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-[390px] h-[107px] px-[15px] pt-[18px] fixed bottom-0 border-t-[0.2px] border-gray bg-white">
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
