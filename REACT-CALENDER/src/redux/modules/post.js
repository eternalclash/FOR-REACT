import { createAction, handleActions } from "redux-actions";
import {produce} from "immer";
import { firestore } from "../../shared/firebase";
import { storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";
//액션타입 지정
const SET_POST= "SET_POST";
const ADD_POST  = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

//액션생수 함수
const setPost = createAction(SET_POST,(post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id,post}))
const deletePost = createAction(DELETE_POST, (post_id) => ({post_id}));

//state.post.list로 들고 올려고 일단은 list만 넣어줌
const initialState = {
    list: [],

}

//post에 관한 초기값을 하나 더 넣어줌
const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: "SOOSOO",
    //     user_profile: "https://twitter.com/Satomi_Gallery/status/1418408015426818053/photo/2"
    //   },
     
      image_url: "https://twitter.com/Satomi_Gallery/status/1418408015426818053/photo/3",
      contents: "가을이네요",
      comment_cnt: 0,  //댓글 초기화
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
     
     
}
const editPostFB = (post_id = null, post = {}) => {
    return function (dispatch, getState, { history }) {
      if (!post_id) {
        console.log("게시물 정보가 없어요!");
        return;
      }
  
      const _image = getState().image.preview;
  
      const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
      const _post = getState().post.list[_post_idx];
  
      console.log(_post);
  
      const postDB = firestore.collection("post");
  
      if (_image === _post.image_url) {
        postDB
          .doc(post_id)
          .update(post)
          .then((doc) => {
            dispatch(editPost(post_id, { ...post }));
            history.replace("/post");
          });
  
        return;
      } else {
        const user_id = getState().user.user.uid;
        const _upload = storage
          .ref(`images/${user_id}_${new Date().getTime()}`)
          .putString(_image, "data_url");
  
        _upload.then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              console.log(url);
  
              return url;
            })
            .then((url) => {
              postDB
                .doc(post_id)
                .update({ ...post, image_url: url })
                .then((doc) => {
                  dispatch(editPost(post_id, { ...post, image_url: url }));
                  history.replace("/post");
                });
            })
            .catch((err) => {
              window.alert("앗! 이미지 업로드에 문제가 있어요!");
              console.log("앗! 이미지 업로드에 문제가 있어요!", err);
            });
        });
      }
    };
  };

//thunk사용
const addPostFB = (contents="") => {
    return function (dispatch, getState, {history})
    {    const postDB = firestore.collection("post")
        const _user = getState().user.user;  //user정보가져오기
        
      const user_info = {
          user_name : _user.user_name,
          user_id: _user.uid,
          user_profile: _user.user_profile

      }
      const _post = {
          ...initialPost,
          contents: contents,
          insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
         
      };
      //컬렉션에 넣을 만한 정보인지
      
      const _image = getState().image.preview;

      const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url")  //중복파일명이 안생김

      _upload.then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
              console.log(url)

              return url;
          }).then(url => {
            postDB.add({...user_info, ..._post, image_url: url,}).then((doc)=> {
                //~~컬렉션의 데이터 추가 ~~~~/add()
                let post = {user_info, ..._post, id:doc.id, image_url:url}
                dispatch(addPost(post));
                history.replace("/post")
                dispatch(imageActions.setPreview(null))
                }).catch((err)=> //에러 방지
                    {
                     console.log('post작성 실패',err)
                    }
                )
          }).catch((err)=>{
              console.log("이미지 업로드 문제",err)
          })
      })
    

      

     
    }
  }

  

const getPostFB = () => {
    return function (dispatch,getState, {history}) {
        const postDB= firestore.collection("post") //파이어스토의 컬렉션에 정보를 가지고 옴
        postDB.get().then((docs) => {
            let post_list = []
            docs.forEach((doc) =>{
               
                // let _post = {
                //     id: doc.id,
                //     ...doc.data()
                // }
                // let post = {
                //     id: doc.id,  
                //     user_info: {
                //         user_name: _post.user_name,
                //         user_profile: _post.user_profile,
                //         user_id: _post.user_id,
                //       },
                     
                //       image_url: _post.image_url,
                //       contents: _post.contents,
                //       comment_cnt: 10,
                //       insert_dt: _post.insert_dt,
                      

                // }
                // post_list.push(post); //포스트 데이터 가져오기
                let _post = doc.data();  //딕셔너리의 키값들을 배열로 만들자
                let post = Object.keys(_post).reduce((acc,cur)=> {
                      if(cur.indexOf("user_") !== -1) {
                          return {...acc,
                            user_info: {...acc.user_info, [cur] : _post[cur]}}
                      }
                      return {...acc, [cur]: _post[cur]}
                },{id: doc.id, user_info:{} }) //key값들을 배열로 가져온다
                post_list.push(post);


            })
            console.log(post_list)
            dispatch(setPost(post_list))
        })
    }
}

const getOnePostFB = (id) => {
    return function(dispatch, getState, {history}){
      const postDB = firestore.collection("post");
      postDB
        .doc(id)
        .get()
        .then((doc) => {
          let _post = doc.data();
  
          if (!_post) {
            return;
          }
  
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );
  
          dispatch(setPost([post]));
        });
    }
  }

  const deletePostFB = (id) => {
    return function(dispatch, getState, {history}){

        // id가 없으면 return!
        if(!id){
            window.alert("삭제할 수 없는 게시글이에요!");
            return;
        }

        const postDB = firestore.collection("post");

        // 게시글 id로 선택해서 삭제하기!
        postDB.doc(id).delete().then(res => {
            dispatch(deletePost(id));
            history.replace('/post');
        }).catch(err => {
            console.log(err);
        })
    }
}
//리듀서 함수 적성 무조건 하기전에 immer의 produce를 가져온다
export default handleActions(
    {
           [SET_POST] : (state,action) => produce(state,(draft)=>{
                  draft.list = action.payload.post_list;
                  draft.list =draft.list.reduce((acc,cur)=> {
                      if(acc.findIndex(a=> a.id === cur.id)===-1){
                          return [...acc,cur];
                      }
                      else {
                          acc[acc.findIndex(a=> a.id === cur.id)] = cur;
                          return acc;
                      }
                  },[])
           }),
           [ADD_POST] : (state,action) => produce(state,(draft)=>{
            draft.list.unshift(action.payload.post);
           }),
           [EDIT_POST] : (state,action) => produce(state,(draft)=> {
            let idx = draft.list.findIndex((p) => p.id ===action.payload.post_id);  //배열을 뒤져서 조건을 주면 조건에 맞는 인덱스 번호를 주는 것
            draft.list[idx] = {...draft.list[idx], ...action.payload.post };
        }),
        [DELETE_POST]: (state, action) => produce(state, (draft) => {
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
    
            if(idx !== -1){
              // 배열에서 idx 위치의 요소 1개를 지웁니다.
              draft.list.splice(idx, 1);
            }
            
          }),
        
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
    editPostFB,
    editPost,
    getOnePostFB,
    deletePostFB,
}

export {actionCreators}