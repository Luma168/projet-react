import { Button, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Sidebar({notes, createNewNote, routeChange, deleteNote, updateNoteDone}) {
    return (
        <div className='Side'>
            <Button
            variant="outlined"
            onClick={() => {createNewNote()}}
            >
            Nouvelle note
            </Button>
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
                >
                <ListItem>
                    <Checkbox 
                        defaultChecked={note.done} 
                        onChange={() => updateNoteDone(note.id, !note.done)}
                    />
                    <ListItemText
                    primary={
                        <Typography variant="h5">
                        {note.title}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="caption">
                        {note.content}
                        </Typography>
                    }
                    />
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon 
                        sx={{color: 'white'}}
                        onClick={()=> deleteNote(note.id)}
                      />
                    </IconButton>
                </ListItem>

                </ListItemButton>
            ) : null}
            </List>
    </div>
    )
}