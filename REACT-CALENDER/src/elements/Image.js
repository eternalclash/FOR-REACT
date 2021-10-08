import styled from "styled-components";
import React from 'react';


const Image = (props) => {
    const {shape, src, size} = props;
    const styles = {
        src: src,
        size: size,

    }
    if(shape ==="circle")
    {
        return(
            <ImageCircle {...styles}>

            </ImageCircle>
        )
    }
   if(shape === "rectangle")
    {
        return (
           <AspectOutter>
            <AspectInner {...styles}></AspectInner>
           </AspectOutter>

        )
    }
    if(shape === "box")
    {
        return (
            <Box {...styles}></Box>
        )
    }
    
    return (
        <React.Fragment>
            <ImageDefault ></ImageDefault>
        </React.Fragment>
    )
}

Image.defaultProps = {
    shape: "circle",
    src: "../college.jpg",
    size: 36,

};
const ImageDefault = styled.div `
width: 30px;
height: var(--size);
background-image: url(${(props)=>props.src});
background-size: cover;

`


const AspectOutter = styled.div `
 width: 100%;
 max-width:250px

`

const AspectInner = styled.div`
 position:relative;
 padding-top: 75%;
 overflow: hidden;  //넘치는 것들은 다 가리기
 background-image: url(${(props)=>props.src});

 background-size: cover;
`
const Box = styled.div`
width: 100%;
height: 500px;
background-image: url(${(props)=>props.src});
position:relative;
background-size: cover;
overflow: hidden;  //넘치는 것들은 다 가리기

`

const ImageCircle = styled.div`
 --size: ${(props)=> props.size}px; 
 width: var(--size);
 height: 36px;
 border-radius: var(--size);

 background-image: url(${(props)=>props.src});
 background-size: cover;
 margin: 4px;
`

export default Image;