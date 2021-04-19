const { User } = require('../models');

const userController = {
  getAllUsers(req, res){
    User.find()
      .select('-_v')
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  }, 

  getUserById({ params }, res){
    User.findOne({ _id: params.id })
      .select('-_v')
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
    Pizza.findOneAndDelete({ _id: params.id })
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  addFriend(req, res){
    
  }, 

  deleteFriend(req, res){

  }
}

module.exports = userController