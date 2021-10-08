import React, { memo } from "react";
import styled, { css } from "styled-components";
import { FlexboxColumn } from "../mixins";

const ModalHeader = memo((props) => {
  const { color, title, isCompleted } = props;
  return (
    <Header color={color}>
      <Label>{isCompleted ? "완료" : "미완료"}</Label>
      <Title>{title}</Title>
    </Header>
  );
});

ModalHeader.defaultProps = {
  color: "lightGray",
};

const Header = styled.div`
  ${FlexboxColumn};
  justify-content: center;
  height: 30%;
  background-color: ${({ color, theme }) => theme.label[color]};
  padding: 20px;
`;

const Label = styled.span`
  font-weight: 600;
  color: white;
`;

const Title = styled.h3`
  ${({ theme }) => {
    const { device, fontSizes } = theme;
    return css`
      margin-top: 10px;
      font-size: ${fontSizes.lg};
      font-weight: 600;
      color: white;

      ${device.tablet} {
        font-size: ${fontSizes.xl};
      }
    `;
  }}
`;

export default ModalHeader;
