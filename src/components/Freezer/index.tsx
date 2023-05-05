import React from "react";
import { Box } from "@mui/material";

interface IProps {
  message?: any;
  show?: boolean;
  withPadding?: boolean;
  children: React.ReactNode;
}

const Freezer = ({
  message = null, show = false, withPadding = false, children,
}: IProps) => (
  <Box sx={{ position: "relative", p: withPadding ? 1 : 0 }}>
    {
      show ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 2,
            backdropFilter: "blur(10px) brightness(100%)",
            width: "100%",
            height: "100%",
          }}
          className="anim-fade-in"
        >
          {message}
        </Box>
      ) : null
    }

    <Box sx={{ m: withPadding ? 2 : 0 }}>
      {children}
    </Box>
  </Box>
);

export default Freezer;
