import React, { useEffect, useState } from 'react';

import HomeBar from '../components/common/navBar/HomeBar';
import TabBar from '../components/common/navBar/TabBar';
import ShowCase from '../components/common/ShowCase';
import Favorite from '../components/home/Favorite';
import SearchedOutputList from '../components/common/SearchedOutputList';

const HomePage = () => {
  const searchedOutputList = [
    {
      id: 1,
      name: '전체',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '전체',
    },
    {
      id: 2,
      name: '과일',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '과일',
    },
    {
      id: 3,
      name: '채소',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '채소',
    },
    {
      id: 4,
      name: '쌀/잡곡/견과',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '쌀/잡곡/견과',
    },
    {
      id: 5,
      name: '정육/계란류',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '정육/계란류',
    },
    {
      id: 6,
      name: '수산물/건해산',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '수산물/건해산',
    },
    {
      id: 7,
      name: '우유/유제품',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '우유/유제품',
    },
    {
      id: 8,
      name: '김치/반찬/델리',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '김치/반찬/델리',
    },
    {
      id: 100,
      name: '김치/반찬/델리',
      location: '서울시 서초구 서초대로',
      price: '15000',
      category: '김치/반찬/델리',
    },
    {
      id: 9,
      name: '생수/음료/주류',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '생수/음료/주류',
    },
    {
      id: 10,
      name: '커피/차/원두',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '커피/차/원두',
    },
    {
      id: 11,
      name: '면류/통조림',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '면류/통조림',
    },
    {
      id: 12,
      name: '양념/오일',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '양념/오일',
    },
    {
      id: 13,
      name: '과자/간식',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '과자/간식',
    },
    {
      id: 14,
      name: '베이커리/잼',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '베이커리/잼',
    },
    {
      id: 15,
      name: '친환경/유기농',
      location: '서울시 서초구 서초대로',
      price: '20000',
      category: '친환경/유기농',
    },
  ];
  const [data, setData] = useState(searchedOutputList);

  useEffect(() => {
    // TODO:  fetch로 전체 데이터 가져오기
  }, []);

  return (
    <>
      <HomeBar />
      <ShowCase
        contents={
          <div>
            <Favorite />
            {/* TODO: 선택된 즐겨찾기에 해당하는 값 fetch로 가져오고, data에 담아서 넘겨주기 */}
            <SearchedOutputList searchedOutputList={data} />
          </div>
        }
      />
      <TabBar />
    </>
  );
};

export default HomePage;
