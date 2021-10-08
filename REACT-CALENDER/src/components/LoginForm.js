import React, {useState} from 'react'
import styled from 'styled-components'
import { CancleBtn, Input, RectangleBtn } from '../elements';
import { Flexbox } from "../mixins";  //Flexbox
import { useHistory } from 'react-router';
import { FaOctopusDeploy } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import {actionCreators as userActions} from "../redux/modules/user"
import {getCookie,setCookie, deleteCookie} from "../shared/Cookie";

const LoginForm = (props) => {
    const dispatch = useDispatch();

    const login = () => {
      if(id ==="" || pwd === "")
      {
        window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
      }
      dispatch(userActions.loginFB(id, pwd));
    }

    let history = useHistory();

    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')
   
    return (
        <Form>
           <Main>
               <FaOctopusDeploy/>
               우리우리
               </Main>
            <Input
           
            label="아이디"
           
            value={id}
            _onChange = {(e)=>setId(e.target.value)}
            />
            <Input
          
            label="비밀번호"
            type="password"
            value={pwd}
            _onChange = {(e)=>setPwd(e.target.value)}
            />
            <BtnBox>
                <CancleBtn onClick={()=>{history.push('/signup')}}>회원가입</CancleBtn>
                <RectangleBtn onClick={()=>  dispatch(userActions.loginFB(id, pwd))} >로그인</RectangleBtn>
            </BtnBox>
        </Form>
    )
}







const Form = styled.form`
  width: 100%;
  margin: 0 auto;
`;

const BtnBox = styled.div`
  ${Flexbox};
  justify-content: flex-end;
  gap: 20px;
`;
const Main = styled.div`
  ${Flexbox};
  justify-content:center;
  padding-bottom: 100px;
  font-size: 50px;
`
export default LoginForm;