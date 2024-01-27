import { Box, Button, Checkbox, TextField, Typography } from "@mui/material"

import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import Swal from 'sweetalert2'

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

export default function Editor({currentNoteId, tempNoteTitle, tempNoteContent, tempNotePin, tempNoteDone, setTempNoteTitle, setTempNoteContent, setTempNotePin, setTempNoteDone, deleteNote}) {
    const [selectedTab, setSelectedTab] = useState("write");
    return (
        <Box
            sx={{
                height:'100%',
                width:'100%',
                display:'flex',
                flexDirection:'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Checkbox 
                            checked={tempNotePin} 
                            icon={<PushPinOutlinedIcon/>}
                            checkedIcon={<PushPinIcon/>}
                            onChange={() => setTempNotePin(!tempNotePin)}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                            {tempNotePin ? 'Épinglée' : 'Épingler'}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '30px'
                        }}
                    >
                        <Checkbox 
                            checked={tempNoteDone} 
                            icon={<CheckCircleOutlineIcon/>}
                            checkedIcon={<CheckCircleIcon/>}
                            onChange={() => setTempNoteDone(!tempNoteDone)}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                            {tempNoteDone ? 'Faite' : 'À faire'}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Button 
                        edge="end" 
                        aria-label="delete"
                        sx={{
                            '&:hover' : {color: 'red', transition: 'all 0.5s'}
                        }}
                        onClick={()=> 
                            {
                                Swal.fire({
                                    title: "Êtes vous sûr de vouloir supprimer la note?",
                                    text: "Cette action est irrévérsible!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Oui, Supprimer!",
                                    cancelButtonText: "Annuler"
                                })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        Swal.fire({
                                            title: "Supprimée!",
                                            text: "La note a été supprimée.",
                                            icon: "success"
                                        });
                                        deleteNote(currentNoteId)
                                    }
                                });
                            }
                        }
                        startIcon={<DeleteIcon />}
                    >
                        Supprimer
                    </Button>
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
            <ReactMde
                value={tempNoteContent}
                onChange={setTempNoteContent}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={400}
            />
        </Box>
    )
}