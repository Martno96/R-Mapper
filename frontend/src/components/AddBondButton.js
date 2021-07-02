import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Add } from '@material-ui/icons'

import NewBondForm from './NewBondForm'

export const AddBondButton = () => {

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <Add fontSize="small"/>
        ADD BOND
      </Button>
      <NewBondForm 
        open={open} handleClose={handleClose}
      />
    </div>
  )
}

export default AddBondButton