import React, { memo } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { Schedule } from "../elements";
import { actionCreators as modalActions } from "../redux/modules/modal";

const Date = memo((props) => {
  const { list, today, thisMonth, children } = props;
  const dispatch = useDispatch();

  const showModal = (id) => {
    dispatch(modalActions.showModal(id));
  };

  return (
    <DateBox today={today}>
      <DateNum today={today} thisMonth={thisMonth}>
        {children}
      </DateNum>
      {list.map((item) => {
        return (
          <Schedule
            key={item.id}
            isCompleted={item.isCompleted}
            color={item.color}
            _onClick={() => showModal(item.id)}
          >
            {item.title}
          </Schedule>
        );
      })}
    </DateBox>
  );
});

const DateBox = styled.div`
  ${({ theme, today }) => {
    const { colors } = theme;
    return css`
      padding: 7px;
      background-color: ${today === true ? colors.red: colors.lightBlue};
    `;
  }}
`;

const DateNum = styled.p`
  ${({ theme, today, thisMonth }) => {
    const { colors, fontSizes } = theme;
    return css`
      width: 100%;
      padding-bottom: 5px;
      font-size: ${fontSizes.sm};
      font-weight: 600;
      color: ${today === true ? colors.black : colors.red};
      opacity: ${thisMonth ? "100%" : "50%"};
    `;
  }}
`;

export default Date;
