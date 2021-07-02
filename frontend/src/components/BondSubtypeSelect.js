import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

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
  const classes = useStyles()
  let subtypes

  if (selectedCategory !== "") {
    subtypes = bondCategories.find(category => category.name === selectedCategory).subtypes
  }
  
  return (
    <FormControl className={classes.formControl}>
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
    </FormControl>
  )
}

export default BondSubtypeSelect