## Database
This app uses MongoDB (via Mongoose) to store car data.

### Setup
1. Ensure MongoDB is installed and running locally
2. Run `npm install`
3. Run `node seed.js` once to populate the database
4. Run `node server.js` to start the app
5. Open `http://localhost:3000`

## API
- `GET /api/cars` - returns all cars from MongoDB as JSON
- `POST /api/cars` - adds a new car to the database
