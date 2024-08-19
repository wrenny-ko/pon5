import { useParams} from "react-router-dom";
import './VideoPage.css';

function VideoPage() {
  const { id } = useParams();

  return (
    <div className="videoPage">
      <div className="videoPlayer">
        <video id={`video-${id}`} height="100%" controls>
          <source src={`/videos/${id}.mp4`}/>
        </video>
      </div>
    </div>
  );
}

export default VideoPage;
