import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { saveAndLoad } from '../reducers/cast'
import user from '../reducers/user'
import cast from '../reducers/cast'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  buttons: {
    margin: 8
  }
}))

const EditorHeader = () => {
  const [infoSnack, setInfoSnack] = useState(true)
  const dispatch = useDispatch()
  const username = useSelector(store => store.user.username)
  const classes = useStyles()

  const handleInfoSnackClose = (event) => {
    setInfoSnack(false)
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
        open={infoSnack} 
        autoHideDuration={6000} 
        onClose={handleInfoSnackClose}
        message={`Welcome, ${username}!`}
      >
      </Snackbar>
      <h1>R-Mapper</h1>
      <h2>{`${username}'s cast`}</h2>
      <Button
        className={classes.buttons}
        size="small"
        variant="contained"
        color="primary"
        onClick={(event) => {
          event.stopPropagation()
          dispatch(saveAndLoad('save'))
        }}
        onFocus={(event) => event.stopPropagation()}
      >
        SAVE
      </Button>
      <Button
        className={classes.buttons}
        size="small"
        variant="contained"
        color="primary"
        onClick={(event) => {
          event.stopPropagation()
          batch(() => {
            dispatch(cast.actions.exitCast())
            dispatch(user.actions.signOut())
          })
        }}
        onFocus={(event) => event.stopPropagation()}
      >
        SIGN OUT
      </Button>
    </>
  )
}

export default EditorHeader