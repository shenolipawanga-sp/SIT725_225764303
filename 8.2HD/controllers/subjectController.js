const Subject = require('../models/Subject');

// Only these fields are read off the request body. Anything else the client
// sends is dropped rather than passed to the model.
function pickAllowedFields(body) {
  return {
    code: body.code,
    name: body.name,
    weeklyHours: body.weeklyHours,
    difficulty: body.difficulty,
  };
}

exports.list = async (req, res, next) => {
  try {
    const subjects = await Subject.find({ ownerId: req.user.id }).sort({ code: 1 });
    res.render('subjects', {
      subjects,
      user: req.user,
      error: req.query.error || null,
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const fields = pickAllowedFields(req.body);
    await Subject.create({ ...fields, ownerId: req.user.id });
    res.redirect('/subjects');
  } catch (err) {
    if (err.code === 11000) {
      return res.redirect('/subjects?error=You+have+already+added+that+subject+code');
    }
    if (err.name === 'ValidationError') {
      return res.redirect('/subjects?error=' + encodeURIComponent(err.message));
    }
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    // ownerId is part of the filter so one user cannot delete another's data.
    await Subject.deleteOne({ _id: req.params.id, ownerId: req.user.id });
    res.redirect('/subjects');
  } catch (err) {
    next(err);
  }
};