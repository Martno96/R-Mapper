import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'

import Bond from './Bond'

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
}));

export const Character = ({ character }) => {
  
  const characters = useSelector(store => store.cast.characters)
  const bonds = useSelector(store => store.cast.bonds)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const bondsSourceOf = bonds.filter(bond => bond.source === character.id)
  const bondsTargetOf = bonds.filter(bond => bond.target === character.id)
  const relevantBondCategories = [...new Set(bondsSourceOf.concat(bondsTargetOf).map(bond => bond.category))]
  const allBondsOfCharacter = bondsSourceOf.concat(bondsTargetOf)

  // console.log(bondsSourceOf)
  // console.log(bondsTargetOf)

  
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
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
          >
            RENAME
          </Button>
          <Button 
            size="small"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
          >
            REMOVE
          </Button>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionContent}>
        
        {/* ----------- CATEGORY ----------- */}
        {relevantBondCategories.map((category) => {
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
                  return (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                      >
                        <Typography className={classes.heading}>{`${characters.find(character => character.id === bond.source).name} --> ${bond.summary} --> ${characters.find(character => character.id === bond.target).name}`}</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.accordionContent}>
                        {bond.details}
                      </AccordionDetails>
                    </Accordion>
                  )  
                })}
                {/* <Bond /> */}
              
              </AccordionDetails>
            </Accordion>
          )
        })}
        

      </AccordionDetails>
    </Accordion>
  )
}

export default Character