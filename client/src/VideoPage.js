import React, { useState, useEffect }  from 'react';
import { useParams } from "react-router-dom";
import './VideoPage.css';

function VideoPage() {
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [src, setSrc] = useState([]);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      const response = await fetch('http://localhost:80/video_info.php?id=' + id, {
        headers:{
          accept: 'application/json',
        },
      });

      let data = await response.json();

      if (response.status !== 200) {
        window.location.href = '/404';
      }

      const extension = data.mime_type.slice(6);
      setSrc("http://localhost:80/videos/" + id + "." + extension)
      console.log(src)
      setInfo(data);
    };

    fetchVideoInfo().catch(console.error);
  }, [id, src])

  //TODO add link to uploader's page or to a results page of that user's videos

  return (
    <div className="videoPage">
      <div className="videoPlayer">
        <video id={`video-${id}`} height="100%" controls src={src}/>
        <div className="metadata">
          <div className="views">
            {info.views} o.0
          </div>
          <div className="ratio">
            <div className="likes">
              {info.likes}^
            </div>
            <div className="dislikes">
              {info.dislikes}v
            </div>
          </div>
        </div>
      </div>
      <div className="titleBar">
        <div className="title">
          {info.title}
        </div>
        <div className="uploader">
          by {info.uploader}
        </div>
        <div className="timestamp">
        at {info.timestamp}
        </div>
      </div>
      <div className="descriptionBox">
        {info.description}
      </div>
    </div>
  );
}

export default VideoPage;
