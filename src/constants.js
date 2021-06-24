import * as joint from 'jointjs'

export const bondCategories = [
  { name: "Familial Bonds", subtypes: [
    "parent of", //family [X]
    "child of", //family [X]
    "elder sibling of", //"boys.svg" [X]
    "younger sibling of", //"kids-children.svg" [X]
    "twin of", //"man-boy.svg" [X]
    "has kids with", //family [X]
    "partner of", //two hearts!! [X]
  ]},
  { name: "Informal Bonds", subtypes: [
    "lover of", //bed thing [X]
    "aquantaince of", //two people or talking? "CHAT" [X]
    "friend of", //slight smile
    "close friend of", //laughing black or white [X]
    "confides in", //hush [X]
    "rivals", //lightning [X]
    "has grudge on", // angry[X]
    "has disdain for", //thumbs down [X]
    "looks up to", //celeberties [X]
    "has crush on", //heart [X]
  ]},
  { name: "Official Bonds", subtypes: [
    "romantic partner of", //two hearts!! [X]
    "married to", //wedding ring thing [X]
    "serves", // working desk OR bowing [X]
    "mentors", //lecturer [X]
    "polices", // shield-lock or police man or open eye [X]
    "competes with", // lightning [X]
    "governs over", // heirarchy one [X]
    "is a member of", // any one the group or about us ones [X]
    "cooperates with", // handshake [X]
    "opposes" // angry-battle.svg or fist [X]
  ]},
  { name: "Practical conflicts", subtypes: [
    "has to assist", //helping hand [X]
    "has to defeat", //fist or sword [X]
    "has to protect", //shield [X] 
    "has to find", //magnifying glass [X] https://uxwing.com/wp-content/themes/uxwing/download/21-maps-and-location/map-search.svg
    "has to capture", //handcuffs!!, lock or bars [X]
    "has to convince", //"CHAT" speech bubble(s) or scales [X] speechbubble with star
    "has to decieve", //MASQUERADE MASK or fishing hook [X] 
    "has to escape from", //running [X]
    "has to hide from" //struck-out eye </> [X]
  ]},
  { name: "Social conflicts", subtypes: [
    "seeks approval from", //thumbs up [X]
    "seeks acceptance from", //handshake? heart? [X]
    "wants to be forgiven by", //hug, tears? bandage [X] sad face OR leaky pipe or broken heart
    "wants to be respected by", //star [X]
    "wants to be loved by", //heart [X]
    "seeks subservience from", //whip or bowing before someone [X]
    "wants reassurance from", // circle repeat [X]
    "seeks power through", //crown or crystal ball [X] https://uxwing.com/wp-content/themes/uxwing/download/24-sport-and-awards/crown.svg
    "seeks to punish", //judge mallet gavel [X]
    "seeks redemption through" //determined face? [X] Justice scales
  ]}
]

// export const bondCategories = [
//   "Familial bonds",
//   "Proffessional bonds",
//   "Practical conflicts",
//   "Social conflicts"
// ]

export const bondSubType = [
  "seeks approval from",
  "seeks acceptance from",
  "seeks forgiveness from",
  "seeks respect from",
  "seeks love from",
  "seeks subservience from",
  "seeks reassurance from",
  "seeks power through",
  "seeks to punish",
  "seeks redemption through"
]

//shelf the below for now and just define the expand behavior in bondLink.appendLabel()

//export const BondLink = joint.dia.Link.define('custom.BondLink', {
export const BondLink = joint.shapes.standard.Link.define('custom.BondLink', {
  attrs: { //the reason stuff is "missing" is because I was relying on default inheritance frome the standard.Ellipse model
    
  }
  // defaultLabel: {}
}, {
  markup: [{ //this markup shall not be included as it refers to the label and not the link!
    tagName: 'ellipse',
    selector: 'body',
  }, {
    tagName: 'text',
    selector: 'label'
  }, {
    tagName: 'circle',
    selector: 'button'
  }, {
    tagName: 'text',
    selector: 'buttonLabel'
  }]
})
// export const BondLink = joint.shapes.standard.Link.define('custom.BondLink', {
//   attrs: { //the reason stuff is "missing" is because I was relying on default inheritance frome the standard.Ellipse model
//     body: {
//       refWidth: '100%',
//       refHeight: '100%',
//       strokeWidth: 2,
//       stroke: 'black',
//       fill: 'grey',
//       refRx: '60%',
//       refRy: '100%'
//     },
//     label: {
//       //text: 'character.name', //should I have this here or does that prevent variable use upon creating new instance?
//       textVerticalAnchor: 'middle',
//       textAnchor: 'middle',
//       // refX: '50%',
//       // refY: '50%',
//       fill: 'white',
//       cursor: 'default'
//     },
//     button: {
//       cursor: 'pointer',
//       ref: 'buttonLabel',
//       refWidth: '150%',
//       refHeight: '150%',
//       refX: '-25%',
//       refY: '-25%'
//     },
//     buttonLabel: {
//       pointerEvents: 'none',
//       refX: '100%',
//       refY: 0,
//       textAnchor: 'middle',
//       textVerticalAnchor: 'middle'
//     }
//   }
// }, {
//   markup: [{
//     tagName: 'ellipse',
//     selector: 'body',
//   }, {
//       tagName: 'text',
//       selector: 'label'
//   }, {
//       tagName: 'circle',
//       selector: 'button'
//   }, {
//       tagName: 'text',
//       selector: 'buttonLabel'
//   }]
// })
export default bondCategories