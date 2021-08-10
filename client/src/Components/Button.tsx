import { textLarge } from "@/styles/global-style";
import React, { MouseEventHandler, ReactChild } from "react";
import styled from "styled-components";

type ButtonType = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  primary?: boolean;
  disabled?: boolean;
  children: ReactChild;
  className?: string;
};

const Button = ({
  onClick,
  type = "button",
  primary = false,
  disabled = false,
  children,
  className,
}: ButtonType) => (
  <Container {...{ onClick, type, primary, disabled, className }}>
    {children}
  </Container>
);

const Container = styled.button<{ primary: boolean }>`
  ${textLarge}
  cursor: pointer;
  padding: 1.5rem 3rem;
  border: 0.1rem solid ${({ primary, theme }) => !primary && theme.color.line};
  border-radius: 1rem;
  color: ${({ primary, theme }) =>
    primary ? "#fff" : theme.color.title_active};
  background: ${({ primary, theme }) =>
    primary ? theme.color.primary1 : "#fff"};
`;

export default Button;