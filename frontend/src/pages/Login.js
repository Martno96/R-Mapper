import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CredentialsForm from '../components/CredentialsForm.js'

const Login = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const casts = useSelector(store => store.user.casts)
  const history = useHistory()
  const error = useSelector(store => store.user.error)

  useEffect(() => {
    if (accessToken && casts && casts.length > 0) {
      history.push('/casts/:castId')
    }
  }, [accessToken, history, casts])

  return (
    <>
      <h1>R-Mapper</h1>
      <h2>a handy tool for mapping out the core relationships in your cast of characters</h2>

      <h3>Sign In</h3>
      <CredentialsForm formFunction='signin' />
      <p>or if you are new here:</p>
      <h3>Sign Up</h3>
      <CredentialsForm formFunction='signup' />
      {error && (error.message === 'User not found') &&
        <div>
          <p>The username/password combination was not found. </p>
          <p>Please try again, or sign up if you don't have an account</p>
        </div>
      }
    </>
  )
}

export default Login