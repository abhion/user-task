const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const emailValidator = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const signJwt = require('jsonwebtoken/sign');
const path = require('path');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return emailValidator(value)
            },
            message: function () {
                return "Invalid Email"
            }
        }
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    const user = this;
    if (user.isNew) {
        bcrypt.genSalt(10)
            .then(salt => {
                bcrypt.hash(user.password, salt)
                    .then(hashedPassword => { user.password = hashedPassword; next(); })
                    .catch(err => console.log(err));

            })
            .catch(err => console.log(err));
    }
    else {
        next();
    }

})

userSchema.virtual('name').get(function(){
    if(this.firstName){
        return this.firstName + ' ' + this.lastName;
    }
    
})
userSchema.set('toObject', {getters: true});
userSchema.set('toJSON', {getters: true});

userSchema.methods.verifyCredentials = function (enteredPassword) {
    const user = this;
    return bcrypt.compare(enteredPassword, user.password)
            .then(result => result)
            .catch(err => console.log(err))
}

userSchema.methods.generateToken = function () {
    const user = this;
    const tokenData = {
        name: user.firstName + ' ' + user.lastName,
        _id: user._id,
        email: user.email,
        iat: Date.now()
    }
    const token = signJwt(tokenData, fs.readFileSync(path.resolve(__dirname, '../security/private.pem'), 'utf-8'));
    return token;
}

const User = mongoose.model('User', userSchema);
module.exports = User;