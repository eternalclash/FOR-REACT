import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { actionCreators as calendarActions } from "../redux/modules/calendar";

import GlobalStyles from "./GlobalStyles";
import theme from "./theme";
import Calendar from "../pages/Calendar";
import Add from "../pages/Add";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { actionCreators as userActions } from "../redux/modules/user";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../redux/configStore";


import {apiKey} from "./firebase";
import PostDetail from "../pages/PostDetail";
import Permit from "./Permit"
import PostWrite from "../pages/PostWrite";
import PostList from "../pages/PostList";
import Notification from "../pages/Notification";
function App() {
  const dispatch = useDispatch();
  
   const _session_key =   `firebase:authUser:${apiKey}:[DEFAULT]`;
   const is_session = sessionStorage.getItem(_session_key)?true: false;

   React.useEffect(() => {
    
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }

  }, []);

   
  dispatch(calendarActions.loadCalendarFB());

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GlobalStyles />
        <ConnectedRouter history={history}>
          
            <Route path="/schedule" exact component={Calendar} /> 
            <Route path="/add" exact component={Add} />
            <Route path = "/" exact component={Login} />
            <Route path = "/signup" exact component={Signup} />
            <Route path = "/post" exact component = {PostList} />
            <Route path = "/post/:id" exact component = {PostDetail} />
            <Route path = "/write" exact component = {PostWrite} />
            <Route path = "/write/:id" exact component = {PostWrite} />
            <Route path = "/noti" exact component = {Notification} />
            <Permit>
        
      </Permit>
            
      
        </ConnectedRouter>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div``;

export default App;
