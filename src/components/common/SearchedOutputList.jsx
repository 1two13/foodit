import React, { useEffect, useRef, useState } from 'react';

import SearchedOutput from './SearchedOutput';
// TODO: 임시 API로 추후 수정 예정
import { ERROR_ALERT_MESSAGE, TEMPORARY_SRC, TIMEOUT } from '../../static/constants';
import searchApi from '../../api/searchApi';
import useThrottle from '../../hooks/useThrottle';
import { useQuery } from 'react-query';

function SearchedOutputList({ keyword, category, orderBy, reload, reloadFinishCallback }) {
  const metaRef = useRef({ fetching: true, page: 1, size: 15 });
  const [searchedOutput, setSearchedOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useQuery(
    'searchPost',
    () => searchApi.searchPost(category, orderBy, keyword, metaRef.current.page, metaRef.current.size),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setSearchedOutput(data);
        metaRef.current = { ...metaRef.current, total: data.total, fetching: false };

        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);

        console.warn('fail to search post.', error);
        alert(ERROR_ALERT_MESSAGE);
      },
    },
  );

  useEffect(() => {
    if (!reload || !data) return;

    setIsLoading(true);
    metaRef.current = { ...metaRef.current, total: 0, fetching: true, page: 1 };

    searchApi.searchPost(category, orderBy, keyword, metaRef.current.page, metaRef.current.size).then((data) => {
      setSearchedOutput(data);
      setIsLoading(false);
      metaRef.current = { ...metaRef.current, total: data.total, fetching: false };
      reloadFinishCallback();
    });
  }, [reload, data]);

  const onScrollDropdown = (e) => {
    if (!searchedOutput || searchedOutput.total <= metaRef.current.page * metaRef.current.size) return;

    const { clientHeight, scrollHeight, scrollTop } = e.target;
    if (scrollHeight * 0.8 <= clientHeight + scrollTop) getMoreData();
  };

  const getMoreData = async () => {
    try {
      if (metaRef.current.fetching) return;

      metaRef.current = { ...metaRef.current, fetching: true, page: metaRef.current.page + 1 };

      const data = await searchApi.searchPost(category, orderBy, keyword, metaRef.current.page, metaRef.current.size);

      metaRef.current = { ...metaRef.current, fetching: false };
      setSearchedOutput({ ...searchedOutput, list: [...searchedOutput.list, ...data.list] });
    } catch (error) {
      console.error(ERROR_ALERT_MESSAGE);
      alert(ERROR_ALERT_MESSAGE);
    }
  };

  const throttleScroll = useThrottle(onScrollDropdown, TIMEOUT);

  return (
    <>
      <div className="mx-[16px] mb-[15px] text-[13px]">총 {searchedOutput?.total ?? 0}개</div>
      {!isLoading ? (
        <div
          className="flex flex-col mx-[15px] mb-[27px] overflow-scroll gap-[20px] h-[435px]"
          onScroll={throttleScroll}
        >
          {searchedOutput?.list.map((data, id) => (
            <SearchedOutput
              key={data.id}
              src={TEMPORARY_SRC}
              name={data.name}
              category={data.category}
              location={data.location}
              price={Number(data.price).toLocaleString()}
            />
          ))}
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}

SearchedOutputList.defaultProps = {
  keyword: '',
  category: '전체',
  orderBy: '낮은 가격순',
  reload: false,
  reloadFinishCallback: () => {},
};

export default SearchedOutputList;
