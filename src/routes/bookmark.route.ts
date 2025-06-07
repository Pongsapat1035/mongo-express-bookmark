import express from 'express'
import { checkAuth } from '../middleware/checkuser'
import { createBookmark, getPublicBookmarks, getPublicBookmarkDetail, deleteBookmark, getMyBookmark, getMyBookmarkDetail, updateBookmark } from '../controllers/bookmark.controller'

const bookmark = express.Router()

// get all book if public
// get book
bookmark.get('/public', getPublicBookmarks)
bookmark.get('/public/:id', getPublicBookmarkDetail)

bookmark.use(checkAuth)
bookmark.post('/create', createBookmark)
bookmark.get('/me', getMyBookmark)
bookmark.get('/me/:id', getMyBookmarkDetail)
bookmark.delete('/:id', deleteBookmark) 
bookmark.patch('/:id', updateBookmark)


export default bookmark

