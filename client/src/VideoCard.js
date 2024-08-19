import React from 'react';
import './VideoCard.css';

const VideoCard = (props) => {
  let info = fetchVideoInfo(props.id);
  return (
    //Title, uploader, uploader avatar, likes
      <a href={`/videos/${props.id}`} className={`video-card video-${props.id}`}>
        <div className="thumbnail-container">
          <img src={`/thumbnails/${props.id}.png`} className="thumbnail" alt="thumbnail"/>
        </div>
        <div className="info">
          <div className="title">
            {info.title}
          </div>
          <div className="uploader">
            {info.uploader}
          </div>
          <div className="numbers">
            {info.likes} likes, {info.views} views
          </div>
        </div>
      </a>
  );
};

function fetchVideoInfo() {
  let info = {
    likes: 3,
    
  };
  info.views = 13;
  info.title = "Mare video";
  info.uploader = "me";
  return info;
}

export default VideoCard;
