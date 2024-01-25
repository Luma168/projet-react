import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import { Button, Container, CssBaseline, Drawer, FormControlLabel, IconButton, List, ListItem, ListItemButton, ListItemText, Switch, Toolbar, Typography, styled, useTheme } from '@mui/material';
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
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
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


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  

export default function Home({onChangeTheme, theme}) {
    const [open, setOpen] = useState(true);

    const [notes, setNotes] = useState([]);
    const {currentNoteId} = useParams()
    var currentNote = notes.find(note => note.id === currentNoteId)

    const [tempNoteTitle, setTempNoteTitle] = useState("")
    const [tempNoteContent, setTempNoteContent] = useState("")
    const [tempNoteCreatedAt, setTempNoteCreatedAt] = useState("")
    const [tempNoteUpdatedAt, setTempNoteUpdatedAt] = useState("")

    const [loaderTrigger, setLoaderTrigger] = useState(0)
    const [showLoader, setShowLoader] = useState(false)

    const sortedNotes = notes.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        
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
            body: JSON.stringify({ title: "Nouvelle Note", content: "Saisissez votre note", createdAt: new Date(), updatedAt: new Date(), done: false, pinned: false })
            }
        )
        setLoaderTrigger((trigger) => trigger + 1)
        fetchNotes()
    }    

    useEffect(() => {
        if (currentNote) {
            setTempNoteTitle(currentNote.title)
            setTempNoteContent(currentNote.content)
            setTempNoteCreatedAt(currentNote.createdAt)
            setTempNoteUpdatedAt(currentNote.updatedAt)
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
    const updateNotePin = async function (noteId, newValue) {
        await fetch(
            `/notes/${noteId}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pinned: newValue, updatedAt: new Date() })
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
                        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}} >
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
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked onChange={(_,checked)=>{
                                    onChangeTheme(checked)
                                }} />}
                            />
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
                                sx={{ fontSize: '1.5rem', marginRight: '15px', marginTop: '10px'}}
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
                            updateNotePin={updateNotePin}
                        />
                        
                    </Drawer>
                    <Main open={open} sx={{height:'90%'}}>
                        <DrawerHeader />
                        {
                            currentNote ? 
                            <Editor
                                tempNoteTitle={tempNoteTitle} 
                                tempNoteContent={tempNoteContent} 
                                setTempNoteTitle={setTempNoteTitle} 
                                setTempNoteContent={setTempNoteContent} 
                                noteCreatedAt={tempNoteCreatedAt} 
                                noteUpdatedAt={tempNoteUpdatedAt} 
                            />
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
                                    Sélectionnez une note
                                </Typography>
                            </Container>
                        }
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