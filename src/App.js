import React, { useState } from 'react'

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';
import SignIn from './components/SignIn'
import firebase from 'firebase/compat';
import { updateDoc, doc} from 'firebase/firestore'
import db from './lib/firebase'
import './App.css'

function App() {
  const [username, setUsername] = useState("");
  const [isModal, setIsModal] = useState(false);
  const active_modal = isModal ? "is-active" : "";
  const [avatar, setAvatar] = useState("");
  const [docId, setDocId] = useState("");

  const SignOut = () => {
    firebase.auth().signOut();
    setDocId("");
  }

  const handleClick = () => {
    setIsModal(!isModal)
  }

  const uploadFile = async(event)=> {
    const file = event.target.files[0]
    const ref = firebase.storage().ref().child(`/avatars/${file.name}`)
    try {
      await ref.put(file)
      const url = await ref.getDownloadURL()
      const user = doc(db,"users",docId)
      const newField = {image: url}
      await updateDoc(user,newField)
      setAvatar(url)
    }catch(error) {
      console.log(error)
    }
    setIsModal(!isModal)

  }
  return (    
    <div className="container is-fluid">
        {username === ""?  <SignIn setUsername={setUsername} setDocId={setDocId} setAvatar={setAvatar}/> :(
        <div>
          <div className='nav'>
            <div className='info'>
            <div className={`modal ${active_modal}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                  <div className="file is-boxed">
                    <label className="file-label">
                      <input className="file-input" type="file" name="resume" onChange={uploadFile}/>
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                          Choose a file…
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={handleClick}></button>
              </div>
              <button className="button is-primary is-inverted" onClick={handleClick}>
                <span className="icon">
                  {avatar? <img src={avatar} alt="something" />:<i className="fas fa-user"></i>}
                </span>
              </button>
              {username}
            </div>
            <button className="button is-danger is-light is-small" onClick={SignOut}>Logout</button>
          </div>          
          <Todo/>
        </div>        
      ) }
    </div>
  );
}

export default App;
