require('dotenv').config()

const alias = {
    development:"development",
    dev:'development',
    test:'test',
    production:'production',
    prod:'production'
}

module.exports = {
    appMode:alias[process.env.NODE_ENV] || 'dev',
    appHost:process.env.APP_HOST || 'localhost',
    appPort:process.env.APP_PORT || 3000,
}