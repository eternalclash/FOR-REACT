import React from "react";

import Post from "./Post";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import Permit from "../shared/Permit";
import { Buttons, Grid } from "../elements";
import { useHistory } from "react-router";
import {FaReply} from "react-icons/fa";
import {FaRegNewspaper} from "react-icons/fa";
import {FaAngellist} from "react-icons/fa";
import {actionCreators as userActions} from "../redux/modules/user"
const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const history = useHistory();
    const user_info = useSelector((state) => state.user.user);
    console.log(post_list);
     
    React.useEffect(() => {
        dispatch(postActions.getPostFB());

    }, []);//처음에 한번ㅁ나 실행

    return (
        <React.Fragment>
            {post_list.map((p, idx) => {
                    if(user_info && p.user_info.user_id === user_info.uid){
                        return (
                            <Grid  _onClick={() => {
                                history.push(`/post/${p.id}`);
                              }}>
                                <Post key={p.id} {...p} is_me /> 
                            </Grid>
                        )
               
                    }
                return (<Grid   _onClick={() => {
                    history.push(`/post/${p.id}`);
                  }}><Post key={p.id} {...p}/></Grid> )
            })}
            <Permit>
            <Buttons is_float text="+" _onClick={()=>history.push('./write')}></Buttons>
         <Buttons is_gloat  _onClick={()=>history.push('./schedule')}><FaRegNewspaper/></Buttons>
         <Buttons is_logout _onClick={() => {dispatch(userActions.logoutFB())}}><FaReply/></Buttons>
         <Buttons is_alarm _onClick={() => history.push('/noti')}><FaAngellist/></Buttons>
            </Permit>
        </React.Fragment>
    )
}

export default PostList;