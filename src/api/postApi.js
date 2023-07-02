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
      Authorization: user.token,
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

const joinPost = (postId, token) => {
  return fetch(`/api/vi/posts/participate/${postId}`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());
};

const getPost = (postId) => {
  return fetch(`/api/vi/posts/detail/${postId}`)
    .then((res) => res.json())
    .then((json) => convertConvention.snakeToCamelCase(json));
};

export default { writePost, getPost, joinPost };
