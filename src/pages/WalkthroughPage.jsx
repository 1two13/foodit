import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Carousel from '../components/common/Carousel';
import ImageAndMessage from '../components/common/ImageAndMessage';
import LongButton from '../components/common/LongButton';

const WalkthroughPage = () => {
  const [carouselColor, setCarouselColor] = useState(['#00c92c', '#d9d9d9']);
  const [walkthroughPosition, setWalkthroughPosition] = useState(0);
  const [firstImageVisible, setFirstImageVisible] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem('walkthrough')) {
      navigate('/');
    }
  }, []);

  const startHandler = () => {
    if (buttonClicked) {
      window.localStorage.setItem('walkthrough', 'true');
      navigate('/signin', { state: { before: '/' } });
    } else {
      setCarouselColor(['#d9d9d9', '#00c92c']);
      setFirstImageVisible(false);
      if (firstImageVisible) {
        setTimeout(() => {
          setWalkthroughPosition(-50);
        }, 100);
      }
      setButtonClicked(true);
    }
  };

  return (
    <div className="relative w-[390px] overflow-hidden">
      <div
        className="walkthroughWrapper w-[780px] flex transition-all duration-500 ease"
        style={{
          transform: `translateX(${walkthroughPosition}%)`,
        }}
      >
        <ImageAndMessage
          opacity={firstImageVisible ? 1 : 0}
          src={process.env.PUBLIC_URL + '/images/walkthrough.gif'}
          mainMessage={'우리동네'}
          subMessage={
            <>
              가까운 동네 친구들과
              <br /> 혼자 사기 힘들었던 상품을
              <br /> 이제 부담없이 나눠가져요
            </>
          }
        />
        <ImageAndMessage
          opacity={firstImageVisible ? 0 : 1}
          imgLeft={'480px'}
          msgLeft={'470px'}
          src={process.env.PUBLIC_URL + '/images/walkthrough2.gif'}
          mainMessage={'함께사요'}
          color={'#EE0707'}
          subMessage={
            <>
              한번에 많은 물건을 혼자사기
              <br />
              부담스럽다면 동네 친구들과 함께
              <br />
              구입하고 먹을만큼 나눠가져요
            </>
          }
        />
      </div>
      <div className="flex justify-between w-[30px] fixed bottom-[125px] left-1/2 translate-x-[-50%]">
        <Carousel carouselColor={carouselColor[0]} />
        <Carousel carouselColor={carouselColor[1]} />
      </div>
      <LongButton type={'button'} contents={'시작하기'} onClick={startHandler} />
    </div>
  );
};

export default WalkthroughPage;
