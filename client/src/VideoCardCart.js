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


  
//      <VideoCard id="1234" uploader="me" likes="3" views="13" title="Epic screm"/>
//      <VideoCard id="1235" uploader="you" likes="8" views="1" title="c:"/>
  return (
    <div className="videoCardCart">
      {videoIDs.map(id => (
        <VideoCard id={id} key={id}/>
      ))}
    </div>
  );
};

/*
async function fetchVideoIDs() {
  
  const response = await fetch('localhost/video_ids');
  const data = await response.json();
  console.log(data);
  
  return ["1234", "1235", "1", "2", "3", "4", "5"];
}
*/

export default VideoCardCart;
