const Router = require('express').Router()

Router.get('', async (req, res)=>{
  const {Profile} = req.app.get('models')
  const users = await Profile.findAll()
  if(!users) return res.status(404).end()
  res.json(users)
})

module.exports = Router