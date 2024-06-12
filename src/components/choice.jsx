import Main from "../main";
import React,{useState, useEffect} from "react" ;
import {  Link, useParams  } from "react-router-dom"
import db from "../firebase";
import {  doc, getDoc } from "firebase/firestore";
import "./sample1.css";

function Choice(){
    const {postId} = useParams();
    const [post,setPost] = useState(null);

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


      }, [postId]);

      return(
        <div>
            <Main />

            <div className="Choice">
                <div className="Choice-lines">
                    <h1>どちらを選びますか？</h1>
                </div>
                {post?(
                    <div className="title-2">
                        <Link to={'/components/'+ postId+"/"+ 1}>
                            <div className="title1">
                                <h1 >{post.title}</h1>
                            </div>
                            
                        </Link>
                            <h1 className="vs">or</h1>
                        <Link to={'/components/'+ postId+"/"+ 2}>
                            <div className="title2">
                                <h1>{post.title2}</h1>
                            </div>
                        </Link>
                        
                    
                    </div>                
                ):(
                    <p>loading</p>
                )
                }
            </div>
        </div>

      )
}

export default Choice