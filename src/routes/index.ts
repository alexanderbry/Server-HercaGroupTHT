import express, { Request, Response } from 'express'
const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Birds home page')
})
router.post('/register', (req: Request, res: Response) => {
  res.send('About birds')
})
router.post('/login', (req: Request, res: Response) => {
  res.send('About birds')
})
router.get('/transaction', (req: Request, res: Response) => {
  res.send('About birds')
})

module.exports = router