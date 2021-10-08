import React from "react";
import {Grid, Image, Text} from "../elements";
import styled from "styled-components";
import { Flexbox } from "../mixins";
import college from "../college.jpg"
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as commentActions} from "../redux/modules/comment";
const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.comment.list);

  const {post_id} = props; 

  React.useEffect(() => {
    if(!comment_list[post_id])
    {
      dispatch(commentActions.getCommentFB(post_id))
    }
  }, [])

  if(!comment_list[post_id] || !post_id)
  {
    return null;
  }

  return (
    <React.Fragment>
      <Grid >
       {
         comment_list[post_id].map(c=> {
           return (<CommentItem key = {c.id} {...c}/>);
         })
       }
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

CommentList.defaultProps = {
  post_id: null
}


const CommentItem = (props) => {

    const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;
    return (
        <BtnBox>
                <CtnBox>
                <Image shape="circle" src={college}/>
                <Text bold>{user_name}</Text>
                 </CtnBox>
            
                <Text margin="0px">{contents}</Text>
                <Text margin="0px">{insert_dt}</Text>
            
        </BtnBox>
    )
}

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "SOOSOO",
    user_id: "",
    post_id: 1,
    contents: "귀여운 고양이네요!",
    insert_dt: '2021-01-01 19:00:00'
}
const BtnBox = styled.div`
 ${Flexbox};
  justify-content: space-between;
  gap:20px;
`;
const CtnBox = styled.div`
 ${Flexbox};
  justify-content: flex-start;
  gap:20px;
`;

