import { useEffect, useState } from 'react';
import { Split } from 'uiw';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import { Box, Button, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Loader from '../components/Loader';

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState("")
    const [tempNoteTitle, setTempNoteTitle] = useState("")
    const [tempNoteContent, setTempNoteContent] = useState("")
    const [loaderTrigger, setLoaderTrigger] = useState(0)
    const [showLoader, setShowLoader] = useState(false)

    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]
    const sortedNotes = notes.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    
    
    const fetchNotes = async function () {
        const response = await fetch("/notes");
        const data = await response.json();
        setNotes(data);
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    let navigate = useNavigate();
    const routeChange = (note) => {
      let path = `/notes/${note.id}`;
      navigate(path);
      setCurrentNoteId(note.id)
    }

    const createNewNote = async function () {
        await fetch(
            "/notes",
            {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: "Nouvelle Note", content: "Saisissez votre note", createdAt: new Date(), updatedAt: new Date(), done: false })
            }
        )
        setLoaderTrigger((trigger) => trigger + 1)
        fetchNotes()
    }    

    useEffect(() => {
        if (currentNote) {
            setTempNoteTitle(currentNote.title)
            setTempNoteContent(currentNote.content)
        }
    }, [currentNote])

    const updateNoteTitle = async function (newValue) {
        await fetch(
            `/notes/${currentNote.id}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newValue, updatedAt: new Date() })
            }
        )
        setLoaderTrigger((trigger) => trigger + 1)
    }
    const updateNoteContent = async function (newValue) {
        await fetch(
            `/notes/${currentNote.id}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newValue, updatedAt: new Date() })
            }
        )
        setLoaderTrigger((trigger) => trigger + 1)
    }
    const updateNoteDone = async function (noteId, newValue) {
        await fetch(
            `/notes/${noteId}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: newValue, updatedAt: new Date() })
            }
        )
        setLoaderTrigger((trigger) => trigger + 1)
        fetchNotes()
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tempNoteTitle !== currentNote.title) {
                updateNoteTitle(tempNoteTitle)
                setShowLoader((show) => !show)
            }
            if (tempNoteContent !== currentNote.content) {
                updateNoteContent(tempNoteContent)
                setShowLoader((show) => !show)
            }
            fetchNotes()
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [tempNoteTitle, tempNoteContent])

    const deleteNote = async function (noteId) {
        await fetch(
            `/notes/${noteId}`,
            {
                method: 'DELETE',
            }
        )
        fetchNotes()
    }
  
    return (
        <>
            {
                notes.length > 0 ?
                <div>
                    <Sidebar 
                        notes={sortedNotes} 
                        currentNoteId={currentNoteId}
                        createNewNote={createNewNote} 
                        routeChange={routeChange} 
                        deleteNote={deleteNote}
                        updateNoteDone={updateNoteDone}
                    />
                    <Editor 
                        tempNoteTitle={tempNoteTitle} 
                        tempNoteContent={tempNoteContent} 
                        setTempNoteTitle={setTempNoteTitle} 
                        setTempNoteContent={setTempNoteContent} 
                        noteCreatedAt={currentNote.createdAt} 
                        noteUpdatedAt={currentNote.createdAt} 
                    />
                    <Loader loaderTrigger={loaderTrigger} showLoader={showLoader} setShowLoader={setShowLoader} />
                </div>
                :
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',

                }}> 
                    <Typography 
                        variant="h1" 
                        gutterBottom
                        sx={{
                            color: 'white'
                        }}
                    > 
                        Vous n'avez pas de notes !
                    </Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<NoteAddIcon />}
                        onClick={createNewNote}
                        sx={{ fontSize: '1.5rem'}}
                    >
                        Créer une note
                    </Button>
                </Box>
            }
        </>
    )

}