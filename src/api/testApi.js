const testApi = ({ skip, limit }) => {
  return fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}`).then((res) => res.json());
};

export default testApi;
