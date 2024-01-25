import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export default function Loader({loaderTrigger, showLoader, setShowLoader}) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    useEffect(() => {
        return () => {
        clearTimeout(timer.current);
        };
    }, []);

    const handleLoaderTrigger = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
    if(loaderTrigger){
        handleLoaderTrigger()
        setTimeout(() => {
            
            setShowLoader((show)=>!show)
        }, 1500);
    }
    }, [loaderTrigger])

    return (
        
        showLoader ? 
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: '15px', right: '15px'}}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Fab
                aria-label="save"
                color="primary"
                sx={buttonSx}
                >
                {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {loading && (
                <CircularProgress
                    size={68}
                    sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                    }}
                />
                )}
            </Box>
        </Box>
        :
        null
        
    );
}