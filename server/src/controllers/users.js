const User = require('../models/User');
const jwt = require('jsonwebtoken');
const userController = {};

// sign Up
userController.register = async (req,res,next) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        joined: req.body.joined
    });
    try {
        const user = await newUser.save();
        return res.send({user});
    } catch (err) {
        if (err.code === 11000 && err.name === 'MongoError') {
            var error = new Error(`Email address ${newUser.email} is already taken `);
            error.status = 500;
            next(error);
        } else {
            next(err);    
        }
    }
};

// signin
userController.login = async (req,res,next) => {
    //username , password in request
    const {email , password} = req.body;
    //check username and password are ok
    try {
        const user = await User.findOne({email});
        if (!user) {
            const error = new Error(`email ${email} was not found on our system`);
            error.status = 401;
            next(error);
        }
        user.isPasswordMatch(password , user.password , (err , matched) => {
            if(matched){
                //if credintial ok, then create JWT and return it
                //Secret
                //Expiration
                const secret = process.env.JWT_SECRET;
                const expire = process.env.JWT_EXPIRATION;

                const token = jwt.sign({_id: user._id} , secret, {expiresIn: expire});
                return res.send({token});
            }
            res.status(401).send({error: 'Invalid username/password combination'});
        });
    } catch (e) {
        next(e);
    }
    
};

userController.getUser = async (req,res,next) => {
    const { user } = req;
    res.send({user});
}

module.exports = userController;