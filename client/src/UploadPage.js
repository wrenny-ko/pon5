import React, { useState }  from 'react';
import './UploadPage.css';

function UploadPage() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event){
    event.preventDefault();
    setSubmitted(true);
    

    }
  

  return (
    <div className="uploadPage">
      <form className="uploadForm" onSubmit={submit}>
        <div className="inputField">
          <div className="fieldLabel">Choose mp4</div>
          <input className="inputFile" type="file" name="file"/>
        </div>
        <div className="inputField">
          <div className="fieldLabel">Title</div>
          <input type="text" className="inputTitle" name="title" placeholder="Title"/>
        </div>
        <div className="inputField">
          <div className="fieldLabel">Description</div>
          <textarea className="inputDescription" name="description" placeholder="Description"/>
        </div>
        <input className="submitButton" type="submit" value="Submit" disabled={(submitted)?true:false}/>
      </form>
      {submitted?
        <div className="spinner"/>
        :
        <></>
      }
    </div>
  );
}

export default UploadPage;
