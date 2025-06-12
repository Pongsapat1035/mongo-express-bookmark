import express from 'express'
import { checkAuth } from '../middleware/checkAuth'
import {
    addToWhitelist,
    getAllWhitelists,
    removeWhitelist
} from '../controllers/whitelist.controller'

const whitelist = express.Router()

whitelist.use(checkAuth)
whitelist.get('/', getAllWhitelists)
whitelist.post('/', addToWhitelist)
whitelist.delete('/:id', removeWhitelist)

export default whitelist