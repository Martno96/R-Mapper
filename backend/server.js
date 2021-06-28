import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

//"mongodb://localhost/project-mongo"
const mongoUrl = process.env.MONGO_URL 
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(res=> {
    console.log("DB Connected!")
  }).catch(err => {
  console.log(Error, err.message);
  })
// mongoose.Promise = Promise
 
const User = mongoose.model('User', {
  username: {
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  casts: {
    type: Array
  }
})

// const Graph = mongoose.model('Graph', {
//   cells: {
//     type: Array,
//     required: true
//   }
// })

// const graphy = new Graph()

//Either:
//[_] find out how to properly create a Schema manually
//OR
//[_] Use npm package

const Cast = mongoose.model('Cast', {
  graph: {
    type: String
  },
  characters: {
    type: Array, 
    required: true
  },
  bonds: {
    type: Array, 
    required: true
  }
})

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')
  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ message: "Not authenticated" })
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error})
  }
}

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json()) //CHANGED TO THIS FROM bodyParser!! IF EVERYTHING BROKEN LOOK HERE FIRST

// app.use(express.json, (req, res) => {
//   console.log(req.body)
// })

app.get('/', (req, res) => {
  res.send('Hello world')
})

//SAVE cast
app.post('/users/:username', authenticateUser)
app.post('/users/:username', async (req, res) => {
  const { username } = req.params
  //const { graph, characters, bonds } = req.body
  const { cast } = req.body
  // const rehydratedCast = JSON.parse(cast)
  const graph = cast.graph
  const characters = cast.characters
  const bonds = cast.bonds

  //yeah but why would I want the following?
  // console.log("rehydrated graph:")
  // console.log(graph)
  // console.log("rehydrated characters:")
  // console.log(characters)
  // console.log("rehydrated bonds:")
  // console.log(bonds)

  try {
    const user = await User.findOne({ username })
    if (user) {
      // console.log("found user:")
      // console.log(user)
      try {
        if (user.casts.length > 0) {
          const cast = await Cast.findOne({ _id: user.casts[0] })
          if (cast) {
            try { 
              cast.graph = JSON.stringify(graph)
              cast.characters = characters
              cast.bonds = bonds
              await cast.save()
            } catch (error) {
              res.status(500).json({ success: false, error: "Unable to save cast" })
            }
            const savedCast = JSON.stringify(cast)
            console.log(JSON.parse(savedCast))
            res.json({ success: true, message: "Cast was saved successfully", savedCast})
          }
        } else {
          res.json({ success: true, graph: '{"cells":[]}', characters: [], bonds: []})
        }
      } catch (error) {
        res.status(404).json({ success: false, error: "Found user, but not their cast" })
      }
    }
  } catch (error) {
    res.status(404).json({ success: false, error:"User not found" })
  }
})

//LOAD cast
app.get('/users/:username', authenticateUser)
app.get('/users/:username', async (req, res) => {
  //the url will display just as such unless I make { username } a... param? Check week 2 or week 3 backend project!!
  const { username } = req.params
  try {
    const user = await User.findOne({ username })
    if (user) {
      console.log("found user:")
      console.log(user)
      try {
        if (user.casts.length > 0) {
          const cast = await Cast.findOne({ _id: user.casts[0] })
          if (cast) {
            console.log(`found ${user}'s cast:`)
            console.log(cast)
            res.json({ success: true, graph: cast.graph, characters: cast.characters, bonds: cast.bonds})
          }
        } else {
          res.json({ success: true, graph: '{"cells":[]}', characters: [], bonds: []})
        }
      } catch (error) {
        res.status(404).json({ success: false, error: "Found user, but not their cast" })
      }
    }
  } catch (error) {
    res.status(404).json({ success: false, error:"User not found" })
  }
}) 

//ENDPOINT WORKS!
app.post('/signup', async (req, res) => {
  const { username, password } = req.body // We separated username and password from the body
  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User ({
      username, 
      password: bcrypt.hashSync(password, salt)
    }).save()
    
    if (newUser) {
      try {
        const newCast = await new Cast ({
          graph: '{"cells":[]}',
          characters: [],
          bonds: []
        }).save()
        if (newCast) {
          try {
            newUser.casts = [newCast._id]
            await newUser.save()
            res.json({
              success: true,
              userID: newUser._id,
              username: newUser.username,
              cast: newUser.casts[0],
              accessToken: newUser.accessToken
            })
          } catch (error) {
            res.status(500).json({ success: false, error: 'could not assign new empty cast to new user' })
          }
        }
      } catch (error) {
        res.status(500).json({ success: false, error: 'empty cast could not be created upon new user' })
      }
      
    }
  } catch(error) {
    if(error.code===11000){
      res.status(400).json({ success: false, error: 'Username already exists', field: error.keyValue })
    }
    res.status(400).json({ success: false, message: 'Invalid Request', error: "I have no idea tbh" })
  }
})

//ENDPOINT WORKS
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  console.log("username:")
  console.log(username)
  console.log("password:")
  console.log(password)
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userID: user._id,
        username: user.username,
        cast: user.casts[0],
        accessToken: user.accessToken
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})