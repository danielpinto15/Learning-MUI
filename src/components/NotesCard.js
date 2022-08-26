import React from 'react'
import { Card, CardHeader, CardContent, IconButton, Typography, makeStyles, Avatar } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { yellow, green, pink, blue } from '@material-ui/core/colors'

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (note) => {
            if(note.category == 'work') {
                return yellow[700]
            }
            if(note.category == 'money') {
                return green[500]
            }
            if(note.category == 'todos') {
                return pink[500]
            }
            return blue[500]
        }
    }
})

export default function Note({ note, handleDelete }) {
    const classes =  useStyles(note);

  return (
    <div>
        <Card elevation={3}>
            <CardHeader 
                avatar={
                    <Avatar className={classes.avatar}>
                        {note.category[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => handleDelete(note.id)}>
                        <DeleteOutline />
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
            />
            <CardContent>
                <Typography variante='body2' color='textSecondary'>
                    {note.details}
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}
