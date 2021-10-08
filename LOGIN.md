로그인/인증구현

이번 프로젝트에서는 OAUTH 동작 방식을 활용해서 구현을 했다<br>
OAuth 동작 방식:<br>
1. 클라이언트와 서버 사이에 인증(로그인)하면 서버가 access_token을 이용해서 api 요청을 할 수 있다.
2. 클라이언트는 access_token을 이용해서 api요청을 할 수 있다.
3. 서버는 api 요청을 받고, access_token을 가지고 권한이 있나 없나 확인해서 결과를 클라이언트에 보내줌

JWT: JSON형태로 이루어져 있는 토큰의 형식
* 생김새: [header] [.payload] [.signature]
  * header: 토큰 타입 + 암호화 방식 정보
  * payload: 토큰에 담을 정보 name:value 쌍으로 들어감
  * signature: 서명 정보, secret key를 포함한 header와 payload 정보가 들어감

* 동작방식
  * 유저가 로그인 시도,
  * 서버가 요청을 확인하고 secret key를 가지고 access_token 발급
  * 클라이언트에 JWT를 전달하고
  * 클라이언트는 API 요청을 할 떄 Authorization JWT를 보냄
  * 서버는 JWT의 서명 확인하고 payload 정보를 확인

HTTP는 1번 요청하고 응답을 받으면 연결 해제 즉 access_token을 어딘가에 저장해야 한다.  <br>
* HTTP의 특징
  * connectionless:클라이언트가 요청을 한 후 응답을 받으면 그 연결을 끊어 버리는특징
  * stateless: 통신이 끝나면 상태를 유지하지 않는 특징<br>

즉, 페이지를 넘어가도 데이터를 유지하기 위해서는 쿠키와 세션이라는 것이 필요하다

쿠키: 
  * 클라이언트(브라우저) 로컬에 저장되는 키와 값이 들어간 작은 데이터 파일
  * 클라이언트의 상태 정보를 로컬에 저장,참조
  * 사용자가 따로 요청하지 않아도 브라우저가 Request시에 Request Header를 넣어서 자동으로 서버에 전송
  * 동작 방식: <br>
    1. 클라이언트가 페이지 요쳥
    2. 서버에서 쿠키 생성
    3. HTTP 헤더에 쿠키 포함시켜 응답
    4. 브라우저가 종료되어도 쿠키 만료 기간에 따라 클라이언트가 보관
    5. 같은 요청을 할 경우 HTTP 헤더에 쿠키를 함께 보냄
    6. 서버에서 쿠키를 읽어 이전 상태 정보와 비교 변경할 사항은 쿠키를 업데이트하여 HTTP 헤더에 포함

세션: <br>
 * 세션은 쿠키 기반, 사용자 정보 파일을 서버 측에서 관리
 * 서버에서는 클라이언트 구분하기 위해 세션 ID 부여 웹 브라우저가 서버에 접속하면 브라우저 종료할 때까지 인증상태 유지
 * 접속 시간에 제한을 두어 일정 시간 응답 없다면 정보 유지X
 * 사용자에 대한 정보를 서버에 두어서 보안은 좋지만, 서버 메모리를 많이 차지하면 서버에 과부하가 옴(성능 저하의 요인)
 * 클라이언트가 Request보내면, 해당 서버가 클라이언트에 유일한 ID 부여 이것이 세션ID<br>

 user.js 리덕스 파일

```javascript
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import firebase from "firebase/app";
import { auth } from "../../shared/firebase";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions







const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          console.log(user);

          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );

          history.push("/post");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode, errorMessage);
        });
    });
  };
};

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, {history}){

    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {

        console.log(user);
        
        auth.currentUser.updateProfile({
          displayName: user_name,
        }).then(()=>{
          dispatch(setUser({user_name: user_name, id: id, user_profile: ''}));
          history.push('/');
        }).catch((error) => {
          console.log(error);
        });

        // Signed in
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });

  }
}
const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.push("/");
    });
  };
};
//로그인 유지
const loginCheckFB = () => {
  return function (dispatch,getState, {history}) 
  {
    auth.onAuthStateChanged((user)=> {
      if(user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );

      }else {
        dispatch(logOut());
      }
    })
  }
}


// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB
};

export { actionCreators };


```

리듀서 생성 순서 <br>

action 생성<br>
```javascript
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
```
로그아웃, 회원정보를 가지고 오는 것을 생성<br>

action 생성함수<br>
```javascript
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
```
user를 state로<br>

initialState state초기화값<br>
```javascript
const initialState = {
  user: null,
  is_login: false,
};
```
해당하는 user의 정보와 로그인 상태를 is_login 불린형으로 표현<br>

reducer(handleActions)작성
```javascript
export default handleActions (
    {
        [SET_USER] : (state,action) => 
        produce(state, (draft)) => {
            setCookie("is_login", "success")
            draft.user = action.payload.user;
            draft.is_login = true
        }),
        [LOG_OUT]: (state,action) => 
        produce(state,(draft)) => {
            deleteCookie("is_login");
            draft.user = null;
            draft.is_login = false;
        }),
        [GET_USER] : (state, action) => produce(state,(draft)=> {}),
      
    },  initialState
)
```
immer라는 불변성을 유지하는데 도와주는 라이브러리인데, react 기본속성에 대한 이해가 필요하다 <br>
예를 들어, 컴포넌트가 리렌더링 상황이라 가정하고, 배열인 state를 state.push()를 통해서 비앨에 직접 접근하고 요소를 추가하지만<br>
***하지만 리액트는 state라는 값은 새로운 참조값이 아니기 때문에 이전과 같은 값이라고 인식하고 리렌더링을 하지 않는다***
즉 state를 바꾸고 돔을 다시 만들어야 react는 이전과 다른 참조값임을 알려야 한다<br>
즉, 불변성은 어떤 값을 직접적으로 변경하지 않고 새로운 값 만들어내는 것이다.
필요한 값을 변형하고 싶으면 어떤 값에 대한 사본을 만들어서 사용해야 한다

```javascript  
onst signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, {history}){

    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {

        console.log(user);
        
        auth.currentUser.updateProfile({
          displayName: user_name,
        }).then(()=>{
          dispatch(setUser({user_name: user_name, id: id, user_profile: ''}));
          history.push('/');
        }).catch((error) => {
          console.log(error);
        });

        // Signed in
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });

  }
}

```
미들웨어: 액션과 리듀서 사이의 중간자로서, 액션을 디스패치할 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업을 실행할 수 있게 해줌<br>
미들웨어 중에서도 redux-thunk를 활용하여 구현<br>
```javascript
return function (dispatch, getState, {history} ) {
  dispatch(setUser({
      user_name: user_name, id: id,
      user_profile:' '
  })) history.push('/')
}.catch((error) => {
    console.log(error)
}
```
auth를 통한 firebase로그인 인증형식을 가지고 오고, thunk에서 매개변수로 dispatch, getState, {history}를 가지고와서 setUser를 바꿔준다음 history.push를 통해 페이지를 넘기 또한 error가 날 경우 .catch문을 활용해 콘솔창을 띄움

로그인 하는 방식은 회원가입 형식가 비슷함



```javascript
const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.push("/");
    });
  };
};

```
로그아웃: initialState처럼 값을 다시 초기화 시켜주면 된다

```javascript
const loginCheckFB = () => {
  return function (dispatch,getState, {history}) 
  {
    auth.onAuthStateChanged((user)=> {
      if(user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );

      }else {
        dispatch(logOut());
      }
    })
  }
}
```
로그인유지를 시켜주는 logincheck는 파이어베이스에 onAuthStateChanged메소드를 사용하여 user가 존재하면 그 유저의 대한 정보를 가져오면 된다.








  
