const express = require('express');
const bodyParser = require('body-parser');

const {sequelize} = require('./model')

const UsersRouter = require('./routes/users.router')
const ContractsRouter = require('./routes/contracts.router')
const JobsRouter = require('./routes/jobs.router')
const BalancesRouter = require('./routes/balances.router')
const AdminRouter = require('./routes/admin.router')

const app = express();

app.use(bodyParser.json());

app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use('/users', UsersRouter)
app.use('/contracts', ContractsRouter)
app.use('/jobs', JobsRouter)
app.use('/balances', BalancesRouter)
app.use('/admin', AdminRouter)

module.exports = app;
