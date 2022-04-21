const db = require('../util/mySQL');

module.exports = class role{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    static save(id, name) {
        return db.execute('INSERT INTO role (id, name) VALUES (?, ?);',
        [id, name]);
    }

    static fetchValues(){
        return db.execute('SELECT * FROM role;');
    }
}