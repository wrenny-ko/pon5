import React, { useState, useEffect }  from 'react';
import './VideoCardCart.css';
import VideoCard from './VideoCard.js'

const VideoCardCart = (props) => {
  const [videoIDs, setVideoIDs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchVideoIDs = async () => {
      const response = await fetch('http://localhost:80/videos.php', {
        headers:{
          accept: 'application/json',
        },
      });

      const data = await response.json();
      setVideoIDs(data);
      setLoaded(true);
    };

    fetchVideoIDs().catch(console.error);
  }, [])

  return (
    <div className="videoCardCart">
      {videoIDs.length > 0 || !loaded ? 
        videoIDs.map(id => (
          <VideoCard id={id} key={id}/>
        ))
      :
        <div className="empty">
          No videos....yet!
        </div>
      }
    </div>
  );
};

export default VideoCardCart;
