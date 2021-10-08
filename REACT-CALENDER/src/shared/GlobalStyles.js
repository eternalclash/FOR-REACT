import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};

  @font-face {
    font-family: 'EliceDigitalBaeum_Regular';
    src: url('./font/NanumBrushScript-Regular.ttf')format('truetype');
    
}

  * {
    box-sizing: border-box;
    font-family: 'EliceDigitalBaeum_Regular', Arial, Helvetica, sans-serif;
  }

  body {
    color: ${({ theme }) => theme.colors.red};
    background-color: ${({ theme }) => theme.colors.lightBlue};
    font-family: 'EliceDigitalBaeum_Regular', Arial, Helvetica, sans-serif;

  }

  a {
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.red};
    }
  }

  button, 
  input,
  textarea {
    color: ${({ theme }) => theme.colors.white};
    background-color: transparent;
    border: none;
    outline: none;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
  color: transparent;
  background: none;
  z-index: 1;
}


  textarea {
    resize: none;
  }

  button {
    padding: 0;
    cursor: pointer;
  }
  

`;

export default GlobalStyles;
