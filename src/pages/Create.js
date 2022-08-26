import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Send from '@material-ui/icons/Send'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles, FormControlLabel } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles();
  const [details, setDetails] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('money');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    setDetailsError(false)
    setTitleError(false)

    if (title == '') {
      setTitleError(true)
    }

    if (details == ''){
      setDetailsError(true)
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          title,
          category,
          details
        })
      }).then(() => navigate('/'))
    }
  }

  return (
    <Container>
      <Typography 
        variant='h6'
        component='h2'
        color='textSecondary'
        align='center'
        gutterBottom
      >
        Creat a new note
      </Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete='off'>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label='note title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          className={classes.field}
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          label='Details'
          multiline
          minRows={4}
          variant='outlined'
          color='secondary'
          fullWidth
          required
          className={classes.field}
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel control={<Radio />} value='money' label='Money' />
            <FormControlLabel control={<Radio />} value='cenas' label='Cenas' />
            <FormControlLabel control={<Radio />} value='coisas' label='Coisas' />
          </RadioGroup>
        </FormControl>
       
        <Button
        type='submit'
        startIcon={<Send />}
        endIcon={<KeyboardArrowRight />}
        color='secondary'
        variant='contained'
      >Submit</Button>
      </form>
      
      
    </Container>
  )
}
