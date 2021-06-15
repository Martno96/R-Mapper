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

import CharacterNameAutoComplete from './CharacterNameAutoComplete'
import BondSubtypeSelect from './BondSubtypeSelect'
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

export const NewBondForm = ({ open, handleClose }) => {

  const characters = useSelector(store => store.cast.characters)
  const characterNames = useSelector(store => store.cast.characters).map(character => character.name)
  // const [open, setOpen] = useState(false)
  const [sourceId, setSourceId] = useState("")
  const [targetId, setTargetId] = useState("")
  const [subtype, setSubtype] = useState("")
  const [category, setCategory] = useState("")
  const [timeStart, setTimeStart] = useState("")
  const [timeEnd, setTimeEnd] = useState("")
  const [details, setDetails] = useState("")
  // const [sourceId, setSourceId] = useState({ id:"", value:""})
  // const [targetId, setTargetId] = useState({ id:"", value:""})
  // const [subtype, setSubtype] = useState({ id:"", value:""})
  // const [category, setCategory] = useState({ id:"", value:""})
  // const [timeStart, setTimeStart] = useState({ id:"", value:""})
  // const [timeEnd, setTimeEnd] = useState({ id:"", value:""})
  // const [summary, setSummary] = useState({ id:"", value:""})
  const classes = useStyles()

  const dispatch = useDispatch()

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleSourceIdChange = (event) => {
    setSourceId(event.target.value)
  }

  const handleTargetIdChange = (event) => {
    setTargetId(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleSubtypeChange = (event) => {
    setSubtype(event.target.value)
  }

  const handleDetailsChange = (event) => {
    setDetails(event.target.value)
  }

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(cast.actions.addBond({sourceId, targetId, details, subtype, category}))
    setSourceId("")
    setTargetId("")
    setDetails("")
    setSubtype("")
    setCategory("")
    handleClose()
  };

  return (
    <div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Bond</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new Bond between two registered Characters
          </DialogContentText>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <NativeSelect
                required
                value={category}
                onChange={handleCategoryChange}
                inputProps={{
                  name: 'category',
                  id: 'category'
                }}
              >
                <option aria-label="None" value=""></option>
                {bondCategories.map((category) => {
                  return <option value={category.name}>{category.name}</option>
                })}
                
              </NativeSelect>
              {/* <FormHelperText>the Bond's rough category</FormHelperText> */}
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="character-a">Owner</InputLabel>
              <NativeSelect
                required
                value={sourceId}
                onChange={handleSourceIdChange}
                inputProps={{
                  name: 'character-a',
                  id: 'character-a',
                }}
              >
                <option aria-label="None" value=""></option>
                {characters.map((character) => {
                  return <option value={character.id}>{character.name}</option>
                })}
                
              </NativeSelect>
              {/* <FormHelperText>the Bond "owner"</FormHelperText> */}
            </FormControl>
            
            <BondSubtypeSelect selectedCategory={category} value={subtype} onChange={handleSubtypeChange}/>
            
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="character-b">Target</InputLabel>
              <NativeSelect
                required
                value={targetId}
                onChange={handleTargetIdChange}
                inputProps={{
                  name: 'character-b',
                  id: 'character-b',
                }}
              >
                <option aria-label="None" value=""></option>
                {characters.map((character) => {
                  return <option value={character.id}>{character.name}</option>
                })}
                
              </NativeSelect>
              {/* <FormHelperText>the Bond "target"</FormHelperText> */}
            </FormControl>

            <FormControl className={classes.formControl}>
              {/* <InputLabel htmlFor="details">Details</InputLabel> */}
              <TextField 
                required
                multiline
                margin="dense"
                id="details"
                label="Bond explanation"
                fullWidth
                value={details}
                onChange={handleDetailsChange}
              />
            </FormControl>
          {/* <CharacterNameAutoComplete label="who has the relation...?" value={sourceId} onChange={handleSourceIdChange}/>

          <CharacterNameAutoComplete label="... with who?" value={targetId} onChange={handleTargetIdChange}/> */}

          {/* <TextField
            autoFocus
            margin="dense"
            id="sourceId"
            label="sourceId"
            fullWidth
            value={sourceId}
            onChange={handleSourceIdChange}
          />
          <TextField
            margin="dense"
            id="targetId"
            label="short target"
            fullWidth
            value={targetId}
            onChange={handleTargetIdChange}
          /> */}


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button type="submit" variant="contained" onClick={handleSubmit} color="primary">
            <Add fontSize="small"/>
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewBondForm