import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import VideoCardCart from './VideoCardCart';
import VideoPage from './VideoPage';
import UploadPage from './UploadPage';
import NotFoundPage from './NotFoundPage';

//TODO /my-videos or /user/:id
function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<VideoCardCart/>}/>
            <Route path="/videos/:id" element={<VideoPage/>}/>
            <Route path="/upload" element={<UploadPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
