import React, { useState } from 'react'
import { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import NotesCard from '../components/NotesCard'
import Masonry from 'react-masonry-css';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect( async () => {
    const  res = await fetch('http://localhost:8000/notes')
    const resJson = await res.json()
    setNotes(resJson);
  }, [])
  
  const handleDelete = async (id) => {
    await fetch(fetch('http://localhost:8000/notes' + id, {
      method: 'DELETE'
    }))

    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes);
  } 

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {notes && notes.map(note => (
          <div item  key={note.id}>
            <NotesCard note={note} handleDelete={handleDelete}/>
          </div>
        ))}
      </Masonry>
      
    </Container>
  )
}
