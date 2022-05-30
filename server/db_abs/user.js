const Constants = require('../constants');


class IncomeDisk {

    /**
   * registerIncomingDisk
   * @description Register new incoming disk
   * @param number: Number of disks registered
   * @param id_disk: Id of the disks registered
   * @returns Parse object with number and id_disk
   */
    static registerUser(username, email, password, is_admin) {
        const user = new Parse.Object('_User');
        user.set('username', username);
        user.set('email', email);
        user.set('password', password);

        if (is_admin === 'true') {
            user.set('is_admin', true);
        } else {
            user.set('is_admin', false);
        }


        return user;
    }



    /**
   * getAllDisks
   * @description Query to get all existing Income disks
   * @returns Parse object with name, number and the Update date of the disks in table "IncomeDisks"
   */
    static getAllUsers() {
        const users = new Parse.Query('_User');
        return users.find();
    }

    /**
   * modifyIncomingDisk
   * @description Query to get all existing Income disks
   * @returns Parse object with name, number and the Update date of the disks in table "IncomeDisks"
   */
    static modifyUser(username, is_admin, id) {
        const user = new Parse.Object('_User');
        user.set('objectId', id);
        user.set('username', username);

        if (is_admin === 'true') {
            user.set('is_admin', true);
        } else {
            user.set('is_admin', false);
        }


        return user;
    }
}
module.exports = IncomeDisk;