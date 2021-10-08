최소단위 컴포넌트<br/></br>

컴포넌트에 스타일(css)를 지정해놓고 활요하면 여러 조각으로 분리하여 효율적으로 사용이 가능하다.
이번 프로젝트에서 elements폴더에 필요한 styled-component를 사용하여 button,input 등을 지정해 놓았다.

```javascript
import React from 'react'
import styled from 'styled-components'

const Grid = (props) => {
    const {is_flex, width, margin, padding, bg, children,center, _onClick} = props;

    const styles = {
        is_flex : is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
        center: center,
        children: children
    }
    return (
        <React.Fragment>
          <GridBox {...styles} onClick={_onClick}>  
            {children} 
          </GridBox>
        </React.Fragment>
    )
}

Grid.defaultProps = {
    children:null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,  //만약에 패딩과 margin의 값이 있으면 그거 그대로 들어가게 하기 위한 설정
    bg:false,
    center: false,
    _onClick: () => {},
}

const GridBox = styled.div `
  width : ${(props) => props.width};
 
  box-sizing: border-box; //테두리까지 포함한다는 마인드
  ${(props) => props.padding?`padding: ${props.padding}`: ''}
  ${(props) => props.margin?`margin: ${props.margin}`: ''}
  ${(props) => props.bg?`background-color: ${props.bg}`: ''}
  ${(props) => props.is_flex?'display: flex; align-items: center; justify-content: space-between;' : ""};
  ${(props) => props.center? 'text-align: center;' : ""};

`

export default Grid;
```
대표적인 예를 elements에 있는 Grid컴포넌트를 통해 설명하겠다! <br>
```javascript
import React from 'react'
import styled from 'styled-components'
```
첫번째로, 필요한 styled-components를 설치하고 import해오자!<br/><br/>

```javascript
Grid.defaultProps = {
    children:null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false, 
    center: false,
    _onClick: () => {},
}
```
이 컴포넌트를 사용할 때 그때 그때 상황에 맞게 커스텀하기 위한 css요소들을 지정하고 css의 값을 false로 두어서 
`<Grid margin="30px">`예를 들어 margin을 넣고 싶을 때는 이렇게 값을 태그안에 주어서 실행할 수 있게 만들었다

```jsp
const GridBox = styled.div `
  width : ${(props) => props.width};
 
  box-sizing: border-box; //테두리까지 포함한다는 마인드
  ${(props) => props.padding?`padding: ${props.padding}`: ''}
  ${(props) => props.margin?`margin: ${props.margin}`: ''}
  ${(props) => props.bg?`background-color: ${props.bg}`: ''}
  ${(props) => props.is_flex?'display: flex; align-items: center; justify-content: space-between;' : ""};
  ${(props) => props.center? 'text-align: center;' : ""};

```
styled-components의 속성을 활용하여 jsx형식에 맞게 하나의 태그로 감싸줄려고 GridBox라는 컴포넌트를 형성했다.
Grid 컴포넌트를 쓸 때 고정적으로 지정해야 하는 값들은 
일반 css 스타일처럼 지정했고 가변적인 요소들은
```javascript
${(props)=>props.margin?`margin: ${props.margin}`: ' '}
```
아까 지정했던 defaultProps에 false로 지정된 요소들이 만약 사용될 때 값을 지정해서 true로 바뀌면 사용된 값을 사용하고 사용이 안되면 빈 값을 두어서 css요소가 실행이 되지 않게 삼항연산자를 통해 표현한다.

```javascript
 const {is_flex, width, margin, padding, bg, children,center, _onClick} = props;

```
비구조화 할당을 통해 props의 값을 읽어들여오고

```javascript
const styles = {
        is_flex : is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
        center: center,
        children: children
    }
```
styles라는 변수에 props의 값들을 한 번에 지정하기 위해 묶는다.


```javascript
 <GridBox {...styles} onClick={_onClick}>  
 ```
 아까 형성했던 GridBox에 스프레드 문법을 통해{...styles}를 만들면 된다 

 !!!이벤트리스너 등록하기<br>
 클릭했을 때 아벤트가 실행되는 onClick함수를 _onClick = () => {}라는 형식을 놨두려면 첫 번쨰

 ```javascript
Grid.defaultProps = {
    
    _onClick: () => {},
}

 ```
이렇게 defaultProps에 등록하고

```javascript
    const { _onClick} = props;
```
_onClick를 할당하고

```javascript
<GridBox {...styles} onClick={_onClick}> 
```
onClick이벤트리스너를 {_onClick}으로 등록시켜준다!
태그 안에 꼭 등록을 해야 실행이 가능해진다.