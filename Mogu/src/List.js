import './List.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubCard from './components/SubCard';
import pilly from './img/pilly.png';

import { swiperContents } from './swiperContents';
import SwipeItem from './SwipeItem';
import SwipePaginationIndex from './SwipePaginationIndex';
import SwipePaginationButtons from './SwipePaginationButtons';

export default function List() {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  // 로드 중... 구현을 위한 것
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 자동재생 & 재생 및 일시정지 구현을 위한 것
  const [currentTimerId, setCurrentTimerId] = useState(-1);

  const [play, setPlay] = useState(true);

  const [category, setCategory] = useState('');
  const categoryList = ["", "health", "food", "culture"];
  const [subList, setSubList] = useState([]);

  const baseUrl = "http://27.96.135.10:8090";
  // const baseUrl = "http://localhost:8090";

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

  const chnCategory = (e) => {
    setCategory(e.target.id);
  }

  useEffect(() => {
    const fetchData = async (e) => {
      if(subList.length === 0) {
        const response = await axios.get(baseUrl + "/sub/list");
        setSubList(response.data.result);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
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

    <div className='product-container'>
      <div className= 'product-category'>
        <div id="" className={category === "" ? "button_act" : "button"} onClick={chnCategory}>전체</div>
        <div id="health" className={category === "health" ? "button_act" : "button"} onClick={chnCategory}>건강</div>
        <div id="food" className={category === "food" ? "button_act" : "button"} onClick={chnCategory}>음식</div>
        <div id="culture" className={category === "culture" ? "button_act" : "button"} onClick={chnCategory}>편의 · 문화</div>
      </div>
      <div className='product-app'>
        {category === '' 
          ? subList?.map((e) => (<SubCard data={e}/>))
          : subList
              .filter((e) => category === e.category)
              .map((el) => (<SubCard data={el}/>))
        
        }
      </div>
    </div>
    </div>
  );
}
