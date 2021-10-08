import React from 'react';
import {Grid, Text, Image} from "../elements";
import { Flexbox, FlexboxColumn} from '../mixins';
import styled from 'styled-components';
const Card = (props) => {
    const {image_url, user_name, post_id,height} = props;
    return (
       
          <BtnBox>
          <Image src={image_url} size={40} shape="circle" />
          <Text>
            <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다{" "}
          </Text>
          </BtnBox>


      
         
    )
}

Card.defaultProps = {
    image_url : "http://via.placeholder.com/400x300",
    height: "300px"
}

export default Card;

const BtnBox = styled.div`
 ${Flexbox};
  justify-content: center;
  margin:30px auto;
  background-color:white;
  border: 1px solid red;
  border-radius: 10px;
  padding: 30px;
  min-width: 320px;
  max-width: 400px;
;
`;
