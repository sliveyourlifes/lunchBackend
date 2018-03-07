
const isLoggedIn = (req, res, next)=> {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/not-authenticated');
  }

module.exports = isLoggedIn
