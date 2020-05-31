const User = require('../models/user');
const auditController = require('../controllers/auditController');

module.exports = {
    createUser: (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        const user = new User({ firstName, lastName, email, password });
        user.save()
            .then(({ name, email, _id }) => {
                auditController.createAudit({action: 'CREATE', actionBy: _id})
                res.json({ name, email, _id })
            })
            .catch(err => {
                console.log(err);
                if(err.code == 11000){
                    res.json({errMessage: 'User with entered email already exists'})
                }
                else{
                    res.json({errMessage: err})
                }
            });
    },
    updateUser: (req, res) => {
        const { id:_id } = req.params;
        const { firstName, lastName } = req.body;
        User.findOneAndUpdate({ _id }, { firstName, lastName }, { returnNewDocument: true}).select('firstName lastName email')
            .then(user => {
                auditController.createAudit({ action: 'UPDATE', actionBy: req.user._id });
                user ? res.json({ name: user.name, email: user.email }) : user;
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            });
    },
    deleteUser: (req, res) => {
        const { id:_id } = req.params;
        User.findOneAndDelete({ _id }).select('name email')
            .then(user => {
                auditController.createAudit({ action: 'DELETE', actionBy: req.user._id });
                user ? res.json(user) : user;
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            });
    },
    getUser: (req, res) => {
        console.log(req.user);
        const {_id, name, email} = req.user;
        res.json({_id, name, email})
    },
    getUsers: (req, res) => {
        User.find({}, 'firstName lastName email')
            .then(users => res.json(users))
            .catch(err => {
                console.log(err);
                res.json(err)
            });
    },
    login: (req, res) => {
        const { email, password: enteredPassword } = req.body;
        User.findOne({ email })
            .then(user => {
                if (user) {
                    user.verifyCredentials(enteredPassword)
                        .then(result => {
                            if (result) {
                                auditController.createAudit({action: 'LOGIN', actionBy: user._id})
                                const token = user.generateToken();
                                res.header("Access-Control-Expose-Headers", 'x-auth');
                                res.setHeader('x-auth', token)
                                res.json({ name: user.name, email: user.email, _id: user._id })
                            }
                            else {
                                res.json({ errMessage: 'Invalid password' })
                            }
                        })
                }
                else {
                    res.json({ errMessage: 'No user with entered email' });
                }
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            });
    }
}