// Blocks anything that needs a signed-in user.
module.exports = function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/auth/login?error=Please+sign+in+first');
};