import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import { Button, Container, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, styled, useTheme } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Loader from '../components/Loader';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider} from 'uiw';



const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));


export default function Home() {
    const [notes, setNotes] = useState([]);
    const {currentNoteId} = useParams()
    var currentNote = notes.find(note => note.id === currentNoteId)

    const [tempNoteTitle, setTempNoteTitle] = useState("")
    const [tempNoteContent, setTempNoteContent] = useState("")

    const [loaderTrigger, setLoaderTrigger] = useState(0)
    const [showLoader, setShowLoader] = useState(false)

    const sortedNotes = notes.sort((a, b) => {
        if (a.done && !b.done) return -1;
        if (!a.done && b.done) return 1;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    
    
    const fetchNotes = async function () {
        const response = await fetch("/notes");
        const data = await response.json();
        setNotes(data);
    }
    
    useEffect(() => {
        fetchNotes();
        currentNote = notes.find(note => note.id === currentNoteId)
    }, [currentNoteId]);

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
  

    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
    setOpen(true);
    };

    const handleDrawerClose = () => {
    setOpen(false);
    };

    return (
        <>
            {
                notes.length > 0 ?
                <Container sx={{height: '100%', width: '100%'}}>
                    <CssBaseline />
                    <AppBar position="fixed" open={open}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                Note App
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                            <Button
                                variant="contained" 
                                onClick={() => {createNewNote()}}
                                startIcon={<NoteAddIcon />}
                                sx={{ fontSize: '1.5rem'}}
                            >
                                Nouvelle note
                            </Button>
                        </DrawerHeader>
                        <Divider />
                            <Sidebar 
                                notes={sortedNotes} 
                                currentNoteId={currentNoteId}
                                deleteNote={deleteNote}
                                updateNoteDone={updateNoteDone}
                            />
                    </Drawer>
                    <Main open={open}>
                        <DrawerHeader />
                        <Editor
                            tempNoteTitle={tempNoteTitle} 
                            tempNoteContent={tempNoteContent} 
                            setTempNoteTitle={setTempNoteTitle} 
                            setTempNoteContent={setTempNoteContent} 
                            noteCreatedAt={currentNote.createdAt} 
                            noteUpdatedAt={currentNote.updatedAt} 
                            drawerWidth={drawerWidth}
                        />
                    </Main>
                    <Loader loaderTrigger={loaderTrigger} showLoader={showLoader} setShowLoader={setShowLoader} />
                </Container>
                :
                <Container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',

                }}> 
                    <Typography 
                        variant="h2" 
                        gutterBottom
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
                </Container>
            }
        </>
    )

}