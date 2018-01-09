const express = require('express')
const router = express.Router()

const users = require('../controllers/users')


/*
* ~~~~ Routes for users ~~~~
*/
router.route('/users')
  .get(users.getAllUsers)
  .post(users.createUser)

router.route('/users/:userId/id')
  .get(users.getUserById)
  .put(users.updateUser)
  .delete(users.deleteUser)

router.route('/users/:email/email')
  .get(users.getUserByEmail)

/*
TODO:
update user
delete user 
get userById
get userByEmail
*/ 

/*
* ~~~~ Routes for coupons ~~~~
*/


module.exports = router