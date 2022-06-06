Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const express = require('express');

module.exports = class role {
    constructor(objectId, username) {
        this.objectId = objectId;
        this.username = username;
    }

    /**
   * getPermission
   * @description Finds the first element in the table Session that has the session token
   * @param sessionToken: Session token of current user
   */
    static getPermission(sessionToken) {
        var sq = new Parse.Query('_Session')
        sq.equalTo('sessionToken', sessionToken);
        return sq.first({ useMasterKey: true });
    }

    static getUser() {
        var user = new Parse.Query("_User");
    }
    static save(objectId, username) {
        return 0;
    }

    static fetchValues() {
        // const query = new Parse.Query('_User');
        // const res = query.get("C9uEJqub4f");
        return ("res");

    }
}