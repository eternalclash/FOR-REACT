import React from "react";
import styled from "styled-components";

const Buttons = (props) => {
  const { text, _onClick, is_float, children, margin, width, is_gloat,is_logout, is_alarm } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text? text : children}</FloatButton>
      </React.Fragment>
    );
  }
  if (is_gloat) {
    return (
      <React.Fragment>
        <GloatButton onClick={_onClick}>{text? text : children}</GloatButton>
      </React.Fragment>
    );
  }

  if (is_logout) {
    return (
      <React.Fragment>
        <LogoutButton onClick={_onClick}>{text? text : children}</LogoutButton>
      </React.Fragment>
    );
  }
  if (is_alarm) {
    return (
      <React.Fragment>
        <AlarmButton onClick={_onClick}>{text? text : children}</AlarmButton>
      </React.Fragment>
    );
  }


  const styles = {
    margin: margin,
    width: width,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>{text? text: children}</ElButton>
    </React.Fragment>
  );
};

Buttons.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: '100%',
  is_gloat: false,
  is_logout: false,
  is_alarm: false,
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #212121;
  color: #ffffff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin? `margin: ${props.margin};` : '')}
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;
const GloatButton = styled.button`
  width: 50px;
  height: 50px;
 
  background-size:cover;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom:110px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;
const LogoutButton = styled.button`
  width: 50px;
  height: 50px;

  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  top: 10px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;

const AlarmButton = styled.button`
  width: 50px;
  height: 50px;
  
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  top: 70px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;
export default Buttons;