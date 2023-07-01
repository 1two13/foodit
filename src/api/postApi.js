import convertConvention from '../utils/convertConventionUtil';

const writePost = (post, user, image) => {
  const formData = new FormData();
  formData.append(
    'body',
    new Blob([JSON.stringify(convertConvention.camelToSnakeCase(post))], { type: 'application/json' }),
  );
  formData.append('image', image);

  return fetch('/api/vi/posts/save', {
    method: 'POST',
    headers: {
      Authorization:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZXIxIiwiaWF0IjoxNjg4MjQ0MDEwLCJleHAiOjE2ODg2MDQwMTB9.L2YVXvMQuJqhn99W91ZFZkbfRI5RshZS1qWAUbQ7V_Kc5c-JaufkXrTq-WkUrHcEPHbHA6IF177yxezeBjmORw', // user.token
    },
    body: formData,
  }).then((res) => res.json());
};

const postDummyData = [
  {
    title: '안녕하세요~',
    content: '저희는 채소를 채고 좋아합니다.',
    count: 20000,
    limit: 4,
    imageUrl: null,
    categoryId: '채소',
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
    content: '여기 여기 모여라~',
    count: 10000,
    limit: 3,
    imageUrl: null,
    categoryId: '과일',
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
  return fetch(`/api/vi/posts/detail/${postId}`)
    .then((res) => res.json())
    .then((json) => convertConvention.snakeToCamelCase(json));
};

export default { writePost, getPost, joinPost };
