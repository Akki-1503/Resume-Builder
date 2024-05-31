const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const pick = require('lodash/pick')
const jwt = require('jsonwebtoken')

const usersCtlr = {}

usersCtlr.register = async (req, res) => {
  try {
    const body = pick(req.body, ['username', 'email', 'password', 'contact'])
    console.log(req.body, 'body')

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
    if (!passwordRegex.test(body.password)) {
      return res.status(401).json({
        error: 'InvalidPassword',
        message: 'Password must be 8 characters or more,should contain at least one capital letter, and include one of these special characters: !@#$%^&*_-'
      })
    }

    const existingUser = await User.findOne({ email: body.email })
    if (existingUser) {
      return res.status(400).json({
        error: 'DuplicateEmail',
        message: 'You have already registered with this email. Kindly, please log in.'
      })
    }

    const user = new User(body)
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword

    const userDoc = await user.save()
    res.json(userDoc)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'ServerError', message: 'An error occurred while processing your request.' })
  }
}

usersCtlr.login = async(req, res) => {
    const body = pick(req.body, ['email', 'password', 'role'])
    const user = await User.findOne({email: body.email})
    if(user) {
        const result = await bcrypt.compare(body.password, user.password)
        console.log(result, 'result')
        if(result) {
            //res.json(user)
            const tokenData = {
                _id: user._id,
                role: user.role
            }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET)
            console.log(token, 'token')
            console.log(tokenData, 'tokendata')
            res.json({
                token : `Bearer ${token}`
            })
        } else{
            res.status(404).json({error: 'invalid username or password'})
        }
    } else{
        res.status(404).json({error: 'This email is not registered with us. Please try to register and login.'})
    }
}

usersCtlr.account = async(req, res) => {
    try{
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(pick (user, ['_id', 'username', 'email', 'contact']))
    } catch(e) {
        res.json(e)
    }
    //res.json({messsage: 'user info'})
}

usersCtlr.role = async(req, res) => {
    const role= req.params.role
    try{
        
        const user= await User.find({role})
        res.json(user)
        
    } catch(err) {
        res.json(err)
    }
}

usersCtlr.resetPassword = async(req, res) => {
    try{
        const {email, newPassword, confirmNewPassword} = req.body

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ error: 'PasswordMismatch', message: 'New password and confirm password do not match' })
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({ error: 'UserNotFound', message: 'User not found' })
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()
        res.json({message: 'Password Changed Successfully'})
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'ServerError', message: 'An error occurred while processing your request.' })
    }
}

usersCtlr.update = async (req, res) => {
    try {
        const userId = req.params.userId
        console.log('id', userId)
        const body = req.body
        console.log('body', body)

        // Update query to only use _id
        const user = await User.findOneAndUpdate(
            { _id: userId },
            body,
            { new: true, runValidators: true }
        )

        console.log('user', user)

        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ error: 'User not found or not authorized to update' })
        }
    } catch (err) {
        console.error('Error updating user:', err)
        res.status(500).json({ error: 'An error occurred while updating the profile.' })
    }
}

module.exports = usersCtlr
