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

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import Bond from '../Bond'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     flexBasis: '66.66%',
//     flexShrink: 0,
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
//   accordionContent: {
//     fontSize: theme.typography.pxToRem(15),
//     display: 'flex',
//     flexDirection: 'column'
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const Character = ({ character }) => {
  
  const characters = useSelector(store => store.cast.characters)
  const bonds = useSelector(store => store.cast.bonds)
  const classes = useStyles();
  //const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  }

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // }


          // try changing the components attr. back to div after just adding div hierarchy


  console.log(bonds)

  const bondsSourceOf = bonds.filter(bond => bond.source === character.id)
  const bondsTargetOf = bonds.filter(bond => bond.target === character.id)
  const relevantBondCategories = [...new Set(bondsSourceOf.concat(bondsTargetOf).map(bond => bond.category))]
  const allBondsOfCharacter = bondsSourceOf.concat(bondsTargetOf)

  return (
    <div className="character" id="character">
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="character" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
        className={classes.root}
      >
        <div className="character-name" id="characterName">
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={character.name} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            
            {/* ----------- CATEGORY ----------- */}
              {relevantBondCategories.map((category) => {
                return (
                  <div className="bond-category" id="bondCategory">
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={category} />
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                    
                      <List component="div" disablePadding>
                        {/* ----------- BOND ----------- */}
                        {allBondsOfCharacter.filter(bond => bond.category === category).map((bond) => {
                          return (
                            <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary={`${characters.find(character => character.id === bond.source).name} --> ${bond.summary} --> ${characters.find(character => character.id === bond.target).name}`} />
                            </ListItem>
                          )  
                        })}
                      </List>
                    
                    </Collapse>
                  </div>
                )  
              })}
            
          </List>
          
        </Collapse>

      </List>
    </div>
  )

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