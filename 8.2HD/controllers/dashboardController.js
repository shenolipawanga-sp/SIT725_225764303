const Subject = require('../models/Subject');

exports.show = async (req, res, next) => {
  try {
    const subjects = await Subject.find({ ownerId: req.user.id }).sort({ code: 1 });
    const totalHours = subjects.reduce((sum, s) => sum + s.weeklyHours, 0);

    res.render('dashboard', {
      user: req.user,
      subjectCount: subjects.length,
      totalHours,
      subjects,
    });
  } catch (err) {
    next(err);
  }
};