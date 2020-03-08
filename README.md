# stack-overflow-api-clone

Built with NodeJS and MongoDB

## Description

This project consist of several API's that enables users to ask questions get answers to their questions and vote and downvote on questions.

## Documentation Link

https://stack-overflow-clone-api.herokuapp.com/api-docs/

## Heroku Link

https://stack-overflow-clone-api.herokuapp.com/api/v1

## API Routes

| HTTP VERB | ENDPOINT                 | FUCTIONALITY                 |
| --------- | ------------------------ | ---------------------------- |
| GET       | /questions               | Get all questions entries    |
| GET       | /questions/:questionId   | Get specific question entry  |
| POST      | /question                | Create a new question entry  |
| POST      | /questions/questionId/answer | Answer to a specific question |
| POST      | /questions/questionId/vote   | Upvote or downvote a question |
| GET       | /search?searchQuery      | Search questions, answers, profiles|
| POST      | /auth/login              | Login into the application |
| POST      | /auth/signup             | Signup on the application     |

# Author

Tolu' Olaniyan [@toluola](http://github.com/toluola)
