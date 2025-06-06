import express from 'express'
import { registerHanler, loginHanler } from '../controllers/auth.controller'

const auth = express.Router()

auth.post('/register', registerHanler)
auth.post('/login', loginHanler)

export default auth