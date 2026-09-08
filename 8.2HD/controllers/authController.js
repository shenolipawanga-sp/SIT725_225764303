const bcrypt = require('bcrypt');
const passport = require('../config/passport');
const User = require('../models/User');

const SALT_ROUNDS = 10;

exports.showRegister = (req, res) => {
  res.render('auth/register', { error: req.query.error || null });
};

exports.register = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password) {
    return res.redirect('/auth/register?error=Email+and+password+are+required');
  }
  if (password.length < 8) {
    return res.redirect('/auth/register?error=Password+must+be+at+least+8+characters');
  }
  if (password !== confirmPassword) {
    return res.redirect('/auth/register?error=Passwords+do+not+match');
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.redirect('/auth/register?error=That+email+is+already+registered');
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ email, password: hash });

    return res.redirect('/auth/login?message=Account+created,+please+sign+in');
  } catch (err) {
    return next(err);
  }
};

exports.showLogin = (req, res) => {
  res.render('auth/login', {
    error: req.query.error || null,
    message: req.query.message || null,
  });
};

exports.login = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login?error=Incorrect+email+or+password',
});

exports.logout = (req, res, next) => {
  // Passport 0.6 onwards requires the callback form.
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return req.session.destroy(() => res.redirect('/auth/login'));
  });
};