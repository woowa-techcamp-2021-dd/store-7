import styled from "styled-components";
import { useState } from "react";
import { InputType } from "@/hooks/useInput";
import { ValidationType } from "@/hooks/useValidation";

type VIPropsType = {
  input: InputType;
  validation: ValidationType;
  placeholder?: string;
  message?: string;
  type?: string;
};

const ValidationInput = ({
  input,
  validation,
  message,
  placeholder,
  type = "text",
}: VIPropsType) => {
  const [isFirstType, setIsFirstType] = useState(true);
  const checkValidStyle = isFirstType || validation.isValid;

  const handleBlurInput = () => {
    setIsFirstType(false);
    validation.onCheck(input.value);
  };

  return (
    <InputWrapper>
      <input
        className={checkValidStyle ? "valid-input" : "invalid-input"}
        value={input.value}
        onChange={input.onChange}
        onBlur={handleBlurInput}
        placeholder={placeholder}
        type={type}
      />
      {!checkValidStyle && message && (
        <small className="input__err-message">{message}</small>
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem 2rem;

    ::placeholder {
      color: ${({ theme }) => theme.color.grey2};
    }
  }
  .valid-input {
    color: ${({ theme }) => theme.color.body};
    border: 1px solid ${({ theme }) => theme.color.light_grey2};
  }

  .invalid-input {
    color: ${({ theme }) => theme.color.error_color};
    border: 2px solid ${({ theme }) => theme.color.error_color};

    &:focus {
      color: ${({ theme }) => theme.color.body};
      border: 2px solid ${({ theme }) => theme.color.error_color};
    }
  }

  .input__err-message {
    color: ${({ theme }) => theme.color.error_color};
  }
`;

export default ValidationInput;
