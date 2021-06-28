import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

console.log('apa')

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

const Cast = mongoose.model('Cast', {
  graph: {
    type: Object, 
    required: true
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
  console.log('apa')
  res.send('Hello world')
})

//load user's (for now one and only) cast
app.get('/users/:username', authenticateUser)
app.get('/users/:username', async (req, res) => {
  res.json({ success: true, graph: user.graph, characters: user.characters, bonds: user.bonds})
  //the url will display just as such unless I make { username } a... param? Check week 2 or week 3 backend project!!
  // const { username } = req.params
  // const user = await User.findOne({ username })
  // try {
  //   res.json({ success: true, graph: user.graph, characters: user.characters, bonds: user.bonds})
  // } catch (error) {
  //   res.status(400).json({ success: false, message: "Invalid Request", error })
  // }
}) 

app.post('/signup', async (req, res) => {
  const { username, password } = req.body // We separated username and password from the body
  res.json({success: true, userID: false})
  // try {
  //   const salt = bcrypt.genSaltSync()
  //   const newUser = await new User ({
  //     username, 
  //     password: bcrypt.hashSync(password, salt)
  //   }).save()
  //   if (newUser) {
  //     //HERE CREATE AN EMPTY GRAPH (MONGOOSE OBJECT), so there is always something to load!!!
  //     console.log("IS A NEW USER OwO")
  //     try {
  //       const newCast = await new Cast ({
  //         graph: {},
  //         characters: [],
  //         bonds: []
  //       }).save()
  //     } catch (error) {
  //       res.status(500).json({ success: false, error: 'empty cast could not be created upon new user' })
  //     }
  //     try {
  //       newUser.casts = [newCast._id]
  //       newUser = await newUser.save()
  //     } catch (error) {
  //       res.status(500).json({ success: false, error: 'could not assign new empty cast to new user' })
  //     }
  //     res.json({
  //       success: true,
  //       userID: newUser._id,
  //       username: newUser.username,
  //       cast: newUser.casts[0],
  //       accessToken: newUser.accessToken
  //     })
  //   }
  // } catch(error) {
  //   if(error.code===11000){
  //     res.status(400).json({ success: false, error: 'Username already exists', field: error.keyValue })
  //   }
  //   res.status(400).json({ success: false, message: 'Invalid Request', error: "I have no idea tbh" })
  // }
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;
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