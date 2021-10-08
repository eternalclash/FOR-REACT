import React from 'react'
import Route from 'react-router'
import { FlexboxColumn } from '../mixins'
import styled from 'styled-components'
import LoginForm from '../components/LoginForm'
const Login = (props) => {
   return (
    <Container>
     <LoginForm/>
    </Container>
   )
}



const Container = styled.section`
  ${FlexboxColumn};
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  min-width: 320px;
  max-width: 500px;
  padding: 0 30px;
  transform: translate(-50%, -50%);
`;
export default Login;