import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import VideoCardCart from './VideoCardCart';
import VideoPage from './VideoPage';
import UploadPage from './UploadPage';
import SubmittedPage from './SubmittedPage';
//TODO /my-videos or /user/:id
function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<VideoCardCart/>}></Route>
            <Route path="/videos/:id" element={<VideoPage/>}></Route>
            <Route path="/upload" element={<UploadPage/>}></Route>
            <Route path="/submitted" element={<SubmittedPage/>}></Route>
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
