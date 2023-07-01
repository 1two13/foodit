// camelCase를 snakeCase로 변환하는 함수
function camelToSnakeCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(camelToSnakeCase);
  }

  const snakeObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
      snakeObj[snakeKey] = camelToSnakeCase(obj[key]);
    }
  }

  return snakeObj;
}

// snakeCase를 camelCase로 변환하는 함수
function snakeToCamelCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamelCase);
  }

  const camelObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_\w/g, (match) => match[1].toUpperCase());
      camelObj[camelKey] = snakeToCamelCase(obj[key]);
    }
  }

  return camelObj;
}

export default {
  camelToSnakeCase,
  snakeToCamelCase,
};
