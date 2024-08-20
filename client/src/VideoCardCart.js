import React, { useState, useEffect }  from 'react';
import './VideoCardCart.css';
import VideoCard from './VideoCard.js'

const VideoCardCart = (props) => {
  const [videoIDs, setVideoIDs] = useState([]);

  useEffect(() => {
    const fetchVideoIDs = async () => {
      const response = await fetch('http://localhost:80/videos.php', {
        headers:{
          accept: 'application/json',
        },
      });
      
      const data = await response.json();
      setVideoIDs(data);
    };

    

    fetchVideoIDs().catch(console.error);
  }, [])

  return (
    <div className="videoCardCart">
      {videoIDs.map(id => (
        <VideoCard id={id} key={id}/>
      ))}
    </div>
  );
};

export default VideoCardCart;
