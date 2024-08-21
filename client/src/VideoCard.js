import React, { useState, useEffect }  from 'react';
import './VideoCard.css';

const VideoCard = (props) => {
  const [info, setInfo] = useState([]);
  const [src, setSrc] = useState([]);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      const response = await fetch('http://localhost:80/video_info.php?id=' + props.id, {
        headers:{
          accept: 'application/json',
        },
      });

      let data = await response.json();

      //TODO replace this block
      if (response.status !== 200) {
        return;
      }

      const extension = data.mime_type.slice(6);
      setSrc("http://localhost:80/videos/" + props.id + "." + extension)
      setInfo(data);
    };

    fetchVideoInfo().catch(console.error);
  }, [props, src])

  return (
    <a href={`/videos/${props.id}`} className={`video-card video-${props.id}`}>
      <div className="thumbnail-container">
        <img src={`http://localhost:80/thumbnails/${props.id}.jpeg`} className="videoCardThumbnail" alt="thumbnail"/>
      </div>
      <div className="videoCardInfo">
        <div className="videoCardTitle">
          {info.title}
        </div>
        <div className="videoCardUploader">
          {info.uploader}
        </div>
        <div className="videoCardNumbers">
          {info.likes} likes, {info.views} views
        </div>
      </div>
    </a>
  );
};

export default VideoCard;
