import React from "react";
import styled from "@emotion/styled";
import { createMediaQueries } from "lib/theme";
import { Box } from "@mui/material";

interface IBreakPointsProps {
  width: string;
  thickness: string;
  color: string;
}

interface IProps {
  xs?: IBreakPointsProps;
  sm?: IBreakPointsProps;
  md?: IBreakPointsProps;
  lg?: IBreakPointsProps;
  xl?: IBreakPointsProps;
  sx?: Record<string, any>;
}

const getProps = ({
  width = "100%",
  thickness = "1px",
  color = "#000",
}: IBreakPointsProps) => `
width: ${width};
height: ${thickness};
background-color: ${color};
border-radius: ${thickness};
`;

const StyledLine = styled(Box)<IProps>`
  ${(breakpoints) => createMediaQueries({ breakpoints, callback: getProps })}
`;

const Line = ({
  xs, sm, md, lg, xl, sx = {},
}: IProps) => (
  <StyledLine xs={xs} sm={sm} md={md} lg={lg} xl={xl} sx={sx} />
);

export default Line;
