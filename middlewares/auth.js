const verifyUser = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.render('login', {message: 'necesitas logearte para acceder'});
    }
}

const verifyAdmin = (req, res, next) => {
    if(req.session.admin == 1){
        next();
    }
    else{
        res.render('unauthorized');
    }
}

module.exports = {verifyUser, verifyAdmin}