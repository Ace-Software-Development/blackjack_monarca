/** * @author Mariana Soto Ochoa <a01702593@itesm.mx>
 * Parse dasboard for database management
 * @version 1.0
 * @since 1.0
 */

const ParseDashboard = require('parse-dashboard');

//Creates dashboard
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

//Export dashboard to other files
module.exports = {
  dashboard: dashboard,
  url: '/dashboard'
};
