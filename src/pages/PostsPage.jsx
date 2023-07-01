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

function PostsPage() {
  const categoryImageMap = {
    채소: vegetableGray,
    전체: totalGray,
    과일: fruitGray,
    '수산물/건해산': aquaticGray,
    '쌀/잡곡/견과': riceGray,
    '정육/계란류': meatGray,
    '베이커리/잼': breadGray,
    '친환경/유기농': ecoGray,
    '김치/반찬/델리': kimchiGray,
    '생수/음류/주류': waterGray,
    '면류/통조림': noodlesGray,
    '양념/오일': seasoningGray,
    '과자/간식': snackGray,
    '커피/차/원두': coffeeGray,
    '우유/유제품': milkGray,
  };

  const postId = useParams().postId;
  const navigate = useNavigate();

  // TODO: 2. 홈에서 등록된 글을 확인하는 경우 => 서버에서 가져오는 데이터로 보여주기
  const { isLoading, data: post } = useQuery('post', () => postApi.getPost(postId), {
    refetchOnWindowFocus: false,
    retry: 0,
  });

  if (isLoading) {
    // TODO: 로딩페이지
    return <div>로딩중..</div>;
  }

  const maxPeople = post.peopleCount;
  const imageUrl = post.imageUrl;
  const title = post.title;
  const category = post.selectedCategory;
  const totalAmount = post.totalAmount;
  const textarea = post.textArea;
  const divisionAmount = (totalAmount / maxPeople).toLocaleString();
  const friendsList = post.friendsList;
  const isJoin = post.isJoin;

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
        postApi.joinPost(postId);
        navigate(`/posts/${postId}`);
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
          src={imageUrl ? imageUrl : categoryImageMap[category]}
          className="flex w-[360px] h-[238px] mt-[11px] bg-gray rounded-[15px] cursor-pointer"
        />
      </div>

      <div className="overflow-scroll h-[400px]">
        <div className="mx-[15px]">
          <FriendsProfile friendsList={friendsList} maxPeople={maxPeople} />
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
            <div>{`내 1/${maxPeople} 부담금`}</div>
            <div>{`${divisionAmount}${WON}`}</div>
          </div>

          <div className="flex justify-between px-[13px] pt-[10px] text-[13px] font-medium">
            <div>{`파티원 ${maxPeople - 1}명의 몫`}</div>
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
