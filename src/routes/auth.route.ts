import express from 'express'
import { registerHanler, loginHanler, getUserHanler } from '../controllers/auth.controller'
import { checkAuth } from '../middleware/checkuser'
const auth = express.Router()

auth.post('/register', registerHanler)
auth.post('/login', loginHanler)
auth.use(checkAuth)
auth.get('/me', getUserHanler)


export default auth