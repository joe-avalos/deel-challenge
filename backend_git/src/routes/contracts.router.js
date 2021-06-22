const Router = require('express').Router()
const {Op} = require('sequelize')

const {getProfile} = require('../middleware/getProfile')

Router.get('', getProfile, async (req, res) => {
  const {Contract} = req.app.get('models')
  const profileId = parseInt(req.profile.id)
  const contracts = await Contract.findAll({
    attributes: ['id', 'terms', 'status'],
    where: {
      status: {
        [Op.not]: 'terminated'
      },
      [Op.or]: [
        {ClientId: profileId},
        {ContractorId: profileId},
      ]
    }
  })
  if (!contracts) return res.status(404).end()
  res.json(contracts)
})
/**
 * FIX ME!
 * @returns contract by id
 */
Router.get('/:id', getProfile, async (req, res) => {
  const {Contract} = req.app.get('models')
  const profileId = parseInt(req.profile.id)
  const {id} = req.params
  const contract = await Contract.findOne({
    where: {
      id,
      [Op.or]: [
        {ClientId: profileId},
        {ContractorId: profileId},
      ]
    }
  })
  if (!contract) return res.status(404).end()
  res.json(contract)
})

module.exports = Router