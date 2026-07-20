# SIT725 Task 2.2P - Express Web Server

Simple Express.js server to demonstrate REST API basics - static file serving and a small calculator API.

## Setup

1. Clone this repository:

2. Install dependencies:
   npm install
3. Start the server:
   node server.js
4. Open your browser to http://localhost:3000

## Endpoints

| Method | Endpoint    | Query params       | Description                     |
|--------|-------------|--------------------|------------------------------- -|
| GET    | /add        | num1, num2         | Returns the sum of two numbers  |
| GET    | /subtract   | num1, num2         | Returns num1 - num2             |
| GET    | /multiply   | num1, num2         | Returns num1 * num2             |
| GET    | /divide     | num1, num2         | Returns num1 / num2             |

## Example

GET http://localhost:3000/add?num1=5&num2=3
