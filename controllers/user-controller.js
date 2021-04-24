const { Thought, User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // get user by ID
    getUserById({params}, res) {
        User.findOne({_id: params.id})
            .select('-__v')
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({message: 'No user with that ID.'});
                    return;
                }
                res.json(dbUser)
            })    
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create user 
    createUser({body}, res) {
        User.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err))
    },

    // update user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({message: 'No user with that ID.'});
                return;
            }
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUser => {
                if (!dbUser) {
                    return res.status(404).json({message: 'No user found with this id!'});
                }
                return Thought.deleteMany({ username: dbUser.username}, {new: true} );
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err));
    },

    // add a friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({message: 'No user with that ID.'});
                return;
            }
            res.json(dbUser)
        })    
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err));
    }
};

module.exports = userController;