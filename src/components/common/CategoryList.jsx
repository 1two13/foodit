import React from 'react';
import Category from './Category';
import total from '../../images/total.png';
import fruit from '../../images/fruit.png';
import vegetable from '../../images/vegetable.png';
import rice from '../../images/rice.png';
import meat from '../../images/meat.png';
import aquatic from '../../images/aquatic.png';
import milk from '../../images/milk.png';
import kimchi from '../../images/kimchi.png';
import water from '../../images/water.png';
import coffee from '../../images/coffee.png';
import noodles from '../../images/noodles.png';
import seasoning from '../../images/seasoning.png';
import snack from '../../images/snack.png';
import bread from '../../images/bread.png';
import eco from '../../images/eco.png';

const categories = [
  { src: total, firstName: '전체' },
  { src: fruit, firstName: '과일' },
  { src: vegetable, firstName: '채소' },
  { src: rice, firstName: '쌀/잡곡', lastName: '견과' },
  { src: meat, firstName: '정육', lastName: '계란류' },
  { src: aquatic, firstName: '수산물', lastName: '건해산' },
  { src: milk, firstName: '우유', lastName: '유제품' },
  { src: kimchi, firstName: '김치/반찬', lastName: '델리' },
  { src: water, firstName: '생수/음료', lastName: '주류' },
  { src: coffee, firstName: '커피/차', lastName: '원두' },
  { src: noodles, firstName: '면류', lastName: '통조림' },
  { src: seasoning, firstName: '양념/오일' },
  { src: snack, firstName: '과자/간식' },
  { src: bread, firstName: '베이커리', lastName: '잼' },
  { src: eco, firstName: '친환경', lastName: '유기농' },
];

function CategoryList() {
  return (
    <div className="flex justify-center mx-[19px]">
      <div className="flex items-center flex-wrap gap-x-[20px] gap-y-[29px] w-[360px] mt-[25px] justify-between">
        {categories.map((category, index) => (
          <Category key={index} src={category.src} firstName={category.firstName} lastName={category.lastName} />
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
