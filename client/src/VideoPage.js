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
        console.log("failed to fetch video info")
        console.log(data)
      }

      const extension = data.mime_type.slice(6);
      setSrc("http://localhost:80/videos/" + id + "." + extension)
      console.log(src)
      setInfo(data);
    };

    fetchVideoInfo().catch(console.error);
  }, [id, src])
  return (
    <div className="videoPage">
      <div className="videoPlayer">
        <video id={`video-${id}`} height="100%" controls src={src}/>
      </div>
      <div className="titleBar">
        {info.title} {src}
      </div>
      <div className="descriptionBox">
        {info.description}
      </div>
    </div>
  );
}

export default VideoPage;
