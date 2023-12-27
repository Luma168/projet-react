import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField'
import dayjs from 'dayjs'
import { Box, TextField } from "@mui/material"

export default function Editor({tempNoteTitle, tempNoteContent, setTempNoteTitle, setTempNoteContent, noteCreatedAt, noteUpdatedAt}) {

    return (
        <Box
            sx={{
                height:'100%',
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                        label="Crée le:"
                        format="DD - MM - YYYY"
                        defaultValue={dayjs(noteCreatedAt)}
                    />
                    <TimeField
                    label="à:"
                    defaultValue={dayjs(noteCreatedAt)}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                        label="Dérnière mise à jour le:"
                        format="DD - MM - YYYY"
                        defaultValue={dayjs(noteUpdatedAt)}
                    />
                    <TimeField
                    label="à:"
                    defaultValue={dayjs(noteUpdatedAt)}
                    />
                </LocalizationProvider>
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
                label="Contenus"
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
                    height: '50vh',  
                },
                }}
            />
        </Box>
    )
}