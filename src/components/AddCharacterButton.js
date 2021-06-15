import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Add } from '@material-ui/icons'

import NewCharacterForm from './NewCharacterForm'

export const AddCharacterButton = () => {

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Add fontSize="small"/>
        ADD CHARACTER
      </Button>
      <NewCharacterForm 
        open={open} handleClose={handleClose}
      />
    </div>
  );
}

export default AddCharacterButton