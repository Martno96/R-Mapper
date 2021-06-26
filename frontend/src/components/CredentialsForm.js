import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { useSelector, useDispatch } from 'react-redux'

import cast from '../reducers/cast'
import { authenticate } from '../reducers/user'

export const CredentialsForm = ({ formFunction }) => {

  const characters = useSelector(store => store.cast.characters)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(authenticate({username, password, formFunction,}))
    setUsername("")
    setPassword("")
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Add fontSize="small"/>
        ADD CHARACTER
      </Button> */}
      <FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="username"
          fullWidth
          value={username}
          onChange={onUsernameChange}
        />
        <TextField
          type="password"
          margin="dense"
          id="password"
          label="password"
          fullWidth
          value={password}
          onChange={onPasswordChange}
        />
        <Button variant="contained" type="submit" color="primary" onClick={onSubmit}>
          SIGN UP
        </Button>
      </FormControl>
    </div>
  );
}

export default CredentialsForm