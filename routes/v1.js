const express = require('express');
const router = express.Router();

const UserController   = require('./../controllers/user.controller');
const CardController = require('../controllers/card.controller');

const passport = require('passport');
const path = require('path');

const needsAuth = passport.authenticate('jwt', { session: false })

require('./../middleware/passport')(passport)

//Users api
router.post('/users',UserController.create);     
router.post('/users/login',UserController.login);                                               
router.get('/users', needsAuth, UserController.get);

router.post('/card',needsAuth, CardController.create);    
router.get('/cards',needsAuth, CardController.get);

module.exports = router;