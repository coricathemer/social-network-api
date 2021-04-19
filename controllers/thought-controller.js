const { Thought, User } = require('../models');

const thoughtController = {
  addThought({ params, body }, res){
    Thought.create(body)
      .then(({_id})=>{
        return User.findOneAndUpdate(
          {_id: params.userId }, 
          { $push: {thoughts: _id} }, 
          { new: true }
        );
      })
      .then(data => {
        console.log(data);
        if (!data) {
          res.status(404)({ message: 'No thought found with this id!'});
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  }, 

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } }, 
      { new: true, runValidators: true }
    )
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id!'});
        return;
      }
      res.json(data);
    })
    .catch(err => res.json(err));
  },

  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deleteThought => {
        if (!deleteThought) {
          return res.status(404).json({ message: 'No thought with this id!'});
        }
        return User.findOneAndUpdate(
          { _id: params.userId }, 
          { $pull: { thoughts: params.userId } }, 
          { new: true }
        );
      })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id '});
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },


  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, 
      { $pull: { reactions: {reactionId: params.reactionId } } }, 
      { new: true }
    )
    .then(data => res.json(data))
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;



/* addThought,
removeThought,
addReaction,
removeReaction */
