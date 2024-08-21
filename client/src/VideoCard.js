import React, { useState, useEffect }  from 'react';
import './VideoCard.css';

const VideoCard = (props) => {
  const [info, setInfo] = useState([]);
  const [src, setSrc] = useState([]);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      console.log(props)
      console.log(props.id)
      const response = await fetch('http://localhost:80/video_info.php?id=' + props.id, {
        headers:{
          accept: 'application/json',
        },
      });

      let data = await response.json();

      if (response.status !== 200) {
        console.log("failed to fetch video info")
        console.log(data)
      }

      const extension = data.mime_type.slice(6);
      setSrc("http://localhost:80/videos/" + props.id + "." + extension)
      console.log(src)
      setInfo(data);
    };

    fetchVideoInfo().catch(console.error);
  }, [props, src])

  return (
    //Title, uploader, uploader avatar, likes
      <a href={`/videos/${props.id}`} className={`video-card video-${props.id}`}>
        <div className="thumbnail-container">
          <img src={`http://localhost:80/thumbnails/${props.id}.jpeg`} className="thumbnail" alt="thumbnail"/>
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

export default VideoCard;
