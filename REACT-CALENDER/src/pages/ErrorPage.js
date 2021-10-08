import React from "react";
import styled from "styled-components";
import { RectangleBtn } from "../elements";
import { FlexboxColumn } from "../mixins";

const ErrorPage = (props) => {
  return (
    <Container>
      <Info>잘못된 접근입니다.</Info>
      <RectangleBtn onClick={() => props.history.push("/schedule")}>
        홈으로 돌아가기
      </RectangleBtn>
    </Container>
  );
};

const Container = styled.div`
  ${FlexboxColumn};
  align-items: center;
  width: 90%;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
`;

const Info = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: 20px;
`;

export default ErrorPage;
