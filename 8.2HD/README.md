# Study Buddy AI

Study planning web application built for SIT725 (Applied Software Engineering).
This repository is my individual fork of the group project, containerised for
Task 8.2HD.

Stack: Node.js, Express, MongoDB with Mongoose, Passport (local strategy), EJS.

> **Please read [IMPLEMENTATION_NOTE.md](IMPLEMENTATION_NOTE.md) first.** The
> group repository was still a skeleton when I forked it, so the authentication
> and subject management features in this fork were written by me for this
> individual task. They are not the team's finished work and the group version
> is likely to differ.

---


### Prerequisites

- Docker Desktop
- Git.

### 1. Check Docker is up:


### 2. Clone the repository


### 3. Supply the configuration file

The application reads one value from a `.env` file that is not committed to this
repository (see **Configuration** below). Create it from the template:

```
Copy-Item .env.example .env
```

Then open `.env` and replace the placeholder with the real value. **The value for
`SESSION_SECRET` will share trough the feedback/chat section in my OnTrack for
Task 8.2HD.** Any non-empty string will also work if you would rather generate
your own.

You do not need to set `MONGO_URI`. The database runs as a second container and
its address is set in `docker-compose.yml`.

### 4. Build and start

```
docker compose up --build
```

The first build downloads the base images and installs dependencies, so it takes
a couple of minutes. Later starts are quick.

Wait until the log shows both of these lines:

```
studybuddy-app  | MongoDB connected successfully
studybuddy-app  | Server running on http://localhost:3000
```

If your Docker version only has the older standalone binary, use
`docker-compose up --build` instead.

### 5. Access the application

Open **http://localhost:3000** in a browser.

---

## The /api/student endpoint

```
http://localhost:3000/api/student
```

Returns:

```json
{
  "name": "YOUR FULL NAME HERE",
  "studentId": "225764303"
}
```

From PowerShell:

```
curl.exe http://localhost:3000/api/student
```

---

## Verifying that the database works


**Sign up and sign in**

1. Open http://localhost:3000. You are redirected to the sign-in page.
2. Click *Register*, enter any email and a password of at least 8 characters,
   and submit. The user document is written to MongoDB with the password hashed
   by bcrypt.
3. Sign in with those details. You land on the dashboard, which means the record
   was read back and the stored hash matched.


To look at the stored data directly, open a shell in the database container:

```
docker exec -it studybuddy-mongo mongosh
```

Then inside the Mongo shell:

```
use studybuddy
db.users.find().pretty()
db.subjects.find().pretty()
```

Data survives restarts. Stop the stack with `docker compose down`, start it
again, and the account you created is still there, because `/data/db` is on a
named Docker volume.

---


## Configuration

`SESSION_SECRET` signs the session cookies, so it is not committed. `.env` is
listed in `.gitignore` and only `.env.example` is in the repository as a
template.

- Where to get the value: feedback/chat section in my OnTrack for Task 8.2HD
- What to do with it: paste it into `.env` as described in step 3 above.

`MONGO_URI` is set in `docker-compose.yml` rather than in `.env`. It points at
the `mongo` service on the private network Compose creates, is unreachable from
outside the stack, and carries no credentials, so there is nothing sensitive to
protect.

No other configuration is required and no files need to be edited to run the
application.

---

## What is in the container setup

| File | Purpose |
| --- | --- |
| `Dockerfile` | Builds the Node application image on `node:20-bookworm-slim`, installs production dependencies with `npm ci`, runs as the non-root `node` user |
| `.dockerignore` | Keeps `node_modules`, `.env` and the git history out of the build context |
| `docker-compose.yml` | Runs the app and a `mongo:7` container together, with a named volume for the data and a healthcheck so the app waits for the database |
| `IMPLEMENTATION_NOTE.md` | Which parts of the application I wrote myself for this individual task, and why |
