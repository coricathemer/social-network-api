const { User } = require('../models');

const userController = {
  getAllUsers(req, res){
    User.find()
      .select('-__v')
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  }, 

  getUserById({ params }, res){
    User.findOne({ _id: params.id })
      .select('-__v')
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  registerUser({ body }, res){
    User.create(body)
      .then((data) => {res.json(data)})
      .catch((err) => {console.log(err)});
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id!'});
        return;
      }
      res.json(data);
    })
    .catch(err => res.json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  addFriend({ params }, res) {
    User.findByIdAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } }
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  deleteFriend({ params }, res) {
    User.findByIdAndDelete(
      { _id: params.id },
      { $pull: { friends: params.friendId } }
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
}

module.exports = userController