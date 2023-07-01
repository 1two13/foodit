import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import SearchedOutput from './SearchedOutput';
// TODO: 임시 API로 추후 수정 예정
import { LoadingContents } from './loading/LoadingContents';
import { ERROR_ALERT_MESSAGE, TIMEOUT } from '../../static/constants';
import searchApi from '../../api/searchApi';
import useThrottle from '../../hooks/useThrottle';
import styled from 'styled-components';
import totalGray from '../../images/totalGray.png';
import fruitGray from '../../images/fruitGray.png';
import vegetableGray from '../../images/vegetableGray.png';
import riceGray from '../../images/riceGray.png';
import meatGray from '../../images/meatGray.png';
import aquaticGray from '../../images/aquaticGray.png';
import milkGray from '../../images/milkGray.png';
import kimchiGray from '../../images/kimchiGray.png';
import waterGray from '../../images/waterGray.png';
import coffeeGray from '../../images/coffeeGray.png';
import noodlesGray from '../../images/noodlesGray.png';
import seasoningGray from '../../images/seasoningGray.png';
import snackGray from '../../images/snackGray.png';
import breadGray from '../../images/breadGray.png';
import ecoGray from '../../images/ecoGray.png';

const Wrapper = styled.div`
  /* 스크롤바 숨기기 */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

function SearchedOutputList({ keyword, category, orderBy, reload, reloadFinishCallback }) {
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

  const categoryMap = categoryList.reduce((acc, v, idx) => ({ ...acc, [v.key]: idx }), {});

  const metaRef = useRef({ fetching: true, page: 0 });
  const [searchedOutput, setSearchedOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useQuery(
    'searchPost',
    () => searchApi.searchPost(categoryMap[category ?? '전체'], orderBy, keyword, metaRef.current.page),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setSearchedOutput(data);
        metaRef.current = { ...metaRef.current, fetching: false };
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);

        console.warn('fail to search post.', error);
        alert(ERROR_ALERT_MESSAGE);
      },
    },
  );

  console.log(searchedOutput, reload);

  useEffect(() => {
    if (!reload) return;

    setIsLoading(true);
    metaRef.current = { ...metaRef.current, fetching: true, page: 0 };

    searchApi.searchPost(categoryMap[category ?? '전체'], orderBy, keyword, metaRef.current.page).then((data) => {
      setSearchedOutput(data);
      setIsLoading(false);
      metaRef.current = { ...metaRef.current, fetching: false };
      reloadFinishCallback();
    });
  }, [reload]);

  const onScrollDropdown = (e) => {
    if (!searchedOutput || searchedOutput.last) return;

    const { clientHeight, scrollHeight, scrollTop } = e.target;
    if (scrollHeight * 0.8 <= clientHeight + scrollTop) getMoreData();
  };

  const getMoreData = async () => {
    try {
      if (metaRef.current.fetching) return;

      metaRef.current = { ...metaRef.current, fetching: true, page: metaRef.current.page + 1 };

      const data = await searchApi.searchPost(
        categoryMap[category ?? '전체'],
        orderBy,
        keyword,
        metaRef.current.page,
        metaRef.current.size,
      );

      metaRef.current = { ...metaRef.current, fetching: false };
      setSearchedOutput({ ...data, content: [...searchedOutput.content, ...data.content] });
    } catch (error) {
      console.error(ERROR_ALERT_MESSAGE);
      alert(ERROR_ALERT_MESSAGE);
    }
  };

  const throttleScroll = useThrottle(onScrollDropdown, TIMEOUT);

  return (
    <>
      <div className="mb-[15px] text-[13px]">총 {searchedOutput?.totalElements ?? 0}개</div>
      {!isLoading ? (
        <Wrapper
          className="flex flex-col mx-[15px] mb-[27px] gap-[20px] h-[555px] overflow-scroll overflow-x-hidden"
          onScroll={throttleScroll}
        >
          {searchedOutput?.content.map((data) => (
            <SearchedOutput
              key={data.id}
              postId={data.id}
              src={data.imageUrl ?? categoryList[data.categoryId].image}
              name={data.title}
              category={categoryList[data.categoryId].key}
              location={data.address}
              price={Number(data.count).toLocaleString()}
            />
          ))}
        </Wrapper>
      ) : (
        <LoadingContents />
      )}
    </>
  );
}

SearchedOutputList.defaultProps = {
  keyword: '',
  category: '전체',
  orderBy: 'countAsc',
  reload: false,
  reloadFinishCallback: () => {},
};

export default SearchedOutputList;
