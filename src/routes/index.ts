import express, { Request, Response } from 'express'
const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Home page')
})

export default router