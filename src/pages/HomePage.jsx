import React, { useEffect, useState } from 'react';
import { useFetcher, useSearchParams } from 'react-router-dom';

import HomeBar from '../components/common/navBar/HomeBar';
import TabBar from '../components/common/navBar/TabBar';
import ShowCase from '../components/common/ShowCase';
import Favorite from '../components/home/Favorite';
import SearchedOutputList from '../components/common/SearchedOutputList';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const categoryParams = searchParams.get('category') ?? '전체';
  const [category, setCategory] = useState(categoryParams);

  useEffect(() => {
    setCategory(categoryParams);
  }, [categoryParams]);

  return (
    <>
      <HomeBar />
      <ShowCase
        contents={
          <div>
            <Favorite />
            <SearchedOutputList category={categoryParams} reload={category !== categoryParams} />
          </div>
        }
      />
      <TabBar />
    </>
  );
};

export default HomePage;
