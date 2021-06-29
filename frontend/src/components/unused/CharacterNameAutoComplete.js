/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import NewCharacterForm from '../NewCharacterForm';
import { useSelector } from 'react-redux'

const filter = createFilterOptions();

export const CharacterNameAutoComplete = ({ label, value, onChange }) => {
  // const [value, setValue] = React.useState(null);
  
  const characterNames = useSelector(store => store.cast.characters).map(character => character.name)
  const [open, toggleOpen] = useState(false)
  const [newCharacterName, setNewCharacterName] = useState(false)

  console.log(characterNames)

  const handleClose = () => {
    // setDialogValue({
    //   title: '',
    //   year: '',
    // });

    toggleOpen(false);
  };

  // const handleClickOpen = () => {
  //   toggleOpen(true);
  // };

  // const [dialogValue, setDialogValue] = React.useState({
  //   title: '',
  //   year: '',
  // });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setValue({
  //     title: dialogValue.title,
  //     year: parseInt(dialogValue.year, 10),
  //   });

  //   handleClose();
  // };

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              // toggleOpen(true);     //think these are guilty for opening regardless of option picked
              // setDialogValue({
              //   title: newValue,
              //   year: '',
              // });
              setNewCharacterName(newValue);
            });
          } else if (newValue && newValue.inputValue) {
            //toggleOpen(true);
            // setDialogValue({
            //   title: newValue.inputValue,
            //   year: '',
            // });
            setNewCharacterName(newValue.inputValue);
          } else {
            setNewCharacterName(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          //so this part doesn't run currently. Wonder why :/
          if (params.inputValue !== '') {
            
            filtered.push({
              inputValue: params,
              title: `Add "${params}"`,
            });
            console.log("filtered after push:")
            console.log(filtered)
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={characterNames}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        // clearOnBlur
        handleHomeEndKeys
        // renderOption={(option) => option.title}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
      <NewCharacterForm 
        newCharacterName={newCharacterName} open={open} handleClose={handleClose}
      />
    </>
  )
}

export default CharacterNameAutoComplete