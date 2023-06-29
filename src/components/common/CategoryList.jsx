import React, { useState } from 'react';

import Category from './Category';
import { TEMPORARY_SRC } from '../../static/constants';
import aquatic from '../../images/aquatic.png';
import bread from '../../images/bread.png';
import eco from '../../images/eco.png';
import fruit from '../../images/fruit.png';
import kimchi from '../../images/kimchi.png';
import meat from '../../images/meat.png';
import milk from '../../images/milk.png';
import water from '../../images/water.png';
import noodles from '../../images/noodles.png';
import rice from '../../images/rice.png';
import seasoning from '../../images/seasoning.png';
import snack from '../../images/snack.png';
import vegetable from '../../images/vegetable.png';

// TODO: 하드코딩된 값 constants로 추후 변경 예정
function CategoryList() {
  return (
    <div className="flex justify-center mx-[19px]">
      <div className="flex items-center flex-wrap gap-x-[20px] gap-y-[29px] w-[360px] mt-[25px] justify-between">
        <Category src={TEMPORARY_SRC} firstName={'전체'} />
        <Category src={fruit} firstName={'과일'} />
        <Category src={vegetable} firstName={'채소'} />
        <Category src={rice} firstName={'쌀/잡곡'} lastName={'견과'} />
        <Category src={meat} firstName={'정육'} lastName={'계란류'} />

        <Category src={aquatic} firstName={'수산물'} lastName={'건해산'} />
        <Category src={milk} firstName={'우유'} lastName={'유제품'} />
        <Category src={kimchi} firstName={'김치/반찬'} lastName={'델리'} />
        <Category src={water} firstName={'생수/음료'} lastName={'주류'} />
        <Category src={TEMPORARY_SRC} firstName={'커피/차'} lastName={'원두'} />

        <Category src={noodles} firstName={'면류'} lastName={'통조림'} />
        <Category src={seasoning} firstName={'양념/오일'} />
        <Category src={snack} firstName={'과자/간식'} />
        <Category src={bread} firstName={'베이커리'} lastName={'잼'} />
        <Category src={eco} firstName={'친환경'} lastName={'유기농'} />
      </div>
    </div>
  );
}

export default CategoryList;
