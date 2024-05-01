import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route,   Routes } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import { configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux';
import postsReducer from "./features/Posts";

import Sample1 from "./components/sample1";
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
   <App />
   <Routes>
      {/* <Route path="/src/components/main1" element={Main1} /> */}
      <Route path="/" element={<App />}/>
      <Route path="/components/sample1" element={<Sample1 />} />
      
    </Routes>
   </BrowserRouter>
   </Provider>,
  </React.StrictMode>
)
