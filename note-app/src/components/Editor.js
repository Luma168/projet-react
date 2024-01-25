import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField'
import dayjs from 'dayjs'
import { Box, TextField } from "@mui/material"

import { useState } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

export default function Editor({tempNoteTitle, tempNoteContent, setTempNoteTitle, setTempNoteContent}) {
    const [selectedTab, setSelectedTab] = useState("write");
    return (
        <Box
            sx={{
                height:'100%',
                width:'100%',
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-around'
            }}
        >
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
            <ReactMde
                value={tempNoteContent}
                onChange={setTempNoteContent}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
                }
            />
            {/* <TextField
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
            /> */}
        </Box>
    )
}