import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'

import { saveAndLoad } from '../reducers/cast'

const EditorHeader = () => {
  const dispatch = useDispatch()
  const username = useSelector(store => store.user.username)

  return (
    <>
      <h1>R-Mapper</h1>
      <h2>{`${username}'s cast`}</h2>
      <Button
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
    </>
  )
}

export default EditorHeader