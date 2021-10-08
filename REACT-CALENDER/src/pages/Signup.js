import React, {useState} from 'react'
import styled from 'styled-components'
import { Flexbox } from '../mixins'
import { Input, CancleBtn, RectangleBtn} from '../elements'
import { useHistory } from 'react-router'
import { FaOctopusDeploy } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import { FlexboxColumn } from '../mixins'
const Signup = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [id,setId] = useState('');
    const [pwd,setPwd] = useState('');
    const [pwd_check,setPwd_check] = useState('');
    const [user_name,setUser_name] = useState('');
    //useStae를 많이 쓰는 것은 input =>onChange =(e)  => usestate=> state받아오기
    const signup = () => {
      if (id === "" || pwd === "" || user_name === "") {
        return;
      }
      
      if (pwd !== pwd_check) {
        return;
      }
  
      dispatch(userActions.signupFB(id, pwd, user_name));
    };
    return (<Container>
       <Form>
           <Main>
           <FaOctopusDeploy/>
               회원가입
               </Main>
        <Input
            id="id"
            label="아이디"
            type="text"
            value={id}
            _onChange = {(e)=>setId(e.target.value)}
            />
            <Input
            id="pwd"
            label="비밀번호"
            type="pwd"
            value = {pwd}
            _onChange = {(e)=>setPwd(e.target.value)}
            />
            <Input
            id="pwd_check"
            label="비밀번호 확인"
            type="text"
             value = {pwd_check}
            _onChange = {(e)=>setPwd_check(e.target.value)}
            />
            <Input
            id="pwd"
            label="닉네임"
            type="pwd"
             value = {user_name}
            _onChange = {(e)=>setUser_name(e.target.value)}
            />
            <BtnBox>
                <CancleBtn onClick={()=>history.push('/')}>취소 </CancleBtn>
                <RectangleBtn onClick={()=>dispatch(userActions.signupFB(id, pwd, user_name))}>완료</RectangleBtn>
            </BtnBox>
       </Form>
       </Container>
    )
}
const Main = styled.div`
  ${Flexbox};
  justify-content:center;
  padding-bottom: 100px;
  font-size: 50px;
`

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
`;
const BtnBox = styled.div`
  ${Flexbox};
  justify-content: flex-end;
  gap: 20px;
`;



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

export default Signup;