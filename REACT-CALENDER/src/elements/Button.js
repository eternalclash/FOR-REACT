
import styled, { css } from "styled-components";
import { Flexbox } from "../mixins";

// 공통 스타일
const Btn = css`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      ${Flexbox};
      color: ${colors.black};
      background-color: ${colors.white};
      transition: background-color 200ms ease-in-out;

      &:hover {
        color: ${colors.lightBlue};
        background-color: ${colors.lightGray};
      }
    `;
  }}
`;

const RectangleBtn = styled.button`
  ${({ theme }) => {
    const { fontSizes } = theme;
    return css`
      ${Btn};
      padding: 10px;
      border-radius: 5px;
      font-size: ${fontSizes.sm};
      font-weight: 600;
    
    `;
  }}
`;

const CancleBtn = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 10px;
`;

const ModeBtn = styled.button`
  ${({ theme }) => {
    const { fontSizes, device } = theme;
    return css`
      ${Flexbox};
      ${Btn};
      color:red;
      position: absolute;
      bottom: 10px;
      right: 10px;
      padding: 5px;
      font-weight: 600;

      ${device.tablet} {
        padding: 5px 10px;
        font-size: ${fontSizes.md};
      }
    `;
  }}
`;

export { RectangleBtn, CancleBtn, ModeBtn };
