const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // get thought by ID
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({message: 'No thought with that ID.'});
                    return;
                }
                res.json(dbThought)
            })    
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create thought 
    createThought({body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: params.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                );
            })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({message: 'No user with that ID.'});
                    return;
                }
                res.json(dbThought)
            })    
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // update thought by ID
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(dbThought => {
            if (!dbThought) {
                res.status(404).json({message: 'No thought with that ID.'});
                return;
            }
            res.json(dbThought)
        })    
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete thought by ID
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({message: 'No thought with that ID.'});
                    return;
                }
                res.json(dbThought)
            })    
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create a thought reaction
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThought => {
            if (!dbThought) {
                res.status(404).json({message: 'No thought with that ID.'});
                return;
            }
            res.json(dbThought)
        })    
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete and remove a reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: {reactionId: params.reactionId}} },
            { new: true }
        )
        .then(dbThought => res.json(dbThought))
        .catch(err => res.json(err));
    }

}

module.exports = thoughtController;