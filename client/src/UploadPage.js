import React, { useState }  from 'react';
import './UploadPage.css';

function UploadPage() {
  const [submitted, setSubmitted] = useState(false);

  async function submit(event){
    event.preventDefault();
    setSubmitted(true);

    const formData = new FormData();

    const info = JSON.stringify({
      title: event.target.title.value,
      description: event.target.title.value,
    })
    formData.append("info", info)

    const files = document.querySelector(".inputFile");
    formData.append("file", files.files[0]);

    const response = await fetch('http://localhost:80/upload.php', {
      method: 'POST',
      body: formData,
    });

    if(response.status !== 201) {
      //trigger error modal
      setSubmitted(false);
    } else {
      const res = await response.json();
      window.location.href = '/videos/' + res.success;
    }
    return false;
  }
/*
    useEffect(() => {
      const postVideo = async () => {
        const response = await fetch('http://localhost:80/simpleposthandler.php', {
          method: 'POST',
          headers:{
            accept: 'application/json',
            'User-agent': 'pon5 frontend',
          },
          body: formData,
        });
        
        if (response.ok()) {
          //go to new video's page
        } else {
          //go to error page
        }
      };
      
      postVideo().catch(console.error);
    })
*/


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
