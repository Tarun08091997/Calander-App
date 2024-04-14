import FrontPageNavBar from './components/pages/FrontPage/FrontPageNavBar'
import React, { useEffect, useState } from 'react';
import FrontPageCalander from './components/pages/FrontPage/FrontPageCalander';
import FrontPageFooter from './components/pages/FrontPage/FrontPageFooter';
import LoginPage from './components/pages/LoginPage/LoginPage'
import { UserProvider } from './contexts/UserContext';
import ShowRequestPage from './components/pages/showRequestPages/ShowRequestPage'
import CreateRequestPage from './components/pages/createRequestPage/CreateRequestPage'

function App() {

  const [loginClicked , setLoginClicked] = useState(false);
  const [pageName,setPageName] = useState("Home");
  return (
    <UserProvider>
      <div className="App" style={
      {

        padding:0,
        margin:0,
        width:'100vw',
        height:'100vh',
        backgroundColor:'rgba(125,125,125,0.1)',
        overflowX:'hidden',
        display:'flex',
        flexDirection:'column',
        justifyItems:'space-between',
        alignItems:'center'
        
      }
    }>
      <FrontPageNavBar style={{flexShrink:0}}  loginPopup= {(val) => setLoginClicked(val)} setPageName = {setPageName}/>
      {pageName === "Home" && <FrontPageCalander/> }
      {pageName === "Requests" && <ShowRequestPage />}
      {pageName === "CreateRequest" && <CreateRequestPage />}   
         
      <FrontPageFooter style={{flexShrink:0}}/>
      
      {loginClicked && <LoginPage loginPopup= {(val) => setLoginClicked(val)}/>} 

    </div>
    </UserProvider>

    
  );
}

export default App;
