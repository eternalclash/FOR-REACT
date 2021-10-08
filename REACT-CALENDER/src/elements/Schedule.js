import React, { memo } from "react";
import styled from "styled-components";
import {FaSmile} from "react-icons/fa"
import {FaRegGrinAlt} from "react-icons/fa"
const Schedule = memo((props) => {
  const { isCompleted, color, _onClick, children } = props;
  

  //Schedule버튼이 isCompleted를 통해서 완성인지 미완성인지 찾아봄
  if(isCompleted)
  return (
    <ScheduleBtn type="button" color={color} onClick={_onClick}>
     <FaSmile/>{children}
    </ScheduleBtn>
  );
  else
  return (
    <ScheduleBtn type="button" color={color} onClick={_onClick}>
      <FaRegGrinAlt/>{children}
    </ScheduleBtn>
  );
});

const ScheduleBtn = styled.button`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0 3px 2px 3px;
  margin-bottom: 3px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, color }) => theme.label[color]};
  font-size: ${({ theme }) => theme.fontSizes.xm};
  white-space: nowrap;
  overflow: hidden;
`;

export default Schedule;
