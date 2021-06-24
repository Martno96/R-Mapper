import * as joint from 'jointjs'

export const bondCategories = [
  { name: "Familial Bonds", subtypes: [
    "parent of",
    "child of",
    "elder sibling of",
    "younger sibling of",
    "twin of",
    "has kids with",
    "partner of",
  ]},
  { name: "Informal Bonds", subtypes: [
    "lover of",
    "aquantaince of",
    "friend of",
    "close friend of",
    "confides in", 
    "rivals", 
    "has grudge on", 
    "has disdain for", 
    "looks up to", 
    "has crush on"
  ]},
  { name: "Formal Bonds", subtypes: [
    "romantic partner of", 
    "married to",
    "serves", 
    "mentors", 
    "polices", 
    "competes with", 
    "governs over", 
    "is a member of", 
    "cooperates with", 
    "opposes"
  ]},
  { name: "Practical Conflicts", subtypes: [
    "has to assist", 
    "has to defeat",
    "has to protect", 
    "has to find", 
    "has to capture", 
    "has to convince", 
    "has to deceive", 
    "has to escape from", 
    "has to hide from" 
  ]},
  { name: "Social Conflicts", subtypes: [
    "seeks approval from",
    "seeks acceptance from", 
    "wants to be forgiven by", 
    "wants to be respected by", 
    "wants to be loved by", 
    "seeks subservience from", 
    "wants reassurance from", 
    "seeks power through", 
    "seeks to punish", 
    "seeks redemption through" 
  ]}
]

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


export default bondCategories