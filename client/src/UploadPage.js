import React, { useState }  from 'react';
import './UploadPage.css';

function UploadPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function submit(event){
    event.preventDefault();

    // disable the submit button and show the spinner
    setSubmitted(true);

    const formData = new FormData();

    const info = JSON.stringify({
      title: event.target.title.value,
      description: event.target.description.value,
    })
    formData.append("info", info)

    const files = document.querySelector(".inputFile");
    formData.append("file", files.files[0]);

    const response = await fetch('http://localhost:80/upload.php', {
      method: 'POST',
      body: formData,
    });

    const res = await response.json();
    if(response.status !== 201) {
      // show error message
      setErrorMsg("Error: " + res.error);

      // hide the spinner and allow the submit button to be pressed again
      setSubmitted(false);
    } else {
      // on success, route to the new video's page
      window.location.href = '/videos/' + res.video;
    }
    return false; // this is so the normal form handler doesn't resume after
  }

  return (
    <div className="uploadPage">
      <form className="uploadForm" onSubmit={submit}>
        <div className="inputField">
          <div className="fieldLabel">Choose video (mp4 or webm)</div>
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
        (errorMsg !== "") ?
          <div className="errorMessage">
            {errorMsg}
          </div>
        :
          <></>
      }
    </div>
  );
}

export default UploadPage;
