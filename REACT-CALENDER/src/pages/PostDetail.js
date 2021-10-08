import React from 'react'
import Post from './Post'
import CommentList from '../components/CommentList'
import CommentWrite from '../components/CommentWrite'
import styled from 'styled-components'
import { FlexboxColumn } from '../mixins'
import {useSelector, useDispatch} from "react-redux"
import { actionCreators as postActions } from '../redux/modules/post'


const PostDetail = (props) => {
     const id = props.match.params.id;
     const user_info = useSelector((state) => state.user.user)
     const post_list = useSelector(store=> store.post.list)
     const post_idx = post_list.findIndex(p=> p.id === id)
     const post = post_list[post_idx]
     const [contents, setContents] = React.useState("");
     const dispatch = useDispatch();
   


    React.useEffect(() => {

      if(post){
         return; 
      }
      dispatch(postActions.getOnePostFB(id))
     

  }, []);

    return (
        <Container>
             {post && (
          <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
        )}
            <CommentList post_id={id}/>
            <CommentWrite
       post_id={id}
       
      />
            </Container>
    )
}
const Container = styled.section`
  ${FlexboxColumn};
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  max-width: 1000px;
`;
export default PostDetail;