import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField'
import dayjs from 'dayjs'
import { TextField } from "@mui/material"

export default function Editor({tempNoteTitle, tempNoteContent, setTempNoteTitle, setTempNoteContent, noteCreatedAt, noteUpdatedAt}) {

    return (
        <div className="Main">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                    label="Crée le:"
                    format="MM - DD - YYYY"
                    defaultValue={dayjs(noteCreatedAt)}
                />
                <TimeField
                label="à:"
                defaultValue={dayjs(noteCreatedAt)}
                />
            </LocalizationProvider>
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
                sx={{marginBottom: "30px"}}
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
                    height: '80vh',
                },
                }}
            />
        </div>
    )
}