import React from "react";
import {Grid, Text, Buttons, Image, Input} from "../elements";
import Upload from "../shared/Upload";
import { useSelector, useDispatch } from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post"
import {actionCreators as imageActions} from "../redux/modules/image"
const PostWrite = (props) => {
    const is_login = useSelector((state) => state.user.is_login) //islogin을 통해 postwrite가능한지가능하지 않은지
    const {history} = props;
    const preview = useSelector((state) => state.image.preview)
  
     
    const dispatch = useDispatch()

    const addPost = () => {
      dispatch(postActions.addPostFB(contents));
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, {contents: contents}))
    }

  const post_list = useSelector((state) => state.post.list)

  console.log(post_list)

  const post_id = props.match.params.id;

  const is_edit = post_id ? true : false;

  let _post = is_edit? post_list.find((p) => p.id=== post_id) : null;

  console.log(_post);

  const [contents,setContents] = React.useState(_post? _post.contents :"")

  const changeContents = (e) => {
      setContents(e.target.value)
  }
   React.useEffect(()=> {
    if(is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
   },[])
   

    //history.push 새로 가는 거고, history.replace 갈아끼우는 것이다
    if(!is_login) {
        return(
            <Grid>
                <Text>잠시만요..</Text>
                <Text>로그인 해야합니다</Text>
                <Buttons _onClick={()=> {history.replace("/")}}></Buttons>
            </Grid>
        )
    }

    return (
      <React.Fragment>
        <Grid padding="16px" >
          <Text margin="0px" size="36px" bold>
            {is_edit? "게시글 수정" : "게시글 작성"}
          </Text>
          <Upload/>
        </Grid>

        <Grid>
          <Grid padding="16px">
            <Text margin="0px" size="24px" bold>
            <Image
            shape="rectangle"
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          />
            </Text>
          </Grid>

          <Image shape="rectangle" />
        </Grid>

        <Grid padding="16px">
          <Input value={contents} label="게시글 내용" placeholder="게시글 작성"  _onChange={changeContents} multiLine/>
        </Grid>

        <Grid padding="16px">
         {is_edit? <Buttons text="게시글 수정" _onClick={editPost}></Buttons>  :
         <Buttons text="게시글 작성" _onClick={addPost}></Buttons>  } 
        </Grid>
      </React.Fragment>
    );
}

export default PostWrite;