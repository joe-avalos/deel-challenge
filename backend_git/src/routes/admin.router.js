const Router = require('express').Router()
const {Op} = require('sequelize')

Router.get('/best-profession', async (req, res) => {
  const {Job, Profile, Contract} = req.app.get('models')
  
  let {start, end} = req.query
  if (!start || !end) return res.status(400).json('Please provide a "start" and "end" value for a specific range (http://url/admin/best-profession?start=2020-08-15T19:11:26.737Z&end=2021-08-15T19:11:26.737Z)')
  
  const contractors = await Profile.findAll({where: {type: 'contractor'}})
  
  const professions = contractors.reduce((acc, user) => {
    if (acc[user.profession] !== undefined) acc[user.profession].push(user.id)
    else acc[user.profession] = [user.id]
    return acc
  }, {})
  
  let maxEarnings = 0;
  let bestProfession = ''
  
  const tuples = Object.entries(professions)
  
  for (let i = 0; i < tuples.length; i++) {
    const tuple = tuples[i]
    
    const jobs = await Job.findAll({
      include: [{
        model: Contract,
        attributes: [],
        where: {
          ContractorId: {
            [Op.or]: [...tuple[1]]
          }
        }
      }],
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: [new Date(start), new Date(end)]
        }
      }
    })
    
    const professionTotal = jobs.reduce((acc, job) => {
      acc += job.price
      return acc
    }, 0)
    
    if (professionTotal > maxEarnings) {
      maxEarnings = professionTotal;
      bestProfession = tuple[0]
    }
  }
  
  res.json(`${bestProfession} with total earnings of $${maxEarnings}`)
})

Router.get('/best-clients', async (req, res) => {
  const {Job, Profile, Contract} = req.app.get('models')
  
  let {start, end, limit} = req.query
  if (!start || !end) return res.status(400).json('Please provide a "start" and "end" value for a specific range (http://url/admin/best-profession?start=2020-08-15T19:11:26.737Z&end=2021-08-15T19:11:26.737Z)')
  
  limit = parseInt(limit) || 2
  
  const clients = await Profile.findAll({where: {type: 'client'}})
  
  const bestClients = []
  
  for (let i = 0; i < clients.length; i++) {
    const client = clients[i]
    
    const jobs = await Job.findAll({
      include: [{
        model: Contract,
        attributes: [],
        where: {
          ClientId: client.id
        }
      }],
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: [new Date(start), new Date(end)]
        }
      }
    })
    
    const clientTotal = jobs.reduce((acc, job) => {
      acc += job.price
      return acc
    }, 0)
    
    if (clientTotal > 0) {
      bestClients.push({
        id: client.id,
        fullName: `${client.firstName} ${client.lastName}`,
        paid: clientTotal
      })
    }
  }
  bestClients.sort((a, b) => b.paid - a.paid);
  
  res.json(bestClients.slice(0, limit))
})

module.exports = Router