import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise
 
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

app.get('/', (req, res) => {
  res.send('Hello world')
})

//load user's (for now one and only) cast
app.get('/users/:username', authenticateUser)
app.get('/users/:username', async (req, res) => {
  const { message } = req.body;
  try {
    res.json({ success: true, message: "here is the secret message :D" })
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Request", error })
  }
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body; // We separated username and password from the body
  try {
    const salt = bcrypt.genSaltSync();
    const newUser = await new User ({
      username, 
      password: bcrypt.hashSync(password, salt)
    }).save();
    if (newUser) {
      res.json({
        success: true,
        userID: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken
      });
    }
  } catch(error) {
    if(error.code===11000){
      res.status(400).json({ success: false, error: 'Username already exists', field: error.keyValue })
    }
    res.status(400).json({ success: false, message: 'Invalid Request', error })
  }
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