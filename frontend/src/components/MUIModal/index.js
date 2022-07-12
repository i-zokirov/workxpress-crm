import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "components/MDBox";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
};

const TransitionModal = ({ open, onClose, children, title, description }) => {
    const [controller, dispatch] = useMaterialUIController();
    const { darkMode } = controller;

    const [isMobile, setIsMobile] = useState(false);

    //choose the screen size
    const handleResize = () => {
        setIsMobile(window.innerWidth < 720);
    };

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize);
    });

    return (
        <Modal
            aria-labelledby={`transition-modal-${title}`}
            aria-describedby={`transition-modal-${description}`}
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            sx={{ overflow: "scroll" }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        ...style,
                        width: `${isMobile ? "400px" : "600px"}`,
                        bgcolor: `${darkMode ? "#344767" : "background.paper"}`,
                    }}
                >
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default TransitionModal;
