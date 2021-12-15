import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { Add } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'

import cast from '../reducers/cast'

export const NewCharacterForm = ({ newCharacterName, open, handleClose, onSuccess }) => {

  const characters = useSelector(store => store.cast.characters)
  const [name, setName] = useState(newCharacterName ? newCharacterName : '')
  const [bio, setBio] = useState("")
  const [errorSnack, setErrorSnack] = useState(false)

  const dispatch = useDispatch()

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onBioChange = (event) => {
    setBio(event.target.value)
  }

  const handleErrorSnackClose = (event) => {
    setErrorSnack(false)
  }



  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(characters)
    console.log(`name: ${name}`)
    if (characters.find(character => character.name === name) === undefined) {
      onSuccess()
      dispatch(cast.actions.addCharacter({name, bio}))
      setName("")
      setBio("")
      handleClose();
    } else {
      setErrorSnack(true)
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Character</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Who do you want to add?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            fullWidth
            value={name}
            onChange={onNameChange}
          />
          <TextField
            margin="dense"
            id="bio"
            label="short bio"
            fullWidth
            value={bio}
            onChange={onBioChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            <Add fontSize="small"/>
            ADD
          </Button>
        </DialogActions>
        <Snackbar open={errorSnack} autoHideDuration={6000} onClose={handleErrorSnackClose}>
          <MuiAlert onClose={handleErrorSnackClose} severity="error">
            That name is already in use by another character in this cast! Please choose another.
          </MuiAlert>
        </Snackbar>
      </Dialog>
    </div>
  );
}

export default NewCharacterForm