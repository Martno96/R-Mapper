import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(res=> {
    console.log("DB Connected!")
  }).catch(err => {
  console.log(Error, err.message);
  })
 
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
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello world')
})

//SAVE cast
app.post('/casts/:castId', authenticateUser)
app.post('/casts/:castId', async (req, res) => {
  const { castId } = req.params
  const { cast } = req.body
  const graph = cast.graph
  const characters = cast.characters
  const bonds = cast.bonds

  try {
    const cast = await Cast.findOne({ _id: castId })
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
  } catch (error) {
    res.status(404).json({ success: false, error:"Unable to save cast" })
  }
})

//LOAD cast
app.get('/casts/:castId', authenticateUser)
app.get('/casts/:castId', async (req, res) => {
  const { castId } = req.params
  try {
    const cast = await Cast.findOne({ _id: castId })
    if (cast) {
      res.json({ 
        success: true, 
        graph: cast.graph !== undefined ? cast.graph : '{"cells":[]}', 
        characters: cast.characters, 
        bonds: cast.bonds
      })
    // } else {
    //   res.json({ success: true, graph: '{"cells":[]}', characters: [], bonds: []})
    }
  } catch (error) {
    res.status(404).json({ success: false, error:"Cast not found" })
  }
}) 

app.post('/signup', async (req, res) => {
  const { username, password } = req.body
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
              casts: user.casts,
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
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userID: user._id,
        username: user.username,
        casts: user.casts,
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