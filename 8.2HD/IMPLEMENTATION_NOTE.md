# Note on the state of this fork

This repository is my personal fork of the Study Buddy AI group project, created
for SIT725 Task 8.2HD. That task is an individual deliverable, and it requires
that the containerised application demonstrably works end to end, including its
database-backed features.

At the point I forked the group repository (commit `418bbd4`, 7 September 2026),
the shared repo held the project skeleton rather than a running application. The
directory structure, `server.js`, `config/db.js`, `config/passport.js` and
`models/User.js` were in place, but the route files, controllers, views, the
`Subject`, `Task` and `StudyPlan` models and the scheduling service were all
still empty placeholder files. Nothing in the application read from or wrote to
MongoDB, so there was no database functionality to containerise or to
demonstrate.

To be able to complete the Docker task I implemented a minimal working slice of
the application myself, in this fork only:

| Area | What I added |
| --- | --- |
| `models/Subject.js` | Subject schema with a compound unique index on owner and unit code |
| `controllers/authController.js` | Registration with bcrypt hashing, sign in via Passport, sign out |
| `controllers/subjectController.js` | List, create and delete subjects, scoped to the signed-in user |
| `controllers/dashboardController.js` | Summary counts read back from the database |
| `routes/auth.js`, `routes/dashboard.js`, `routes/subjects.js` | Route definitions wiring the above |
| `middleware/ensureAuth.js` | Guard that redirects anonymous requests to the sign-in page |
| `views/` | EJS pages for register, sign in, dashboard and subjects, using Materialize CSS |
| `server.js` | Mounts the route modules and exposes the current user to all views |
| `routes/student.js` | The `/api/student` identity endpoint required by Task 8.2HD |

Everything above follows the route to controller to model structure the team
agreed on, and reuses the `User` model and Passport configuration exactly as they
were already written in the group repository. I did not change either of those.

**These implementations are mine, written for this individual task. They are not
the team's finished work.** The group is still building out its own versions of
the authentication flow, the subject management pages and the AI scheduling
engine, and those are likely to differ from what is in this fork. Anything the
team ships later takes precedence over the code here. This fork exists to
demonstrate a fully working containerised deployment, not to represent the final
group product.

The scheduling engine, the `Task` and `StudyPlan` models, the admin area and the
test suite have been left as they were in the group repository, since they are
not needed to demonstrate that the container runs end to end with a working
database connection.