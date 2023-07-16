const express = require('express')
const router = express.Router()

const {register,login,getUser} = require('../controllers/userController')

router.post('/',register)
router.post('/login',login)
router.get('/me',getUser)





module.exports = router