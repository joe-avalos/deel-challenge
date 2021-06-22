const Router = require('express').Router()
const {Op} = require('sequelize')

const {getProfile} = require('../middleware/getProfile')

Router.post('/deposit/:userid', getProfile, async (req, res) => {
  const {Job, Contract} = req.app.get('models')
  
  const profileId = parseInt(req.profile.id)
  
  let {userid} = req.params
  userid = parseInt(userid)
  
  if (userid !== profileId) return res.status(401).json('You\'re not allowed to deposit funds to someone else\'s account.')
  if (req.profile.type !== 'client') return res.status(400).json('You\'re not allowed to deposit funds to a contractor account.')
  
  let {payment} = req.body
  payment = parseFloat(payment)
  
  const jobs = await Job.findAll({
    include: [{
      model: Contract,
      attributes: [],
      where: {
        status: {
          [Op.not]: 'terminated'
        },
        [Op.or]: [
          {ClientId: profileId},
          {ContractorId: profileId},
        ]
      }
    }],
    where: {
      paid: {
        [Op.not]: true
      }
    }
  })
  const jobsTotal = jobs.reduce((acc,job)=>{
    acc += job.price
    return acc
  },0)
  if ((jobsTotal * 0.25) < payment) return res.status(400).json(`You're not allowed to deposit more than 25% of the total amount ($ ${jobsTotal}) due.`)
  req.profile.balance += payment
  req.profile.save()
  res.json('Funds added successfully.')
})

module.exports = Router