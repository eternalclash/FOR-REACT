import React from "react";
import styled from "styled-components";

const Overlay = () => {
  return <OverlayBox></OverlayBox>;
};

const OverlayBox = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 90%;
  z-index: 10;
`;

export default Overlay;
