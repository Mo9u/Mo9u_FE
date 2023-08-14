import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function SwipePaginationIndex({
  length,
  play,
  currentSlide,
  rightArrowClickHandler,
  leftArrowClickHandler,
  swipePlayHandler,
}) {
  return (
    <div className="swipe-pagination-controller">
      <span className="swipe-pagination-index">
        <span>{currentSlide + 1}</span>/<span>{length}</span>
      </span>
      <div className="swipe-page-control-button-container">
        <button
          type="button"
          aria-label="왼쪽으로 넘기기"
          onClick={leftArrowClickHandler}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button type="button" aria-hidden="true" onClick={swipePlayHandler}>
          <FontAwesomeIcon icon={play ? faPause : faPlay} />
        </button>
        <button
          type="button"
          aria-label="오른쪽으로 넘기기"
          onClick={rightArrowClickHandler}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}