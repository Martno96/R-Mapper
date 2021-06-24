import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export const ConfirmationDialog = ({ open, onClose, onSubmit, action, target, buttonLabel }) => {
  return (
    <Dialog width="sm" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle>{`Delete ${target}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Are you sure you want to ${action} ${target}? This action cannot be undone.`}
        </DialogContentText>
        <DialogActions>
          <Button
            size="small"
            onClick={(event) => {
              event.stopPropagation()
              onClose()
            }}
            onFocus={(event) => event.stopPropagation()}
          >
            CANCEL
          </Button>
          <Button
            type="submit" 
            variant="contained"
            color="secondary"
            size="small"
            onClick={(event) => {
              event.stopPropagation()
              onSubmit()
            }}
            onFocus={(event) => event.stopPropagation()}
          >
            {buttonLabel}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationDialog