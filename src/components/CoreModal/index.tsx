import React, { useEffect, useState } from "react";
import {
  Backdrop, Box, Fade, Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import Text from "../Text";

const StyledCloseIcon = styled(CloseIcon)`
  &:hover {
    cursor: pointer;
  }
`;

interface ISizes {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

interface IProps {
  open: boolean;
  children?: React.ReactNode;
  title?: React.ReactNode;
  sizes?: ISizes;
  onClose?: () => void;
}

const defaultSizes = { xs: "95%", lg: "50%" };

const style = {
  modal: (sizes) => ({
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sizes,
  }),
  wrapper: {
    backdropFilter: "blur(5px) brightness(80%)",
    borderRadius: "15px",
  },
  content: {
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto",
  },
};

const CoreModal = ({
  open, onClose, children, title, sizes = defaultSizes,
}: IProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  const onCloseModal = () => {
    setVisible(false);

    if (onClose) {
      setTimeout(() => onClose(), 100);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={visible}
      onClose={onCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={visible}>
        <Box sx={style.modal({ ...defaultSizes, ...sizes })}>
          <Box sx={style.wrapper} className="anim-pulse">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {
              title ? (
                <Box sx={{ pt: 1, pl: 1, pb: 1 }}>
                  <Text color="#fff" family="Poppins-Medium">{title}</Text>
                </Box>
              ) : null
            }
              <Text color="#fff">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <StyledCloseIcon onClick={onCloseModal} className="anim-pulse-on-hover" sx={{ pr: 1 }} />
                </Box>
              </Text>
            </Box>
            <Box sx={style.content}>
              {children}
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CoreModal;
