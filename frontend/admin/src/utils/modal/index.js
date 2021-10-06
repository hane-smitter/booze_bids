import React from "react";
import ReactDOM from 'react-dom';
import { Box, IconButton, Card, Typography, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import ClearIcon from "@mui/icons-material/Clear";

const Modal = ({ isVisible, close, title, children, ...others }) => {
  
  const backdrop = {
    visible: {
      opacity: 1,
      pointerEvents: "all",
      delay: .1,
    },
    hidden: {
      opacity: 0,
      pointerEvents: "none",
    },
  };
  const modal = {
    visible: {
      y: "80px",
      opacity: 1,
      transition: {
        delay: 1,
        type: "spring",
      },
    },
    hidden: {
      y: "100vh",
      opacity: 0,
    },
  };
  return isVisible ? ReactDOM.createPortal(
    <>
      <Box
        component={motion.div}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: (theme) => theme.zIndex.modal,
        }}
        variants={backdrop}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        {...others}
      >
        <Box
          component={motion.div}
          style={{
            borderRadius: "10px",
            maxWidth: "40%",
            marginInline: "auto",
            padding: "0 5px 10px 5px",
            background: "#fff",
            textAlign: "center",
          }}
          variants={modal}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <Box sx={{ display: "flex", padding: "5px" }}>
            {title && (
              <Typography variant="h3" sx={{ margin: "auto", letterSpacing: 0.5 }}>
                {title}
              </Typography>
            )}
            <Tooltip title="close" arrow>
              <IconButton
                aria-label="close"
                sx={{ marginInlineStart: "auto" }}
                onClick={close}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Card
            sx={{ paddingInline: "10px", maxHeight: "70vh", overflowY: "auto" }}
          >
            {children}
          </Card>
        </Box>
      </Box>
    </>, document.body
  ) : null;
};

/* Modal.propTypes = {
  component: PropTypes..isRequired
}; */

export default Modal;
