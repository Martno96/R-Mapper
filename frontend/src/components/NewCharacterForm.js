import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Add } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'

import cast from '../reducers/cast'

export const NewCharacterForm = ({ newCharacterName, open, handleClose }) => {

  const characters = useSelector(store => store.cast.characters)
  const [name, setName] = useState(newCharacterName ? newCharacterName : '')
  const [bio, setBio] = useState("")

  const dispatch = useDispatch()

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onBioChange = (event) => {
    setBio(event.target.value)
  }

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleSubmit = () => {
    //const capitalizedName = name.characterAt()
    dispatch(cast.actions.addCharacter({name, bio}))
    setName("")
    setBio("")
    handleClose();
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Add fontSize="small"/>
        ADD CHARACTER
      </Button> */}
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
      </Dialog>
    </div>
  );
}

export default NewCharacterForm