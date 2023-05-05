import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

interface IProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  startIcon?: any;
  endIcon?: any;
  disabled?: boolean;
  isLoading?: boolean;
  sx?: Record<string, any>;
  onClick?: () => void;
}

const StyledSubmitButton = styled(Button)`
  width: 100%;
  border-radius: 50px;
  background-color: blue;
  
  &:hover {
    background-color: blue;
  }
`;

const SubmitButton = ({
  children, onClick, size = "medium", startIcon, endIcon, disabled, isLoading, sx = {},
}: IProps) => {
  const onClickAction = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <StyledSubmitButton
        variant="contained"
        type="submit"
        size={size}
        onClick={onClickAction}
        startIcon={startIcon}
        endIcon={endIcon}
        disabled={isLoading || disabled}
        sx={sx}
      >
        {children}
      </StyledSubmitButton>

      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default SubmitButton;
