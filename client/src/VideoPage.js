import React, { useState, useEffect }  from 'react';
import { useParams } from "react-router-dom";
import './VideoPage.css';

function VideoPage() {
  const { id } = useParams();
  const [info, setInfo] = useState([]);

/*
  const [extension, setExtension] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
*/
  //TODO fetch video info, update mime type, title, description
  useEffect(() => {
    const fetchVideoInfo = async () => {
      const response = await fetch('http://localhost:80/videos/' + id + '/info', {
        headers:{
          accept: 'application/json',
        },
      });

      const data = await response.json();
      setInfo(data);
      /*
      setExtension(data.mime_type.slice(6)); // take part after "video/"
      setTitle(data.title);
      setDescription(data.description);
      */
    };

    fetchVideoInfo().catch(console.error);
  }, [id])
  return (
    <div className="videoPage">
      <div className="videoPlayer">
        <video id={`video-${id}`} height="100%" controls>
          <source src={`/videos/${id}.${info.mime_type.slice(6)}`}/>
        </video>
      </div>
      <div className="titleBar">
        {info.title}
      </div>
      <div className="descriptionBox">
        {info.description}
      </div>
    </div>
  );
}

export default VideoPage;
