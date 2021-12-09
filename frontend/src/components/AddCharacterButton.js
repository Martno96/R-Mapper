import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Add } from '@material-ui/icons'
import Box from "@material-ui/core/Box"
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import NewCharacterForm from './NewCharacterForm'

export const AddCharacterButton = () => {
  const [open, setOpen] = useState(false)
  const [successSnack, setSuccessSnack] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSuccessSnackClose = (event) => {
    setSuccessSnack(false)
  }

  const handleSuccessSnackOpen = (event) => {
    setSuccessSnack(true)
  }

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
        open={open} handleClose={handleClose} onSuccess={handleSuccessSnackOpen}
      />
      <Snackbar 
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={successSnack} 
        autoHideDuration={6000} 
        onClose={handleSuccessSnackClose}
      >
        <MuiAlert onClose={handleSuccessSnackClose} severity="success">
          Character added! Try dragging them around!
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default AddCharacterButton