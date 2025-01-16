const User = require('../models/User')
const Otp = require('../models/Otp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
const { sendMail } = require('../utils')

module.exports.register = async (req, res) => {
    try {
        const {fullName, email, password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser)    res.status(409).json({'message': 'Account with that email already exists!'})
        else {
            const saltRounds = 10
            const hashedPass = await bcrypt.hash(password, saltRounds)
            const newUser = new User({
                fullName: fullName,
                email: email,
                password: hashedPass
            })
            await newUser.save()
            await sendMail()
            res.json(newUser)
        }
    }
    catch(err) { 
        console.log(err)
        res.status(500).json({'message': 'Something went wrong'})
    }
}

module.exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user)   return res.status(401).json({'message': 'Email or password is incorrect!'})
        const isSamePass = await bcrypt.compare(password, user.password)
        if(!isSamePass)     return res.status(401).json({'message': 'Email or password is incorrect!'})
        jwt.sign({email, id: user._id, fullName: user.fullName}, 'JWT_SECRET', {}, (err, token) => {
            if(err)     return res.status(400).json(err)
            let cookieOptions = {
                sameSite: 'None',
                secure: true
            }
            res.cookie('token', token, cookieOptions).json({
                id: user._id,
                fullName: user.fullName,
                email: email
            })
        })
    }
    catch(err) { 
        console.log(err)
        res.status(500).json({'message': 'Internal server error'})
    }
}

module.exports.logout = (req, res) => {
    res.cookie('token', '').json({'message': 'Logged out successfully'})
}

module.exports.profile = (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, 'JWT_SECRET', {}, (err, userInfo) => {
        if(err)     res.status(401).json({'message': 'Invalid token'})
        else res.status(200).json(userInfo)
    })
}

module.exports.sendResetPassMail = async (req, res) => {
    try {
        const {email} = req.body
        const existingUser = await User.findOne({email})
        if (!existingUser)    res.status(409).json({'Message': 'Account with that email does not exist!'})


        const mailOptions = {
            from: 'JobHub <manas.tiu@gmail.com>',
            to: email,
            subject: `Reset Password - JobHub`,
            text: `Hi,\n\nYou have requested a password reset request for your account. Please click on the link below to reset your password.\n\nReset Password Link - ${resetPassLink}\n\nIf you didn't initiate this request kindly ignore this email.\n\nThanks and Regards,\nTeam JobHub`
        }

        await sendMail(mailOptions)

        res.json('ok')
    }
    catch (err) { 
        console.log(err) 
        res.status(500).json(err)
    }   
}

module.exports.resetPassword = async (req, res) => {
    try {
        const {password, userID} = req.body
        const saltRounds = 10
        const hashedPass = await bcrypt.hash(password, saltRounds)
        const userDoc = await User.findOneAndUpdate({_id: userID}, {password: hashedPass})
        res.status(201).json({'message': 'Password updated!'})
    }
    catch (err) { 
        console.log(err)
        res.status(500).json(err); 
    }   
}

module.exports.sendOTP = async (req, res) => {
    try {
        const {email} = req.body

        const existingUser = await User.findOne({email})
        if(existingUser)    res.status(409).json({'message': 'Account already exists!'})

        let otp = otpGenerator.generate(6, { specialChars: false })
        const existingOTPDoc = await Otp.findOne({email})
        if (existingOTPDoc) await Otp.deleteOne({email})
        const newOtpModel = new Otp({email, otp})
        await newOtpModel.save()

        const mailOptions = {
            from: 'JobHub <manas.tiu@gmail.com>',
            to: email,
            subject: `Verify Your Email ID - JobHub`,
            text: `Hi,\n\nThank you for your interest in accessing our platform, JobHub. To proceed further, you need to verify your email id with an One Time Password.\n\nHere is your One Time Password (OTP) for login: ${otp}.\n\nPlease note that the OTP is valid for only one session. If you try to refresh the page or leave the portal, you will be required to regenerate a new OTP.\n\nBest Regards,\nTeam JobHub`
        }

        await sendMail(mailOptions)

        res.status(201).json({'message': 'mail sent'})
    }
    catch (err) { res.status(500).json({'message': 'Something went wrong!'}) }
}

module.exports.verifyOTP = async (req, res) => {
    try {
        const {email, otp} = req.body
        const origOtp = await Otp.findOne({email})
        if(!origOtp)    res.status(401).json({'message': 'Invalid OTP'})

        if(otp === origOtp.otp)     res.status(201).json({'message': 'otp matched'})
        else    res.status(401).json({'message': 'Invalid OTP'})
    }
    catch (err) { res.status(500).json({'message': 'Something went wrong!'}) }
}