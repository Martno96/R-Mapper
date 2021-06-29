import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Add } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'

import CharacterNameAutoComplete from './unused/CharacterNameAutoComplete'
import cast from '../reducers/cast'
import { bondCategories } from '../constants'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export const BondSubtypeSelect = ({ selectedCategory, value, onChange }) => {

  const characters = useSelector(store => store.cast.characters)
  const characterNames = useSelector(store => store.cast.characters).map(character => character.name)

  const classes = useStyles()
  const dispatch = useDispatch()

  // if (selectedCategory === "" ) {
  //   return (
  //     <div>
  //     </div>
  //   )
  // } else {
    let subtypes

    if (selectedCategory !== "") {
      subtypes = bondCategories.find(category => category.name === selectedCategory).subtypes
    }
    
    return (
        <FormControl className={classes.formControl}>
          {/* <InputLabel htmlFor="subtype">{'--->'} Bond {'--->'}</InputLabel> */}
          <NativeSelect
            required
            disabled={selectedCategory === ""}
            value={value}
            onChange={onChange}
            inputProps={{
              name: 'subtype',
              id: 'subtype',
            }}
          >
            <option aria-label="None" value="">select sub-type</option>
            {selectedCategory !== "" && subtypes.map((subtype) => {
              return <option value={subtype}>{subtype}</option>
            })}
  
          </NativeSelect>
          {/* <FormHelperText>Subtype</FormHelperText> */}
        </FormControl>
    )
  // }  
}

export default BondSubtypeSelect