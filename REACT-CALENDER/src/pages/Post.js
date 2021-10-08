import React from "react";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";
import styled from "styled-components";
import Grid from "../elements/Grid";
import autumn from "../autumn.jpeg"
import Text from "../elements/Text"
import Image from "../elements/Image"
import college from "../college.jpg"
import { FlexboxColumn, Flexbox } from "../mixins";
import { RectangleBtn } from "../elements";
import { Buttons } from "../elements";
import Permit from "../shared/Permit";
import { useHistory,} from "react-router";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";
const Post = (props) => {
    const history =useHistory();
    const dispatch = useDispatch();
    return (
      <Container>
        <Grid isflex>
            
          <BtnBox>
              <Image shape="circle" src={college} />
              <Text bold>{props.user_info.user_name}</Text>
              <RightBox>
              <Text>{props.insert_dt}</Text>
              {props.is_me && (<Buttons width="60px" padding="4px" margin="4px" _onClick={() => {history.push(`/write/${props.id}`)}}>수정</Buttons>)}
               {props.is_me && (<Buttons width="60px" padding="4px" margin="4px" _onClick={(e)=>{dispatch(postActions.deletePostFB(props.id))}}>삭제</Buttons>)}
             </RightBox>
             </BtnBox>
            
          <Grid padding="16px">
            <Text>{props.contents}</Text>
          </Grid>
          <Grid>
            <Image shape="rectangle" src={props.image_url} height="3000px" shape="box" />
          </Grid>
          <Grid padding="16px">
            <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
          </Grid>
        </Grid>
        <Permit>
         
         </Permit>
      </Container>
     
    );
}

Post.defaultProps = {
  user_info: {
    user_name: "SOOSOO",
    user_profile: "https://twitter.com/Satomi_Gallery/status/1418408015426818053/photo/2"
  },
 
  image_url: "https://twitter.com/Satomi_Gallery/status/1418408015426818053/photo/3",
  contents: "가을이네요",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

const Container = styled.section`
  ${FlexboxColumn};
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  max-width: 1000px;
`;
const BtnBox = styled.div`
 ${Flexbox};
  justify-content: flex-start;
  gap: 20px
;
`;

const RightBox = styled.div`
  ${Flexbox};
  justify-content: flex-end;
  gap: 20px;
`

export default Post;