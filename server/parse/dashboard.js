const ParseDashboard = require('parse-dashboard');

const dashboard = new ParseDashboard({
    "apps": [{
        "serverURL": 'http://localhost:8888/parse',
        "appId": 'myAppId',
        "masterKey": '36346xv',
        "appName": 'appName'
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