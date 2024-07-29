# CinemasWebBack

## Project Description

CINEMASWEB is a web-based cinema management project that allows for managing movies, ticket prices, promotions, screening schedules, and various other cinema-related information.

## Technologies Used

- Node.js
- Express
- Sequelize
- Joi
- TypeScript

## System Requirements

- Node.js v20.15.0
- SQL (MySQL)

## Installation Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/LeeVanNgoc/CinemasWebBack.git
    cd CINEMASWEB
    ```

2. Install the dependencies:

    ```bash
    npm install express
    npm install typescript ts-node @types/node @types/express --save-dev
    npm i -g @types/mysql ts-node typescript nodemon mysql2
    npm install dotenv @types/dotenv --save-dev
    npm install --save sequelize
    npm install sequelize-cli mysql2
    ```

3. Configure the database in the `.env` file:

    ```plaintext
    PORT=
    NODE_ENV=
    URLREACT=
    ```

4. Run migrations to set up the database:

    ```bash
    npx sequelize-cli db:migrate
    ```

5. Run the project:

    ```bash
    npm start
    ```

## Usage

Below are some main API endpoints along with examples of requests and responses:

### Genre Routes

- Create a new genre:

    ```
    POST /api/genres/create-new-genre
    ```

- Delete a genre:

    ```
    DELETE /api/genres/delete-genre/:id
    ```

- Edit a genre:

    ```
    PUT /api/genres/edit-genre/:id
    ```

- Get all genres:

    ```
    GET /api/genres/get-all-genres
    ```

- Get genre by ID:

    ```
    GET /api/genres/get-genre-by-id/:id
    ```

### Movie Routes

- Create a new movie:

    ```
    POST /api/movies/create-new-movie
    ```

- Delete a movie:

    ```
    DELETE /api/movies/delete-movie/:movieid
    ```

- Edit a movie:

    ```
    PUT /api/movies/edit-movie/:movieid
    ```

- Get all movies:

    ```
    GET /api/movies/get-all-movies
    ```

- Get movie by ID:

    ```
    GET /api/movies/get-movie-by-id/:movieid
    ```
### Movie Genre Routes

- Create a new movie genre:

    ```
    POST /api/movies/create-new-movie-genre
    ```

- Delete a movie genre:

    ```
    DELETE /api/movies/delete-movie-genre/:movieGenreId
    ```

- Get all movies genre:

    ```
    GET /api/movies/get-all-movies-genres
    ```

- Get movie genre by ID:

    ```
    GET /api/movies/get-movie-genre-by-id/:movieGenreId
    ```


### News Routes

- Create a new news article:

    ```
    POST /api/news/create-new-news
    ```

- Delete a news article:

    ```
    DELETE /api/news/delete-news/:id
    ```

- Edit a news article:

    ```
    PUT /api/news/edit-news/:id
    ```

- Get all news articles:

    ```
    GET /api/news/get-all-news
    ```

- Get news article by ID:

    ```
    GET /api/news/get-news-by-id/:id
    ```
### Plan Screen Movie Routes

- Create a new PSM:

    ```
    POST /api/news/create-new-plan-screen-movie
    ```

- Delete a PSM:

    ```
    DELETE /api/news/delete-plan-screen-movie/:planScreenMovieId
    ```

- Edit a PSM:

    ```
    PUT /api/news/edit-plan-screen-movie/:planScreenMovieId
    ```

- Get all PSM:

    ```
    GET /api/news/get-all-plan-screen-movies
    ```

- Get PSM by ID:

    ```
    GET /api/news/get-plan-screen-movie-by-id/:planScreenMovieId
    ```

### Price Routes

- Create a new price:

    ```
    POST /api/prices/create-price
    ```

- Delete a price:

    ```
    DELETE /api/prices/delete-price
    ```

- Edit a price:

    ```
    PUT /api/prices/edit-price
    ```

- Get price by ID:

    ```
    GET /api/prices/get-price-by-id
    ```

- Get all prices:

    ```
    GET /api/prices/get-all-prices
    ```

### Promotion Routes

- Create a new promotion:

    ```
    POST /api/promotions/create-new-promotion
    ```

- Delete a promotion:

    ```
    DELETE /api/promotions/delete-promotion/:promoId
    ```

- Edit a promotion:

    ```
    PUT /api/promotions/edit-promotion/:promoId
    ```

- Get all promotions:

    ```
    GET /api/promotions/get-all-promotions
    ```

- Get promotion by ID:

    ```
    GET /api/promotions/get-promotion-by-id/:promoId
    ```
### Room Routes

- Create a new room:

    ```
    POST /api/promotions/create-new-room
    ```

- Delete a room:

    ```
    DELETE /api/promotions/delete-room/:roomId
    ```

- Edit a room:

    ```
    PUT /api/promotions/edit-room/:roomId
    ```

- Get all room:

    ```
    GET /api/promotions/get-all-rooms
    ```

- Get room by ID:

    ```
    GET /api/promotions/get-room-by-id/:roomId
    ```

### Seat Routes

- Create a new seat:

    ```
    POST /api/seats/create-seat
    ```

- Delete a seat:

    ```
    DELETE /api/seats/delete-seat
    ```

- Edit a seat:

    ```
    PUT /api/seats/edit-seat
    ```

- Get all seats:

    ```
    GET /api/seats/get-seats
    ```

- Get seat by ID:

    ```
    GET /api/seats/get-seat-by-id
    ```

### Seat Ticket Routes

- Create a new seat ticket:

    ```
    POST /api/seattickets/create-seat-ticket
    ```

- Delete a seat ticket:

    ```
    DELETE /api/seattickets/delete-seats-ticket
    ```

- Edit a seat ticket:

    ```
    PUT /api/seattickets/edit-seat-ticket
    ```

- Get all seat tickets:

    ```
    GET /api/seattickets/get-all-seat-ticket
    ```

- Get seat ticket by ID:

    ```
    GET /api/seattickets/get-seats-ticket-by-id
    ```

### Theater Routes

- Create a new theater:

    ```
    POST /api/theater/create-theater
    ```

- Delete a theater:

    ```
    DELETE /api/theater/delete-theater
    ```

- Edit a theater:

    ```
    PUT /api/theater/edit-theater
    ```

- Get all theaters:

    ```
    GET /api/theater/get-theaters
    ```

- Get theater by ID:

    ```
    GET /api/theater/get-theaters-by-id
    ```

- Get theaters by city:

    ```
    GET /api/theater/get-theaters-by-city
    ```

### Ticket Routes

- Create a new ticket:

    ```
    POST /api/ticket/create-ticket
    ```

- Delete a ticket:

    ```
    DELETE /api/ticket/delete-ticket
    ```

- Edit a ticket:

    ```
    PUT /api/ticket/edit-ticket
    ```

- Get all tickets:

    ```
    GET /api/ticket/get-tickets
    ```

- Get list of tickets:

    ```
    GET /api/ticket/get-list-tickets
    ```

### Trailer Routes

- Create a new trailer:

    ```
    POST /api/trailer/create-trailer
    ```

- Delete a trailer:

    ```
    DELETE /api/trailer/delete-trailer
    ```

- Edit a trailer:

    ```
    PUT /api/trailer/edit-trailer
    ```

- Get all trailers:

    ```
    GET /api/trailer/get-all-trailers
    ```

- Get trailer by ID:

    ```
    GET /api/trailer/get-trailer-by-id
    ```

- Get trailer by movie ID:

    ```
    GET /api/trailer/get-trailer-by-movie-id
    ```

### User Routes

- Create a new user:

    ```
    POST /api/user/create-new-user
    ```

- Delete a user:

    ```
    DELETE /api/user/delete-user
    ```

- Edit a user:

    ```
    PUT /api/user/edit-user
    ```

- Get user by ID:

    ```
    GET /api/user/get-user-by-id
    ```

- Get all users:

    ```
    GET /api/user/get-all-users
    ```

- User login:

    ```
    POST /api/user/login-user
    ```
## To understand more about our API, read API.doc
