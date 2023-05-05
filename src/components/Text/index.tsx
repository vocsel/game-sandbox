import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const sizes = {
  xxl: "72px",
  xl: "64px",
  lg: "48px",
  md: "32px",
  mds: "24px",
  regular: "16px",
  sm: "14px",
  xs: "12px",
  micro: "10px",
  nano: "8px",
};

type SizeType = "nano" | "micro" | "xs" | "sm" | "regular" | "mds"| "md" | "lg" | "xl" | "xxl";

interface IStyledProps {
  fontStyle: string;
  size: SizeType;
  family: string;
  align?: string;
  shadow?: string;
  decoration?: string;
  uppercase?: boolean,
  lowercase?: boolean,
  capitalize?: boolean
}

interface IProps {
  children: React.ReactNode
  id?: string;
  size?: SizeType;
  color?: string;
  style?: string;
  family?: string;
  align?: string;
  shadow?: string;
  decoration?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  inline?: boolean;
  sx?: Record<string, any>;
  className?: string;
}

const getComponent = ({
  size,
  family,
  color,
  fontStyle,
  align,
  decoration,
  uppercase,
  lowercase,
  capitalize,
  shadow,
}) => `
  font-size: ${sizes[size]};
  font-family: '${family}';
  color: ${color};
  font-style: ${fontStyle};
  text-align: ${align};
  word-break: break-word;
  ${(shadow ? `text-shadow: ${shadow};` : "")}
  ${(decoration ? `text-decoration: ${decoration};` : "")}
  ${(uppercase ? `text-transform: ${uppercase};` : "")}
  ${(lowercase ? `text-transform: ${lowercase};` : "")}
  ${(capitalize ? `text-transform: ${capitalize};` : "")}
`;

const StyledBox = styled(Box)<IStyledProps>`
  ${(props) => getComponent(props)}
`;

const Text = ({
  children,
  id,
  size = "regular",
  family = "Poppins-Regular",
  color = "#000",
  style = "regular",
  align = "left",
  shadow,
  decoration,
  uppercase,
  lowercase,
  capitalize,
  inline,
  sx = {},
  className = "",
}: IProps) => (
  <StyledBox
    component={inline ? "span" : "div"}
    id={id}
    size={size}
    family={family}
    color={color}
    fontStyle={style}
    align={align}
    shadow={shadow}
    decoration={decoration}
    uppercase={uppercase}
    lowercase={lowercase}
    capitalize={capitalize}
    sx={sx}
    className={className}
  >
    {children}
  </StyledBox>
);

export default Text;
