import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'


import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Bond from './Bond'
import ConfirmationDialog from './ConfirmationDialog'
import cast from '../reducers/cast'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '66.66%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionContent: {
    fontSize: theme.typography.pxToRem(15),
    display: 'flex',
    flexDirection: 'column'
  },
  contentMissing: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
    textIndent: '35px'
  },
  bio: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.primary,
    textIndent: '15px',
    marginTop: '10px',
    marginBottom: '30px',
  }
}));

export const Character = ({ character }) => {
  const characters = useSelector(store => store.cast.characters)
  const bonds = useSelector(store => store.cast.bonds)
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [removeCharacterDialogOpen, setRemoveCharacterDialogOpen] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handleRemoveCharacterDialogClose = (event) => {
    setRemoveCharacterDialogOpen(false)
  }

  const handleRemoveCharacter = (event) => {
    dispatch(cast.actions.removeCharacter(character))
  }

  const bondsSourceOf = bonds.filter(bond => bond.source === character.name)
  const bondsTargetOf = bonds.filter(bond => bond.target === character.name)
  const relevantBondCategories = [...new Set(bondsSourceOf.concat(bondsTargetOf).map(bond => bond.category))]
  const allBondsOfCharacter = bondsSourceOf.concat(bondsTargetOf)

  console.log(`------- ${character.name} -------`)
  console.log("bondsSourceOf:")
  console.log(bondsSourceOf)
  console.log("bondsTargetOf:")
  console.log(bondsTargetOf)
  console.log(`------- ----------------- -------`)
  
  //console.log(relevantBondCategories)

  // const childrenTest = () => {
  //   return (
  //     <p>HELLO I AM CHILD</p>
  //   )
  // }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <Typography className={classes.heading}>{character.name}</Typography>
        <div className='character-header-buttons'>
          <Button 
            size="small"
            onClick={(event) => {
              event.stopPropagation()
              console.log("REMOVE CHARACTER DIALOG SHOULD BE OPEN")
              setRemoveCharacterDialogOpen(true)
            }}
            onFocus={(event) => event.stopPropagation()}
          >
            DELETE
          </Button>
          <ConfirmationDialog 
            open={removeCharacterDialogOpen} 
            onClose={handleRemoveCharacterDialogClose} 
            onSubmit={handleRemoveCharacter}
            action={"permanently delete"}
            target={character.name}
            buttonLabel={"DELETE"}
          />
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionContent}>
        
        {/* ----------- CHARACTER BIO ----------- */}
        <Typography className={classes.secondaryHeading}>short bio</Typography>
        <Typography className={classes.bio}>{character.bio}</Typography>

        {/* ----------- CATEGORY ----------- */}
        {console.log("relevantBondCategories:")}
        {console.log(relevantBondCategories)}
        { relevantBondCategories.length > 0 
          ? relevantBondCategories.map((category) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                >
                  <Typography className={classes.secondaryHeading}>{category}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionContent}>
                
                  {/* ----------- BOND ----------- */}
                  {allBondsOfCharacter.filter(bond => bond.category === category).map((bond) => {
                    const bondSource = characters.find(character => character.name === bond.source)
                    const bondTarget = characters.find(character => character.name === bond.target)
                    return (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-label="Expand"
                          aria-controls="additional-actions1-content"
                          id="additional-actions1-header"
                        >
                          <Typography className={classes.heading}>{`${bondSource !== undefined ? bondSource.name : "???"} --> ${bond.subtype} --> ${bondTarget !== undefined ? bondTarget.name : "???"}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionContent}>
                          {bond.summary}
                        </AccordionDetails>
                      </Accordion>
                    )  
                  })}
                  {/* <Bond /> */}
                
                </AccordionDetails>
              </Accordion>
            )
            })
          : <Typography className={classes.contentMissing}>no bonds yet</Typography>
        }
        

      </AccordionDetails>
    </Accordion>
  )
}

export default Character