import {useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import { addPost,deletePost } from "../features/Posts"

import db from "../firebase";
 import {  collection, getDocs, onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore"

import React from "react" ;
import ReactDOM from "react-dom";




function Main1() {



  const[posts,setposts] = useState([]);
  const[name,setName] = useState("");
  const[content, setContent] = useState("");

  useEffect(() => {
    //データベースに追加する。

    //データベースから取得する。
    const postData = collection(db, "posts");
    getDocs(postData).then((snapShot) => {
      //console.log(snapShot.docs.map((doc) => ({...doc.data()})));
      setposts(snapShot.docs.map((doc) => ({...doc.data() , id:doc.id})));

    });
    //リアルタイムで取得
    onSnapshot(postData, (post) =>{
      setposts(post.docs.map((doc) => ({...doc.data() , id:doc.id})))
    })
  },[]);
  const postList = useSelector((state) => state.posts.value);

// console.log(posts.id);

const dispatch = useDispatch();
const handleClick = () => {
  addDoc(collection(db,"posts"),{
    title: name,
    text: content
  });
    dispatch(
      addPost({
      id: postList.length,
      name: name,
      content: content,
}));

  setName("");
  setContent("")
  
};
  return(
     <div className='App'>
    <div>
      <h1>React-Reduc掲示板</h1>
    </div>
    <div className='addPost'>
    <input type="text" placeholder='お名前' onChange={(e) => setName(e.target.value)}
      value={name}/>
    <input type="text" placeholder='投稿内容' onChange={(e) => setContent(e.target.value)}
      value={content}/>
    <button onClick={() => handleClick()}>投稿</button>
    <hr />
    </div>
 
     <div className='displayPosts' >
       {posts.map((post) => (
              
              

        
          < div key={post.title} className='post'>

            <h1 className='postName'>{post.title}</h1>
            
            <p className='postContent'>{post.text}</p>
            <button onClick={() => deleteDoc(doc(db,"posts", post.id ))}>
              削除
            </button>
            
          </div>
          
      ))} ;
      
    </div>
    
  </div>
  );

 }



export default Main1
