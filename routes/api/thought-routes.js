const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router
.route('/')
.get(getAllThoughts)
.post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .delete(removeThought);

router 
.route('/:thoughtId/reactions')
.put(addReaction)
// /api/comments/<userId>/<thoughtId>/<reactionId>
router
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);

module.exports = router;
