import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

export default function Sidebar({notes, currentNoteId, routeChange, deleteNote, updateNoteDone}) {
    return (
        <List
        sx={{
            width: '100%',
            overflowY: 'auto'
        }}
        >
        {notes !== null ? notes.map((note) =>
            <Link to={`/notes/${note.id}`} className='sidebarLink'  key={note.id}>
                <ListItemButton
                    selected={note.id === currentNoteId}
                >
                <ListItem>
                    <Checkbox 
                        checked={note.done} 
                        icon={<CheckCircleOutlineIcon/>}
                        checkedIcon={<CheckCircleIcon/>}
                        onChange={() => updateNoteDone(note.id, !note.done)}
                        onClick={(e)=>{
                            e.stopPropagation()
                        }}
                        
                    />
                    <ListItemText
                        primary={
                            <Typography variant="h5">
                            {note.title.length > 15 ? note.title.substring(0,15) + "..." : note.title}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="caption">
                            {note.content.length > 35 ? note.content.substring(0,35) + "..." : note.content}
                            </Typography>
                        }
                    />
                    <IconButton 
                        edge="end" 
                        aria-label="delete"
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
                                        deleteNote(note.id)
                                    }
                                });
                            }
                        }
                    >
                        <DeleteIcon 
                            sx={{
                                '&:hover' : {color: 'red', transition: 'all 0.5s'}
                            }}
                        />
                    </IconButton>
                </ListItem>
            </ListItemButton>
        </Link>
        ) : null}
        </List>
    )
}