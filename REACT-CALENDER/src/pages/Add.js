import React from "react";
import styled from "styled-components";

import { FlexboxColumn } from "../mixins";
import AddForm from "../components/AddForm";

const Add = (props) => {
  return (
    <Container>
      <AddForm history={props.history} />
    </Container>
  );
};

const Container = styled.section`
  ${FlexboxColumn};
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  min-width: 320px;
  max-width: 500px;
  padding: 0 30px;
  transform: translate(-50%, -50%);
`;

export default Add;
