import convertConventionUtil from '../utils/convertConventionUtil';

const searchPost = async (categoryId, orderBy, keyword, page) => {
  return fetch(
    `/api/vi/posts/list?page=${page}&category_id=${categoryId}&order_by=${orderBy}${
      keyword === '' ? '' : `&keyword=${keyword}`
    }`,
  )
    .then((res) => res.json())
    .then((json) => convertConventionUtil.snakeToCamelCase(json));
};

export default { searchPost };
