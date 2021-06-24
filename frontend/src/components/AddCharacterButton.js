import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Add } from '@material-ui/icons'
import Box from "@material-ui/core/Box"

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m={2}
      >
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          <Add fontSize="small"/>
          ADD CHARACTER
        </Button>
      </Box>     
      <NewCharacterForm 
        open={open} handleClose={handleClose}
      />
    </div>
  );
}

export default AddCharacterButton