Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const express = require('express');

module.exports = class role{
    constructor(objectId, username){
        this.objectId = objectId;
        this.username = username;
    }

    static save(objectId, username) {
        return 0;
    }

    static fetchValues(){
        // const query = new Parse.Query('_User');
        // const res = query.get("C9uEJqub4f");
        return("res");
        
    }
}