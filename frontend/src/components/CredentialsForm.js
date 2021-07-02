import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import { useSelector, useDispatch } from 'react-redux'

import { authenticate } from '../reducers/user'

export const CredentialsForm = ({ formFunction }) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(authenticate({username, password, userAction: formFunction}))
    setUsername("")
    setPassword("")
  }

  let buttonLabel
  switch(formFunction) {
    case 'signin':
      buttonLabel = 'SIGN IN'
      break
    case 'signup':
      buttonLabel = 'SIGN UP'
      break
    default:
      buttonLabel = '???'
      break
  }

  return (
    <div>
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
          {buttonLabel}
        </Button>
      </FormControl>
    </div>
  );
}

export default CredentialsForm