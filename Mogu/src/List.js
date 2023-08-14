import { useState, useEffect } from 'react';

import { swiperContents } from './swiperContents';
import SwipeItem from './SwipeItem';
import SwipePaginationIndex from './SwipePaginationIndex';
import SwipePaginationButtons from './SwipePaginationButtons';


import "./List.css";
export default function List() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 로드 중... 구현을 위한 것
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 자동재생 & 재생 및 일시정지 구현을 위한 것
  const [currentTimerId, setCurrentTimerId] = useState(-1);

  const [play, setPlay] = useState(true);

  const maxSlide = swiperContents.length - 1;

  const rightArrowClickHandler = () => {
    setCurrentSlide(prevState => (prevState < maxSlide ? prevState + 1 : 0));
    clearTimeout(currentTimerId);
  };

  const leftArrowClickHandler = () => {
    setCurrentSlide(prevState => (prevState > 0 ? prevState - 1 : maxSlide));
    clearTimeout(currentTimerId);
  };

  const swipePlayHandler = () => {
    setPlay(!play);
    clearTimeout(currentTimerId);
  };

  useEffect(() => {
    if (play) {
      const timer = setTimeout(() => rightArrowClickHandler(), 5000);
      setCurrentTimerId(timer);
    }
  }, [currentSlide, play]);

  useEffect(() => {
    const DELAY_TIME = 1000;

    setTimeout(() => {
      setSlides(swiperContents);
      setIsLoading(false);
    }, DELAY_TIME);
  }, []);

  let content;

  if (isLoading) {
    content = (
      <div style={{ width: '100vw' }}>
        <p
          style={{
            maxWidth: '75rem',
            width: '100%',
            height: '20rem',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'gray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
          }}>
          로드 중...
        </p>
      </div>
    );
  } else {
    content = slides.map((slide, index) => (
      <SwipeItem
        key={slide.keyword}
        keyword={slide.keyword}
        title={slide.title}
        description={slide.description}
        tag={slide.tag}
        img={slide.img}
        background={slide.background}
        fontColor={slide.fontColor}
        tagColor={slide.tagColor}
        tagBackground={slide.tagBackground}
        isActive={currentSlide}
        index={index}
      />
    ));
  }

  return (
    <section className="swiper">
      <div className='textLayout' >이런 <span style={{ color: '#67A2D8' }}>서비스</span> 어떤가요?</div>
      <ul className="swipe-items">{content}</ul>
      <div className="swipe-pagination-wrapper">
        <div className="swipe-pagination-grid-wrapper">
          <SwipePaginationIndex
            length={swiperContents.length}
            play={play}
            currentSlide={currentSlide}
            rightArrowClickHandler={rightArrowClickHandler}
            leftArrowClickHandler={leftArrowClickHandler}
            swipePlayHandler={swipePlayHandler}
          />
          
        </div>
      </div>
    </section>
  );
}