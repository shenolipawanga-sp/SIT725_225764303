# SIT725 Task 6.2C - Testing Calculator API

Modified the 2.2P calculator API with an automated test suite using Mocha and Chai.

## Endpoints

| Method | Endpoint    | Query params       | Description                     |
|--------|-------------|--------------------|------------------------------- -|
| GET    | /add        | num1, num2         | Returns the sum of two numbers  |
| GET    | /subtract   | num1, num2         | Returns num1 - num2             |
| GET    | /multiply   | num1, num2         | Returns num1 * num2             |
| GET    | /divide     | num1, num2         | Returns num1 / num2             |

## Dependencies

- express
- mocha, chai (v4), chai-http (dev only)