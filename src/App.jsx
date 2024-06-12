
import {  Link  } from "react-router-dom"
import './App.css';
import {useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import { addPost,deletePost } from "./features/Posts"

import useAuth from './useAuth';
import db from "./firebase";
import {auth} from "./firebase";
import {  collection, getDocs, onSnapshot, addDoc, doc, deleteDoc ,orderBy , query} from "firebase/firestore"
import Main from "./main";





function App() {
  const [isAnimated, setIsAnimated] = useState(false);
  const[posts,setposts] = useState([]);
  const[name,setName] = useState("");
  const[content, setContent] = useState("");

  const currentUser = useAuth();
  const currentUserEmail = currentUser ? currentUser.email : null;
  useEffect(() => {
    //データベースに追加する。

    //データベースから取得する。
    const postData = query(collection(db, "posts"), orderBy('timestamp'));
    getDocs(postData).then((snapShot) => {
      //console.log(snapShot.docs.map((doc) => ({...doc.data()})));
      setposts(snapShot.docs.map((doc) => ({...doc.data() , id:doc.id})));

    });
    //リアルタイムで取得
    const unsubscribe = onSnapshot(postData, (post) => {
      setposts(post.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }, (error) => {
      console.error("Error in snapshot listener: ", error);
    });

    return () => unsubscribe();
  },[]);
  const postList = useSelector((state) => state.posts.value);

console.log(posts.id);

const dispatch = useDispatch();
const handleClick = () => {
  if (currentUserEmail) {
    addDoc(collection(db, "posts"), {
      title: name,
      title2: content,
      name: currentUserEmail,
      timestamp: new Date() 
    });
    dispatch(
      addPost({
        id: postList.length,
        name: name,
        content: content,
      })
    );
    setName("");
    setContent("");
  } else {
    console.error("User is not authenticated");
  }
};

  return(

    < div>
    <div>
      <Main/>
    </div>
     <div className='App'>

      
    <div>
      <Link to={"/"} className="postLink">  
      <h1>React-Reduc掲示板</h1>
      </Link> 
    </div>
    <div className='addPost'>
    <input type="text" placeholder='タイトル１' onChange={(e) => setName(e.target.value)}
      value={name}/>
    <input type="text" placeholder='タイトル２' onChange={(e) => setContent(e.target.value)}
      value={content}/>
    <button onClick={() => handleClick()}>投稿</button>
    <hr />
    </div>
    

{      <div className='displayPosts' >
      {posts.map((post) => ( 
              
              

        
        < div key={post.title} className='post'>
            <Link to={'/components/' + post.id} className={`postLink ${isAnimated ? 'animated' : ''}`}>
              <h1 className="postName1" >{post.title}</h1>
              <h1 className="postName2 ">to</h1>
              <h1 className="postName3">{post.title2}</h1>
              <p className="postContent"></p>
            </Link>
            
            {post.name===currentUserEmail &&(
              <button onClick={() => deleteDoc(doc(db,"posts", post.id ))}>
              削除
            </button>
            )
            }

            
          </div>
          
      ))} ;
      
    </div> }
    
    
  </div>
  </div>
  );
  
}



export default App
