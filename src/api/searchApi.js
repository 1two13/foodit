const data = {
  searchedOutput: {
    total: 30,
    size: 15,
    page: 1,
    list: [
      {
        id: 1,
        name: '서초구 자취러들 모여라~',
        location: '서울시 서초구 서초대로',
        price: '0',
        category: '전체',
      },
      {
        id: 2,
        name: '여기 사람 있어요',
        location: '서울시 서초구 서초대로',
        price: '50000',
        category: '과일',
      },
      {
        id: 3,
        name: '채소를 채고로 좋아합니다.',
        location: '서울시 서초구 서초대로',
        price: '14000',
        category: '채소',
      },
      {
        id: 4,
        name: '쌀/잡곡/견과 희망해요~',
        location: '서울시 서초구 서초대로',
        price: '120000',
        category: '쌀/잡곡/견과',
      },
      {
        id: 5,
        name: '나는 고기가 좋아요!',
        location: '서울시 서초구 서초대로',
        price: '36000',
        category: '정육/계란류',
      },
      {
        id: 6,
        name: '수산물은 못참지~',
        location: '서울시 서초구 서초대로',
        price: '53000',
        category: '수산물/건해산',
      },
      {
        id: 7,
        name: '락토프리 우유 비싼데 같이 살사람 구해요~',
        location: '서울시 서초구 서초대로',
        price: '17500',
        category: '우유/유제품',
      },
      {
        id: 8,
        name: '엄마표 김치가 먹고 싶어요..',
        location: '서울시 서초구 서초대로',
        price: '8900',
        category: '김치/반찬/델리',
      },
      {
        id: 9,
        name: '술픈 하루네요',
        location: '서울시 서초구 서초대로',
        price: '53200',
        category: '생수/음료/주류',
      },
      {
        id: 10,
        name: '아아를 만들어 먹어볼려구요',
        location: '서울시 서초구 서초대로',
        price: '129000',
        category: '커피/차/원두',
      },
      {
        id: 11,
        name: '참치는 못참지',
        location: '서울시 서초구 서초대로',
        price: '4900',
        category: '면류/통조림',
      },
      {
        id: 12,
        name: '양념은 왤케 큰거만 팔까요? 소분하실분',
        location: '서울시 서초구 서초대로',
        price: '18900',
        category: '양념/오일',
      },
      {
        id: 13,
        name: '도비는 과자가 필요해요',
        location: '서울시 서초구 서초대로',
        price: '8900',
        category: '과자/간식',
      },
      {
        id: 14,
        name: '잼 만든거 팝니다.',
        location: '서울시 서초구 서초대로',
        price: '8000',
        category: '베이커리/잼',
      },
      {
        id: 15,
        name: '유기농 대세가 지났지만 다시 한번!',
        location: '서울시 서초구 서초대로',
        price: '12000',
        category: '친환경/유기농',
      },
      {
        id: 16,
        name: '서초구 자취러들 모여라~',
        location: '서울시 서초구 서초대로',
        price: '0',
        category: '전체',
      },
      {
        id: 17,
        name: '여기 사람 있어요',
        location: '서울시 서초구 서초대로',
        price: '50000',
        category: '과일',
      },
      {
        id: 18,
        name: '채소를 채고로 좋아합니다.',
        location: '서울시 서초구 서초대로',
        price: '14000',
        category: '채소',
      },
      {
        id: 19,
        name: '쌀/잡곡/견과 희망해요~',
        location: '서울시 서초구 서초대로',
        price: '120000',
        category: '쌀/잡곡/견과',
      },
      {
        id: 20,
        name: '나는 고기가 좋아요!',
        location: '서울시 서초구 서초대로',
        price: '36000',
        category: '정육/계란류',
      },
      {
        id: 21,
        name: '수산물은 못참지~',
        location: '서울시 서초구 서초대로',
        price: '53000',
        category: '수산물/건해산',
      },
      {
        id: 22,
        name: '락토프리 우유 비싼데 같이 살사람 구해요~',
        location: '서울시 서초구 서초대로',
        price: '17500',
        category: '우유/유제품',
      },
      {
        id: 23,
        name: '엄마표 김치가 먹고 싶어요..',
        location: '서울시 서초구 서초대로',
        price: '8900',
        category: '김치/반찬/델리',
      },
      {
        id: 24,
        name: '술픈 하루네요',
        location: '서울시 서초구 서초대로',
        price: '53200',
        category: '생수/음료/주류',
      },
      {
        id: 25,
        name: '아아를 만들어 먹어볼려구요',
        location: '서울시 서초구 서초대로',
        price: '129000',
        category: '커피/차/원두',
      },
      {
        id: 26,
        name: '참치는 못참지',
        location: '서울시 서초구 서초대로',
        price: '4900',
        category: '면류/통조림',
      },
      {
        id: 27,
        name: '양념은 왤케 큰거만 팔까요? 소분하실분',
        location: '서울시 서초구 서초대로',
        price: '18900',
        category: '양념/오일',
      },
      {
        id: 28,
        name: '도비는 과자가 필요해요',
        location: '서울시 서초구 서초대로',
        price: '8900',
        category: '과자/간식',
      },
      {
        id: 29,
        name: '잼 만든거 팝니다.',
        location: '서울시 서초구 서초대로',
        price: '8000',
        category: '베이커리/잼',
      },
      {
        id: 30,
        name: '유기농 대세가 지났지만 다시 한번!',
        location: '서울시 서초구 서초대로',
        price: '12000',
        category: '친환경/유기농',
      },
    ],
  },
};

const searchPost = async (category, orderBy, keyword, page, size) => {
  const list = data.searchedOutput.list
    .filter((output) => category === '전체' || output.category === category)
    .filter((output) => !keyword || output.name.includes(keyword))
    .sort((a, b) => (orderBy === '낮은 가격순' ? a.price - b.price : b.price - a.price));
  const tempResult = {
    ...data.searchedOutput,
    page: page,
    size: size,
    total: list.length,
    list: list.slice((page - 1) * size, page * size),
  };

  return fetch(
    `/api/vi/search?page=${page}&size=${size}&category=${category}&orderBy=${orderBy}${
      keyword === '' ? '' : `&keyword=${keyword}`
    }`,
  )
    .then((res) => tempResult)
    .catch((err) => tempResult);
};

export default { searchPost };
