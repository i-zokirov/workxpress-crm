import React, {useEffect,useState} from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from 'components/MDBox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const TransitionModal = ({open, onClose, children, title, description}) => {
    const [isMobile, setIsMobile] = useState(false)

    //choose the screen size 
    const handleResize = () => {
        setIsMobile(window.innerWidth < 720)
    }

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

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
        >
            <Fade in={open}>
                <Box sx={{...style, width: `${isMobile ? "400px" : "600px"}`}}>
                    {children}
                </Box>
            </Fade>
      </Modal>
    )
}

export default TransitionModal