const Router = require('express').Router()
const {Op} = require('sequelize')

const {getProfile} = require('../middleware/getProfile')

Router.get('/unpaid', getProfile, async (req, res) => {
  const {Job, Contract} = req.app.get('models')
  const profileId = parseInt(req.profile.id)
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
  if (!jobs) return res.status(404).end()
  res.json(jobs)
})

Router.post('/:job_id/pay', getProfile, async (req, res) => {
  const {Contract, Job} = req.app.get('models')
  const profileId = parseInt(req.profile.id)
  const {job_id} = req.params
  let {payment} = req.body
  payment = parseFloat(payment)
  const job = await Job.findOne({
    include: [{
      model: Contract,
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
      id: job_id
    }
  })
  if (!job) return res.status(404).send()
  if (payment > req.profile.balance) return res.status(400).send('Not enough funds.')
  if (payment > job.price) return res.status(400).send('Paying too much.')
  job.paid = true;
  job.paymentDate = (new Date()).toISOString()
  req.profile.balance -= payment
  req.profile.save()
  job.save()
  
  res.json('Successful payment.')
})

module.exports = Router