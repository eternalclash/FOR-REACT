import React, { memo } from "react";
import styled from "styled-components";
import { FlexboxColumn } from "../mixins";

const Input = memo((props) => {
  const { type, label, id, placeholder, value, _onChange } = props;

  if (type === "textarea") {
    return (
      <InputBox>
        <CustomLabel htmlFor={id}>{label}</CustomLabel>
        <CustomTextarea
          id={id}
          onChange={_onChange}
          value={value}
        ></CustomTextarea>
      </InputBox>
    );
  }
  

  if (type === "date") {
    return (
      <InputBox>
        <CustomLabel htmlFor={id}>{label}</CustomLabel>
        <CustomInput
          type="date"
          id={id}
          onChange={_onChange}
          value={value}
          placeholder={placeholder}
          min="2000-01-01"
          max="2100-12-31"
        />
      </InputBox>
    );
  }

  return (
    <InputBox>
      <CustomLabel htmlFor={id}>{label}</CustomLabel>
      <CustomInput
        type={type}
        id={id}
        placeholder={placeholder}
       onChange={_onChange}
       value={value}
         
      />
    </InputBox>
  );
});

Input.defaultProps = {
  id: Date.now(),
  label: "",
  placeholder: "",
  value: "",
  _onChange: () => {},
};

const InputBox = styled.div`
  ${FlexboxColumn}
  margin-bottom: 30px;

  &:focus {
    label {
      color: red;
    }
  }
`;

const CustomLabel = styled.label`
  display: inline-block;
  width: 100px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.red};
  font-weight: 600;
`;

const CustomInput = styled.input`
  border-bottom: 2px solid ${({ theme }) => theme.colors.red};
  color:red;
`;

const CustomTextarea = styled.textarea`
  border: 2px solid ${({ theme }) => theme.colors.red};
  min-height: 100px;
  color:red;
`;

export default Input;
