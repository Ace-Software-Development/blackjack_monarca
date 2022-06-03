const Constants = require('../constants');


class User {

    /**
   * registerUser
   * @description Register new incoming disk
   * @param username: username of new user
   * @param email: email of of new user
   * @param password: pass of new user
   * @param is_admin: rol of new user
   * @returns Parse 
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
   * getAllUsers
   * @description Query to get all existing users
   * @returns Parse object
   */
    static getAllUsers() {
        const users = new Parse.Query('_User');
        return users.find();
    }

    /**
   * registerUser
   * @description Register new incoming disk
   * @param username: username of user
   * @param id: id of user
   * @param is_admin: rol of user
   * @returns Parse 
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

    /**
* deleteUser
* @description Delete user
* @param id: id of user
* @returns Parse object
*/
    static deleteUser(id) {
        const user = new Parse.Object("_User");
        user.set('objectId', id);
        user.destroy(null, { useMasterKey: true });

        return user;
    }
}
module.exports = User;