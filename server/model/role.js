const db = require('../util/mySQL');

module.exports = class role{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    static Save(id, name) {
        return db.execute('INSERT INTO role (id, name) VALUES (?, ?);',
        [id, name]);
    }

    static fetchValue(id){
        return db.execute('SELECT name FROM role WHERE id = ?;',
        [id]);
    }
}