import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CredentialsForm from '../components/CredentialsForm.js'

import user from '../reducers/user'

const Login = () => {
    const accessToken = useSelector(store => store.user.accessToken)
    const history = useHistory()
    const error = useSelector(store => store.user.error)
    
    useEffect(() => {
        if(accessToken) {
          history.push('/')
        }
    }, [accessToken, history])
    
    return (
        <> 
          <CredentialsForm formFunction='signup'/>
          {error !== null && (error.message === 'User not found') && 
            <div>
              <p>The username/password combination was not found. </p> 
              <p>Please try again, or sign up if you don't have an account</p>
            </div>
          }
        </>
    )
}

export default Login