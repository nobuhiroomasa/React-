import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route,   Routes, Link } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import { configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux';
import postsReducer from "./features/Posts";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase.js"
import {SignInButton,SignOutButton,UserInfo} from "./components/signin.jsx";


import Sample1 from "./components/sample1.jsx";
import Choice from './components/choice.jsx';
import Signin from './components/signin.jsx'
// import Main1 from "./components/main1";

const store = configureStore({
  reducer:{
    posts: postsReducer,
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    
  

   <BrowserRouter>
   
   <Routes>
      {/* <Route path="/src/components/main1" element={Main1} /> */}
      <Route exact path="/" element={<App />}/>
      <Route  path="/signin" element={<Signin />} />
      <Route  path="/components/:postId" element={<Choice />} />
      <Route  path="/components/:postId/:choiceId" element={<Sample1 />} />
      
    </Routes>
   </BrowserRouter>
   </Provider>,
  </React.StrictMode>
)

function Main(){
  const [user] = useAuthState(auth);
  return(
  <header>
      <div className="container">

          <nav>
              <ul>
              <Link to={"/"} ><li>ホーム</li></Link>
                  <li><a href="#">機能</a></li>
                  <li><a href="#">サービス</a></li>
                  <li><a href="#">お問い合わせ</a></li>
                  <div className="user">
                      {user?(
                          <div className="signinbutton">
                          <li><UserInfo/></li>
                          <li><SignOutButton/></li>
                          </div>
                      ) : (
                          <li><SignInButton/></li>
                      )}

                  </div>
              </ul>
          </nav>
      </div>
  </header>
  );
}

export default Main
