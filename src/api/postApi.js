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
