const writePost = (body) => {
  const dummyData = { postId: 1 };

  return fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
    .then(() => dummyData)
    .catch((err) => dummyData);
};

const getPosts = () => {};

const postDummyData = [
  {
    title: '안녕하세요~',
    textArea: '저희는 채소를 채고 좋아합니다.',
    totalAmount: 20000,
    peopleCount: 4,
    imageUrl: null,
    selectedCategory: '채소',
    isJoin: true,
    friendsList: [
      {
        id: 1,
        name: '동네친구',
        writer: true,
      },
      {
        id: 2,
        name: '아는 형님의',
        writer: false,
      },
    ],
  },
  {
    title: '동네 사람들!',
    textArea: '여기 여기 모여라~',
    totalAmount: 10000,
    peopleCount: 3,
    imageUrl: null,
    selectedCategory: '과일',
    isJoin: false,
    friendsList: [
      {
        id: 1,
        name: '하이',
        writer: true,
      },
    ],
  },
];

const joinPost = (postId) => {
  if (postDummyData[postId - 1].isJoin) {
    return;
  }

  const dummy = postDummyData[postId - 1];
  dummy.isJoin = true;
  dummy.friendsList.push({
    id: dummy.friendsList.length + 1,
    name: '나',
    writer: false,
  });

  return fetch(`/posts/${postId}`)
    .then(() => postDummyData[postId - 1])
    .catch((err) => postDummyData[postId - 1]);
};

const getPost = (postId) => {
  return fetch(`/posts/${postId}`)
    .then(() => postDummyData[postId - 1])
    .catch((err) => postDummyData[postId - 1]);
};

export default { writePost, getPost, getPosts, joinPost };
