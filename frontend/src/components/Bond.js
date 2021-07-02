import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'

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

const Bond = ({ bond, bondSource, bondTarget }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [removeBondDialogOpen, setRemoveBondDialogOpen] = useState(false)
  
  const handleRemoveBondDialogClose = (event) => {
    setRemoveBondDialogOpen(false)
  }

  const handleRemoveBond = (event) => {
    dispatch(cast.actions.removeBond({ bond }))
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <Typography className={classes.heading}>
          {
            `${bondSource !== undefined 
              ? bondSource.name 
              : "???"
            } 
            --> ${bond.subtype} --> 
            ${bondTarget !== undefined 
              ? bondTarget.name 
              : "???"
            }`
          }
        </Typography>
        <Button 
          size="small"
          onClick={(event) => {
            event.stopPropagation()
            console.log("REMOVE CHARACTER DIALOG SHOULD BE OPEN")
            setRemoveBondDialogOpen(true)
          }}
          onFocus={(event) => event.stopPropagation()}
        >
          DELETE
        </Button>
        <ConfirmationDialog 
          open={removeBondDialogOpen} 
          onClose={handleRemoveBondDialogClose} 
          onSubmit={handleRemoveBond}
          action={"permanently delete"}
          target={
            `${bondSource !== undefined 
              ? bondSource.name 
              : "???"
            } 
            --> ${bond.subtype} --> 
            ${bondTarget !== undefined 
              ? bondTarget.name 
              : "???"
            }`
          }
          buttonLabel={"DELETE"}
        />
      </AccordionSummary>
      <AccordionDetails className={classes.accordionContent}>
        {bond.summary}
      </AccordionDetails>
    </Accordion>
  )
}

export default Bond