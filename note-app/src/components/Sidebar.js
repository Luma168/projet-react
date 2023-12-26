import { AppBar, Box, Button, Checkbox, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, styled} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useTheme } from '@emotion/react';


export default function Sidebar({notes, currentNoteId, createNewNote, routeChange, deleteNote, updateNoteDone, loaderTrigger, showLoader , setShowLoader}) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    return(
        <Box sx={{ display: 'flex' }}>
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
                        utilisateur
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                width: '400px',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: '400px',
                    boxSizing: 'border-box',
                },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                <Button
                    variant="outlined"
                    onClick={() => {createNewNote()}}
                >
                    Nouvelle note
                </Button>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronRightIcon />: <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List
                    sx={{
                        width: '100%',
                        "& .MuiListItemButton-root": { bgcolor: 'black', color: 'white' },
                        "& .MuiListItemButton-root:hover": { bgcolor: 'grey', color: 'black' },
                        overflowY: 'auto'
                    }}
                >
                {notes !== null ? notes.map((note, index) =>
                    <ListItemButton
                    key={index}
                    onClick={() => routeChange(note)}
                    selected={note.id === currentNoteId}
                    >
                    <ListItem>
                        <Checkbox 
                            defaultChecked={note.done} 
                            onChange={() => updateNoteDone(note.id, !note.done)}
                        />
                        <ListItemText
                        primary={
                            <Typography variant="h5" sx={{textDecoration: note.done ? 'line-through' : ''}}>
                            {note.title}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="caption" sx={{textDecoration: note.done ? 'line-through' : ''}}>
                            {note.content}
                            </Typography>
                        }
                        />
                        <IconButton edge="end" aria-label="delete">
                        <DeleteIcon 
                            sx={{
                                color: 'white',
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
                                        confirmButtonText: "Oui, Supprimer!"
                                    })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            Swal.fire({
                                                title: "Supprimé!",
                                                text: "La note a été supprimée.",
                                                icon: "success"
                                            });
                                            deleteNote(note.id)
                                        }
                                    });
                                }
                            }
                        />
                        </IconButton>
                    </ListItem>

                    </ListItemButton>
                ) : null}
                </List>

                <Divider />
                <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
            </Drawer>
        </Box>
    )
    // return (
    //     <div className='Side'>
    //         <Button
    //         variant="outlined"
    //         onClick={() => {createNewNote()}}
    //         >
    //         Nouvelle note
    //         </Button>
    //         <List
    //         sx={{
    //             width: '100%',
    //             "& .MuiListItemButton-root": { bgcolor: 'black', color: 'white' },
    //             "& .MuiListItemButton-root:hover": { bgcolor: 'grey', color: 'black' },
    //             overflowY: 'auto'
    //         }}
    //         >
    //         {notes !== null ? notes.map((note, index) =>
    //             <ListItemButton
    //             key={index}
    //             onClick={() => routeChange(note)}
    //             selected={note.id === currentNoteId}
    //             >
    //             <ListItem>
    //                 <Checkbox 
    //                     defaultChecked={note.done} 
    //                     onChange={() => updateNoteDone(note.id, !note.done)}
    //                 />
    //                 <ListItemText
    //                 primary={
    //                     <Typography variant="h5" sx={{textDecoration: note.done ? 'line-through' : ''}}>
    //                     {note.title}
    //                     </Typography>
    //                 }
    //                 secondary={
    //                     <Typography variant="caption" sx={{textDecoration: note.done ? 'line-through' : ''}}>
    //                     {note.content}
    //                     </Typography>
    //                 }
    //                 />
    //                 <IconButton edge="end" aria-label="delete">
    //                   <DeleteIcon 
    //                     sx={{
    //                         color: 'white',
    //                         '&:hover' : {color: 'red', transition: 'all 0.5s'}
    //                     }}
    //                     onClick={()=> 
    //                         {
    //                             Swal.fire({
    //                                 title: "Êtes vous sûr de vouloir supprimer la note?",
    //                                 text: "Cette action est irrévérsible!",
    //                                 icon: "warning",
    //                                 showCancelButton: true,
    //                                 confirmButtonColor: "#3085d6",
    //                                 cancelButtonColor: "#d33",
    //                                 confirmButtonText: "Oui, Supprimer!"
    //                             })
    //                             .then((result) => {
    //                                 if (result.isConfirmed) {
    //                                     Swal.fire({
    //                                         title: "Supprimé!",
    //                                         text: "La note a été supprimée.",
    //                                         icon: "success"
    //                                     });
    //                                     deleteNote(note.id)
    //                                 }
    //                             });
    //                         }
    //                     }
    //                   />
    //                 </IconButton>
    //             </ListItem>

    //             </ListItemButton>
    //         ) : null}
    //         </List>
    //         <Loader loaderTrigger={loaderTrigger} showLoader={showLoader} setShowLoader={setShowLoader} />
    //     </div>
    // )
}