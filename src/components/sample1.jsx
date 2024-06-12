import Main from "../main";
import React,{useState, useEffect} from "react" ;
import {  Link , useParams } from "react-router-dom"
import db from "../firebase";
import "./sample1.css";
import { collection, doc, getDoc,getDocs,onSnapshot,addDoc,deleteDoc,serverTimestamp,query,orderBy  } from "firebase/firestore";
import useAuth from "../useAuth";



function Sample1(){
    const {choiceId} = useParams();
    const choiceNumber = parseInt(choiceId,10);
    const {postId} = useParams();
    const [post,setPost] = useState(null);
    const [posts2,setPosts2] = useState([]);
    const [coments,setComents] = useState("");

    const currentUser = useAuth();
    const currentUserEmail = currentUser ? currentUser.email : null;


    const fetchDocument = async (db, collectionName, documentId) => {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            //ドキュメントが存在する場合、そのデータを返す
            return docSnap.data();
        } else {
            //ドキュメントが存在しない場合、nullを返すかエラーを処理する
            throw new Error("Document does not exist");
        }
    };
  
    useEffect(() => {
        //fetchDocument関数を呼び出してデータを取得し、postステートを更新する
        fetchDocument(db, "posts", postId)
          .then((result) => {
            setPost(result); //取得したデータをpostステートにセットする
          })
          .catch((error) => {
            console.error("エラー:", error);
          });

          const postData2 = query(collection(db, "posts-item"), orderBy('timestamp'));
        getDocs(postData2).then((snapshot) =>{
            setPosts2(snapshot.docs.map((doc) => ({...doc.data() , id:doc.id})));

        })

        onSnapshot(postData2, (post) =>{
            setPosts2(post.docs.map((doc) => ({...doc.data() , id:doc.id})))
          })
      }, [postId]); //postIdが変更されたときに再実行する

     const handleClick = () => {
        addDoc(collection(db, "posts-item"),{
            coment: coments,
            post1ID: postId,
            name: currentUserEmail,
            choiceId: choiceNumber,
            timestamp: serverTimestamp()
        })
        setComents("");
      } 
      console.log(posts2);
    return(
        <div>
             <Main />
            <div className="Sample1">
               

                {post?(
                    <div className="title-2">
                        <h1>{post.title+" "+"vs"+" "+post.title2}</h1>
                    
                    </div>                
                ):(
                    <p>loading</p>
                )
                }

                <div className="posts2">
                    {
                        posts2.map((commentData) =>{


                        if (postId === commentData.post1ID) {
                            return commentData.choiceId === 1 ? (
                            <div key={commentData.id} className="post2-1">
                                <p className="coment">{commentData.coment}</p>
                                {commentData.name === currentUserEmail && (
                                <button onClick={() => deleteDoc(doc(db, "posts-item", commentData.id))}>
                                    削除
                                </button>
                                )}
                            </div>
                            ) : (
                            <div key={commentData.id} className="post2-2">
                                <p className="coment">{commentData.coment}</p>
                                {commentData.name === currentUserEmail && (
                                <button onClick={() => deleteDoc(doc(db, "posts-item", commentData.id))}>
                                    削除
                                </button>
                                )}
                            </div>
                            );
                        }
                        return null;
                        })}
                </div>
                <div className="addPost2">
                    <input type="text" className="commentinput2" placeholder="コメントを入力してください" onChange={(e) => setComents(e.target.value)} value={coments}/>
                    <button onClick={() => handleClick()}>投稿</button>
                </div>

            </div>
        </div>
    )
    
}

export default Sample1