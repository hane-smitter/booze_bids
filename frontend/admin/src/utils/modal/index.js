import React from 'react';
import { Box, IconButton, Card, CardHeader } from '@mui/material';
import { motion, usePresence } from 'framer-motion';
import ClearIcon from '@mui/icons-material/Clear';

const Modal = ({ isVisible, toggler, component, title, ...others }) => {
    const [isPresent, safeToRemove] = usePresence();

    React.useEffect(() => {
        !isPresent && toggler(false);
        !isPresent && setTimeout(safeToRemove, 1000);
    }, [isPresent]);
    const backdrop = {
        visible: {
            opacity: 1,
            pointerEvents: 'all',
        },
        hidden: {
            opacity: 0,
            pointerEvents: 'none'
        }
    }
    const modal = {
        visible: {
            y: "80px",
            opacity: 1,
            transition: {
                delay: 1,
                type: "spring"
            }
        },
        hidden: {
            y: "100vh",
            opacity: 0
        }
    }
    return (
        <>
        <Box
            component={motion.div}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.6',
                zIndex: 99
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
                    padding: "20px 5px",
                    background: "#fff",
                    textAlign: "center"
                }}
                variants={modal}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >
                <Card sx={{ paddingInline: '10px', maxHeight: '70vh', overflowY: "auto" }}>
                    <CardHeader
                        action={
                        <IconButton
                            aria-label="close"
                            onClick={() => toggler(false)}
                        >
                            <ClearIcon />
                        </IconButton>
                        }
                        title={title}
                    />
                    {component}
                </Card>
            </Box>

        </Box>
    </>
    );
}

/* Modal.propTypes = {
  component: PropTypes..isRequired
}; */

export default Modal;
