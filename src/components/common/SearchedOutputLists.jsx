import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import SearchedOutput from './SearchedOutput';
// TODO: 임시 API로 추후 수정 예정
import testApi from '../../api/testApi';
import useThrottle from '../../hooks/useThrottle';
import useCustomQuery from '../../hooks/useCustomQuery';

import { ERROR_ALERT_MESSAGE, TIMEOUT, TEMPORARY_SRC } from '../../static/constants';

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

function SearchedOutputList({ searchedOutputList }) {
  // TODO: skip, limit 값은 변경될 수도
  const skip = 15;
  const limit = 15;

  const { isLoading, data } = useCustomQuery(() => testApi({ skip, limit }));
  const [newData, setNewData] = useState(searchedOutputList);
  const metaRef = useRef({ fetching: false, skip: 0 });

  useEffect(() => {
    if (!isLoading && data) setNewData(data);
  }, [data]);

  const onScrollDropdown = (e) => {
    if (!newData) return;
    if (metaRef.current.skip + limit >= newData.total) return;

    const { clientHeight, scrollHeight, scrollTop } = e.target;
    if (scrollHeight * 0.8 <= clientHeight + scrollTop) getMoreData();
  };

  const getMoreData = async () => {
    try {
      if (metaRef.current.fetching) return;

      const skipNumber = metaRef.current.skip + limit;
      metaRef.current = { ...metaRef.current, fetching: true, skip: skipNumber };

      const data = await testApi({ skip: skipNumber, limit: limit });
      metaRef.current = { ...metaRef.current, fetching: false };
      // TODO: data에 담겨지는 키와 값들은 추후 API 확정되면 확인 후 코드 수정 예정
      setNewData((beforeData) => ({
        ...beforeData,
        ...data,
        posts: [...beforeData?.posts, ...data?.posts],
        skip: skipNumber,
      }));
    } catch (error) {
      console.error(ERROR_ALERT_MESSAGE);
      alert(ERROR_ALERT_MESSAGE);
    }
  };

  const throttleScroll = useThrottle(onScrollDropdown, TIMEOUT);

  return (
    <Wrapper
      className="flex flex-col mx-[15px] mb-[27px] gap-[20px] h-[555px] overflow-scroll overflow-x-hidden"
      onScroll={throttleScroll}
    >
      {!isLoading ? (
        <>
          {newData?.posts?.map((data, id) =>
            searchedOutputList.map((el) => (
              <SearchedOutput
                key={el.id}
                src={TEMPORARY_SRC}
                name={el.name}
                location={el.location}
                price={Number(el.price).toLocaleString()}
              />
            )),
          )}
        </>
      ) : (
        ''
      )}
    </Wrapper>
  );
}

export default SearchedOutputList;