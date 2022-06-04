const authorizeUser = (req, res, next) => {
    if (!!req.signedCookies.userId) {
        next();
    } else {
        res.redirect('/');
    }
}
const authorizeAdmin = (req, res, next) => {
    if (req.signedCookies.permission === 'admin') {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = {
    authorizeUser,
    authorizeAdmin
}