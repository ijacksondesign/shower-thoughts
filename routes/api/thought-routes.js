const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// api/thoughts
router.route('/')
      .get(getAllThoughts)
      .post(createThought);

// api/thoughts/id
router.route('/:id')
      .get(getThoughtById)
      .put(updateThought)
      .delete(deleteThought);

// api/thought/:thoughtId/reactions  
router.route('/:thoughtId/reactions')
     .post(createReaction)
     .delete(removeReaction)

module.exports = router;