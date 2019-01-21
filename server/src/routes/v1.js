const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const expenseController = require('../controllers/expense');
const passport = require('passport');

// Register
router.post('/register' , userController.register);
router.post('/auth' , userController.login);

// Customize and protect the routes
router.all('*' , (req,res,next) => {
    passport.authenticate('jwt' , {session: false} , (err , user) => {
        if (err || !user) {
            const error = new Error('You are not authorized to access this area');
            error.status = 401;
            throw error;
        }
        req.user = user;
        return next();
    })(req,res,next);
})

// --------------------------- Protected Routes ----------------------------- //
router.get('/user' , userController.getUser);
router.post('/expense' , expenseController.create);
router.get('/expense/:month?' , expenseController.get);
router.delete('/expense/:id' , expenseController.delete);
router.put('/expense/:id' , expenseController.update);

module.exports = router;