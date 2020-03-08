import {
  getQuestions,
  loginUser,
  signupUser,
  baseURL,
  search,
  askQuestions,
  viewSingleQuestion,
  answerQuestion,
  voteQuestions
} from "./swaggerEndpoints";

export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Stack-Overflow-Clone APIs Document",
    description:
      "Welcome to stack overflow API's clone documentation. Feel free to explore",
    contact: {
      name: "Tolu' Olaniyan",
      email: "toluola7@gmail.com",
      url: "https://github.com/toluola/stack-overflow-api-clone"
    }
  },
  servers: [
    {
      url: "https://stack-overflow-clone-api.herokuapp.com/api/v1",
      description: "UAT Env"
    },
    {
      url: "http://localhost:3000/api/v1",
      description: "DEV Env"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {
    "/": {
      get: baseURL
    },
    "/auth/signup": {
      post: signupUser
    },
    "/auth/login": {
      post: loginUser
    },
    "/questions": {
      get: getQuestions
    },
    "/question": {
      post: askQuestions
    },
    "/questions/{questionId}": {
      get: viewSingleQuestion
    },
    "/questions/{questionId}/answer": {
      post: answerQuestion
    },
    "/questions/{questionId}/vote": {
      post: voteQuestions
    },
    "/search": {
      get: search
    }
  }
};
