const router = require('express').Router();

const { 
  getAllUsers, 
  getUserById,
  registerUser, 
  updateUser,
  deleteUser, 
  addFriend, 
  deleteFriend

} = require('../controllers/user-controller')

//api/users
router
.route('/')
.get(getAllUsers)
.post(registerUser);

//api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router
.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;