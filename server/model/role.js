Parse.initialize("myAppId", "YOUR_JAVASCRIPT_KEY", "36346xv");
Parse.serverURL = 'http://localhost:8888/parse';
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
        const query = new Parse.Query('_User');
        const res = query.get("AkCppw4rCg");
        return(res);
    }
}