## R-Mapper v.1.0
A tool for aspiring writers to map out the core relationships in their casts of characters.

## Latest Build
https://r-mapper.netlify.app

## Usage Guide
The user can create an account or sign in to an existing one. Users currently only have one Cast to edit. 

They interact with their Cast by: 
> creating new Characters, which will automatically add them to the relationship map. 
> creating new Bonds between added Characters. These too will be drawn on the map automatically.
> freely dragging Characters around on the map
> deleting Characters (see Character accordions below)
> deleting Bonds (see Bond accordions below)
> saving the Cast to the server
> The user can also browse their Characters in list form via the expandable Character and Bond accordions, containing character bios and fuller Bond descriptions respectively. 

Tech used
> React
> Redux
> JointJS diagramming library
> Node.js
> Express
> Heroku
> MongoDB
> Netlify
 
I started the project by conducting user interviews with my aspiring writer friends, the goal being to find what kind of features they’d have an interest in. I used the design methodology of Design Thinking as a basis for this. My findings were interesting, but unfortunately the resulting design ended up outside of the project scope, much due to not finding suitable and sufficiently well-documented libraries to support it. 
 
As such I proceeded with the concept you see here, a character relationship mapping tool using the JointJS library. However, I vastly underestimated how different and more complex JointJS’s data structure is compared to React or Redux. I’ve thus had to cut back on a lot of functionality, which will have to be implemented at a later time.
 
## What I’ve learned:
> Don’t underestimate the complexity of new libraries. Accurate planning is very difficult, if not impossible, before having properly familiarized myself with the tools.
> Building appropriate data structures is also hard before knowing how all the libraries work. In the future, I need to research and experiment with the tools more up-front before proceeding, lest I build structures ill fitted for the types of data I handle.
> I work better in a team than I do alone, especially over time, because the social context helps motivate me and forces me to articulate what I otherwise might not realize.
