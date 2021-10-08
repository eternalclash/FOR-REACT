import React, { useState } from "react";   //리액트생성
import styled from "styled-components";    
import moment from "moment";   //날짜 moment
import { useDispatch } from "react-redux"; //dispatch

import { actionCreators as calendarActions } from "../redux/modules/calendar";  //actionCreators
import { Input, RectangleBtn, CancleBtn } from "../elements";   //elements
import { Flexbox } from "../mixins";  //Flexbox


const AddForm = (props) => {
  const { history } = props;  //props
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    color: "brick",
    title: "",
    date: moment().format("YYYY-MM-DD"),
    location: "",
    memo: "",
  });   //색깔, 제목, 날짜, 위치, 메모등 정보를 입력받음

  const { color, title, date, location, memo } = value;

  const handleSubmit = (e) => {
    if (!title.trim()) {    
      alert("제목 혹은 날짜를 확인해주세요.");
      return;
    }
     //문자열 좌우에서 공백을 제거 

    const schedule = {
      ...value,
      memo,
      date: parseInt(date.split("-").join("")),
      query: parseInt(date.slice(0, 5)),
      isCompleted: false,
    };

    dispatch(calendarActions.addCalendarFB(schedule));
    history.replace("/schedule");
  };

  return (
    <Form>
     
      <Input
        id="title"
        label="일정 제목*"
        type="text"
        _onChange={(e) => setValue({ ...value, title: e.target.value })}
        value={title}
      />

      <Input
        id="location"
        label="장소"
        type="text"
        _onChange={(e) => setValue({ ...value, location: e.target.value })}
        value={location}
      />
      <Input
        id="date"
        label="날짜*"
        type="date"
        _onChange={(e) => setValue({ ...value, date: e.target.value })}
        value={date}
      />
      <Input
        id="memo"
        label="메모"
        type="textarea"
        _onChange={(e) => setValue({ ...value, memo: e.target.value })}
        value={memo}
      />
      <BtnBox>
        <CancleBtn to="/schedule">취소</CancleBtn>
        <RectangleBtn type="button" onClick={handleSubmit}>
          일정 추가하기
        </RectangleBtn>
      </BtnBox>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
`;

const BtnBox = styled.div`
  ${Flexbox};
  justify-content: flex-end;
  gap: 20px;
`;

export default AddForm;
