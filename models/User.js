const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
  {
    userName: {
      type: String, 
      required: true, 
      trim: true
    }, 
    email: {
      type: String, 
      required: true, 
      trim: true, 
      match: [/.+@.+\..+/]
    },
    friends: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'User'
      }
    ], 
    thoughts: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'Thought'
      }
    ] 
  }, 
  {
    toJSON: {
      virtuals: true, 
      getters: true
    }
  }
); 

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User; 
