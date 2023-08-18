import React from 'react';

export default function SwipeItem({
  keyword,
  title,
  description,
  tag,
  img,
  background,
  fontColor,
  tagColor,
  tagBackground,
  isActive,
  index,
  link
}) {
  const backgroundStyle = { backgroundColor: background };
  const fontStyle = { color: fontColor };
  const tagStyle = {
    color: tagColor,
    backgroundColor: tagBackground,
  };

  const handleItemClick = (title) => {
    if(fontColor==='black'){
      window.location.href = `/detail/7`;
    }
    else if(fontColor==="#FFFFFF"){
      window.location.href = `/detail/5`;
    }
    else if(fontColor==="#000000"){
      window.location.href = `/detail/1`;
    }
    
  };


  return (
    <li
      className={`swipe-item-wrapper ${
        isActive === index ? 'swipe-item-active' : ''
      }`}
      key={keyword}>
      <a className="swipe-item" style={backgroundStyle} onClick={() => handleItemClick(title)}>
        <div className="wrapper__swipe-item-contents">
          <div className="desc-wrapper__swipe-item-content" style={fontStyle}>
            <div className="align-swipe-item-content">
              {tag && (
                <div className="wrapper__swipe-item-tag">
                  {tag.map(tag => (
                    <span
                      className="swipe-item-tag"
                      style={tagStyle}
                      key={Math.random()}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </div>
          <div>
            <img src={img} alt={keyword} />
          </div>
        </div>
      </a>
    </li>
  );
}