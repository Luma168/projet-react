import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'

export default function Sidebar({notes, currentNoteId, routeChange, deleteNote, updateNoteDone}) {
    return (
        <List
        sx={{
            width: '100%',
            // "& .MuiListItemButton-root": { bgcolor: 'black', color: 'white' },
            // "& .MuiListItemButton-root:hover": { bgcolor: 'grey', color: 'black' },
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
                    checked={note.done} 
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
                        // color: 'white',
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
    )
}