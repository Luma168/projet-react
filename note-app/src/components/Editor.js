import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField'
import dayjs from 'dayjs'
import { Box, TextField } from "@mui/material"

export default function Editor({tempNoteTitle, tempNoteContent, setTempNoteTitle, setTempNoteContent, noteCreatedAt, noteUpdatedAt, drawerWidth}) {
    return (
        <Box
            sx={{
                height:'100%',
                marginLeft: `${drawerWidth}px`,
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent:'space-between',
                    marginBottom: '30px'
                }}
            >
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                            label="Crée le:"
                            format="DD - MM - YYYY"
                            value={dayjs(noteCreatedAt)}
                            sx={{
                                marginBottom: '10px',
                                marginLeft: '10px'
                            }}
                            />
                        <TimeField
                        label="à:"
                        value={dayjs(noteCreatedAt)}
                        sx={{
                            marginLeft: '10px'
                        }}
                        />
                    </LocalizationProvider>
                </Box>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                            label="Dérnière mise à jour le:"
                            format="DD - MM - YYYY"
                            value={dayjs(noteUpdatedAt)}
                            sx={{
                                marginLeft: '10px',
                                marginBottom: '10px'
                            }}
                            />
                        <TimeField
                        label="à:"
                        value={dayjs(noteUpdatedAt)}
                        sx={{
                            marginLeft: '10px'
                        }}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
            <TextField
                id="outlined-multiline-static"
                label="Titre"
                multiline
                rows={1}
                value={tempNoteTitle}
                fullWidth
                onChange={(e)=>{setTempNoteTitle(e.target.value)}}
                placeholder='Ecrire un titre'
                type='text'
                autoFocus
                required
                sx={{marginBottom: "50px"}}
            />

            <TextField
                id="outlined-multiline-static"
                label="Contenu"
                multiline
                rows={4}
                value={tempNoteContent}
                fullWidth
                onChange={(e)=>{setTempNoteContent(e.target.value)}}
                placeholder='Commencez à écrire'
                type='text'
                autoComplete='off'
                inputProps={{
                style: {
                    height: '45vh',  
                },
                }}
            />
        </Box>
    )
}