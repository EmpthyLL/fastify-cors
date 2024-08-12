const appConfig = require('./config/app')
const DBConfig = require('./config/database')
const logger = require('./logger')
const fastify = require('fastify')
const fastifycors = require('@fastify/cors')
const { teamManager } = require('./routes/team-controller')
const app = fastify({logger:logger[appConfig.appMode]})
const port = appConfig.appPort

app.register(fastifycors)
app.register(teamManager,{prefix:'/team'})

try {
    app.listen({port})
} catch (error) {
    if(error){
        app.log.error(error.message);
        process.exit(1);
    }
}