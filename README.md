# Backend Engineer Work Sample

This project skeleton contains a basic Express setup one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.

## Scripts 
`npm start` starts the server

`npm test` executes the tests

## Goal
1. Adjust POST /users that it accepts a user and stores it in a database.
    * The user should have a unique id, a name, a unique email address and a creation date
2. Adjust GET /users that it returns (all) users from the database.
   * This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.

Feel free to add or change this project as you like.


## Solution notes
1. Created a project structure to resemble clean architecture
    - Made the domain the center of the project
    - Domain does not depend on anything
2. Separated structure to api, app, data (infra), and domain
3. Added unit tests for api endpoints, app service, and data layer
    - Domain layer do not have a lot of logic as this is a simple CRUD application without complex busines rules (yet)
    