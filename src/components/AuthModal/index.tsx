import React, { useEffect, useState } from "react";
import CoreModal from "components/CoreModal";
import Text from "components/Text";
import { Box } from "@mui/material";
import Register from "./register";
import Login from "./login";

const AuthModal = ({ open, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState<"login" | "register">("login");

  useEffect(() => {
    setVisible(open);
  }, [open]);

  return (
    <CoreModal
      sizes={{ xs: "95%", lg: "40%" }}
      title={page.toUpperCase()}
      open={visible}
      onClose={onClose}
    >
      {page === "login" ? <Login /> : <Register />}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
        onClick={() => setPage(page === "login" ? "register" : "login")}
      >
        <Text
          color="blue"
          className="clickable"
          decoration="underline"
        >
          {page === "login" ? "register" : "login"}
        </Text>
      </Box>
    </CoreModal>
  );
};

export default AuthModal;
