const { User }      = require('../models');
const authService   = require('../services/auth.service');
const { to, ReE, ReS,isNull }  = require('../services/util.service');


const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;    

    if (!body.unique_key && !body.email) {
        return ReE(res, {message: 'Please enter an email to register.',status:400});
    } else if (!body.password) {
        return ReE(res, {message:'Please enter a password to register.',status:400});
    } else if (!body.username) {
        return ReE(res, {message:'Please enter a User name to register.',status:400});
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        console.log("user",user);

        if (err) return ReE(res, err, 422);
        return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() ,status:201});
    }
}
module.exports.create = create;


const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {user:user,status:201});
}
module.exports.get = get;

const login = async function(req, res){
    const body = req.body;
    let err, user;

    if (!body.unique_key && !body.email) {
        return ReE(res, {message: 'Please enter an email to register.', status:400});
    } else if (!body.password) {
        return ReE(res, {message: 'Please enter a password to register.',status:400});
    }else{

        [err, user] = await to(authService.authUser(req.body));

        if(err) return ReE(res, err, 422);
    
        return ReS(res, {user:user.toWeb(),token:user.getJWT(),status:201});
    }

}
module.exports.login = login;