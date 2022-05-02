const ParseDashboard = require('parse-dashboard');

const dashboard = new ParseDashboard({
    "apps": [{
        "serverURL": process.env.SERVER_URL,
        "graphQLServerURL": "http://localhost:8888/graphql",
        "appId": process.env.APP_ID,
        "masterKey": process.env.MASTER_KEY,
        "appName": process.env.APP_NAME
    }],
    "users": [{
        "user": "user",
        "pass": "pass"
    }]
}, { allowInsecureHTTP: true })

module.exports = {
  dashboard: dashboard,
  url: '/dashboard'
};