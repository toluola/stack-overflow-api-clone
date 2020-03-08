export const baseURL = {
  tags: ["baseURl"],
  description: "The base URL",
  operationId: "getQuestions",
  responses: {
    "200": {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                description: "Base URL",
                example: "Welcome to the base URL"
              }
            }
          }
        }
      }
    }
  }
};

export const askQuestions = {
  tags: ["/questions"],
  description: "An authenticated user will be able to ask questions",
  operationId: "questions",
  security: [
    {
      bearerAuth: []
    }
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            body: {
              type: "string",
              description: "body of the question",
              example: "Hello"
            },
            title: {
              type: "string",
              description: "title of the question",
              example: "hello title"
            }
          }
        }
      }
    },
    required: true
  },
  responses: {
    "200": {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "request status",
                example: "sucess"
              },
              message: {
                type: "string",
                description: "request message",
                example: "Question created successfully"
              },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      description: "id of the question",
                      example: "1234"
                    },
                    body: {
                      type: "string",
                      description: "body of the question",
                      example: "hello"
                    },
                    title: {
                      type: "string",
                      description: "title of the question",
                      example: "title"
                    },
                    userId: {
                      type: "string",
                      description: "id of the user asking of the question",
                      example: "1234"
                    },
                    createdAt: {
                      type: "string",
                      description: "date of creating the question",
                      example: "10-12-2019"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "400": {
      description: "Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "shows an error status",
                example: "error"
              },
              message: {
                type: "array",
                description: "shows an array of errors",
                items: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      description: "shows the error messages",
                      example: "An error occur"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const viewSingleQuestion = {
  tags: ["/questions"],
  description: "Get a single question",
  operationId: "user",
  parameters: [
    {
      name: "questionId",
      in: "path",
      schema: {
        type: "string"
      },
      required: true
    }
  ],
  responses: {
    "200": {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "request status",
                example: "sucess"
              },
              message: {
                type: "string",
                description: "request messgae",
                example: "Question fetched successfully"
              },
              data: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "id of the question",
                    example: "1234"
                  },
                  body: {
                    type: "string",
                    description: "body of the question",
                    example: "hello"
                  },
                  title: {
                    type: "string",
                    description: "title of the question",
                    example: "title"
                  },
                  userId: {
                    type: "string",
                    description: "id of the user asking of the question",
                    example: "1234"
                  },
                  upvoteCount: {
                    type: "integer",
                    description: "count of total upvote",
                    example: 1
                  },
                  downvoteCount: {
                    type: "integer",
                    description: "count of total downvote",
                    example: 2
                  },
                  createdAt: {
                    type: "string",
                    description: "date of creating the question",
                    example: "10-12-2019"
                  },
                  answers: {
                    type: "array",
                    description: "answers to the question",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          description: "id of the answer",
                          example: "1234"
                        },
                        body: {
                          type: "string",
                          description: "body of the answer",
                          example: "hello"
                        },
                        questionId: {
                          type: "string",
                          description: "id of the question answered",
                          example: "1234"
                        },
                        userId: {
                          type: "string",
                          description:
                            "id of the user that answers the question",
                          example: "1234"
                        },
                        createdAt: {
                          type: "string",
                          description: "date the question is answered",
                          example: "10-12-2019"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "404": {
      description: "Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "shows an error status",
                example: "error"
              },
              message: {
                type: "array",
                description: "shows an array of errors",
                items: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      description: "shows the error messages",
                      example: "An error occur"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const search = {
  tags: ["/search"],
  description:
    "users will be able to search questions, answers and users NB: YOU CAN ONLY SEND ONE QUERY PARAMS AT A TIME",
  operationId: "search",
  parameters: [
    {
      name: "question",
      in: "query",
      schema: {
        type: "string"
      },
      required: false
    },
    {
      name: "answer",
      in: "query",
      schema: {
        type: "string"
      },
      required: false
    },
    {
      name: "name",
      in: "query",
      schema: {
        type: "string"
      },
      required: false
    }
  ],
  responses: {
    "200": {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "The status of the search query",
                example: "success"
              },
              message: {
                type: "string",
                description: "The message of the search query",
                example: "search successful"
              },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      description: "id of the question",
                      example: "1234"
                    },
                    body: {
                      type: "string",
                      description: "body of the question",
                      example: "hello"
                    },
                    title: {
                      type: "string",
                      description: "title of the question",
                      example: "title"
                    },
                    userId: {
                      type: "string",
                      description: "id of the user asking of the question",
                      example: "1234"
                    },
                    upvoteCount: {
                      type: "integer",
                      description: "count of total upvote",
                      example: 1
                    },
                    downvoteCount: {
                      type: "integer",
                      description: "count of total downvote",
                      example: 2
                    },
                    createdAt: {
                      type: "string",
                      description: "date of creating the question",
                      example: "10-12-2019"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "404": {
      description: "Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "shows an error status",
                example: "error"
              },
              message: {
                type: "array",
                description: "shows an array of errors",
                items: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      description: "shows the error messages",
                      example: "An error occur"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const answerQuestion = {
  tags: ["/answer"],
  description: "Authenticated user will be able to answer any question",
  operationId: "answer",
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: "questionId",
      in: "path",
      schema: {
        type: "string"
      },
      required: true
    }
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            body: {
              type: "string",
              description: "body of the answer",
              example: "Hello"
            }
          }
        }
      }
    },
    required: true
  },
  responses: {
    "200": {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "The status of the answer",
                example: "success"
              },
              message: {
                type: "string",
                description: "The message of the answer",
                example: "answer successfully created"
              },
              data: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "id of the question",
                    example: "1234"
                  },
                  body: {
                    type: "string",
                    description: "body of the question",
                    example: "hello"
                  },
                  userId: {
                    type: "string",
                    description: "id of the user asking of the question",
                    example: "1234"
                  },
                  questionId: {
                    type: "string",
                    description: "id of the question being answered",
                    example: "1234"
                  },
                  createdAt: {
                    type: "string",
                    description: "date of creating the question",
                    example: "10-12-2019"
                  }
                }
              }
            }
          }
        }
      }
    },
    "400": {
      description: "Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "shows an error status",
                example: "error"
              },
              message: {
                type: "array",
                description: "shows an array of errors",
                items: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      description: "shows the error messages",
                      example: "An error occur"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const voteQuestions = {
  tags: ["/questions"],
  description:
    "Authenticated users will be able to vote a question, send the request multiple time to toggle between voting and removing the vote",
  operationId: "question",
  security: [
    {
      bearerAuth: []
    }
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            voteType: {
              type: "string",
              description: "indicate 'up' to upvote and 'down' to downvote",
              example: "up or down"
            }
          }
        }
      }
    },
    required: true
  },
  parameters: [
    {
      name: "questionId",
      in: "path",
      schema: {
        type: "string"
      },
      required: true
    }
  ],
  responses: {
    "200": {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "shows the status of the request",
                example: "success"
              },
              message: {
                type: "string",
                description: "shows the vote message",
                example: "You have successfully voted on this question"
              }
            }
          }
        }
      }
    },
    "500": {
      description: "Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "shows an error status",
                example: "error"
              },
              message: {
                type: "array",
                description: "shows an array of errors",
                items: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      description: "shows the error messages",
                      example: "An error occur"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const getQuestions = {
  tags: ["/questions"],
  description: "Returns all questions",
  operationId: "getQuestions",
  responses: {
    "200": {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "request status",
                example: "sucess"
              },
              message: {
                type: "string",
                description: "request messgae",
                example: "Question fetched successfully"
              },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      description: "id of the question",
                      example: "1234"
                    },
                    body: {
                      type: "string",
                      description: "body of the question",
                      example: "hello"
                    },
                    title: {
                      type: "string",
                      description: "title of the question",
                      example: "title"
                    },
                    userId: {
                      type: "string",
                      description: "id of the user asking of the question",
                      example: "1234"
                    },
                    upvoteCount: {
                      type: "integer",
                      description: "count of total upvote",
                      example: 1
                    },
                    downvoteCount: {
                      type: "integer",
                      description: "count of total downvote",
                      example: 2
                    },
                    createdAt: {
                      type: "string",
                      description: "date of creating the question",
                      example: "10-12-2019"
                    },
                    answers: {
                      type: "array",
                      description: "answers to the question",
                      items: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            description: "id of the answer",
                            example: "1234"
                          },
                          body: {
                            type: "string",
                            description: "body of the answer",
                            example: "hello"
                          },
                          questionId: {
                            type: "string",
                            description: "id of the question answered",
                            example: "1234"
                          },
                          userId: {
                            type: "string",
                            description:
                              "id of the user that answers the question",
                            example: "1234"
                          },
                          createdAt: {
                            type: "string",
                            description: "date the question is answered",
                            example: "10-12-2019"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "404": {
      description: "Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "shows an error status",
                example: "error"
              },
              message: {
                type: "array",
                description: "shows an array of errors",
                items: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      description: "shows the error messages",
                      example: "An error occur"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const loginUser = {
  tags: ["/auth/login"],
  description: "Logs in user into the application",
  operationId: "user",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "email of the user",
              example: "toluola7@gmail.com"
            },
            password: {
              type: "string",
              description: "password of the user",
              example: "test123"
            }
          }
        }
      }
    },
    required: true
  },
  responses: {
    "200": {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "request status",
                example: "sucess"
              },
              message: {
                type: "string",
                description: "request messgae",
                example: "User signin successfullyy"
              },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    token: {
                      token: "string",
                      description: "token of the log in user",
                      example: "jwhgfi3fhebvneklkvekrjkenfkvnekvenv"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "404": {
      description: "Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "shows an error status",
                example: "error"
              },
              message: {
                type: "array",
                description: "shows an array of errors",
                items: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      description: "shows the error messages",
                      example: "An error occur"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const signupUser = {
  tags: ["/auth/signup"],
  description: "New user will be able to signup in the application",
  operationId: "user",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "email of the user",
              example: "toluola8@gmail.com"
            },
            password: {
              type: "string",
              description: "password of the user",
              example: "test123"
            },
            name: {
              type: "string",
              description: "name of the signup user",
              example: "tolulope"
            },
            subscribed: {
              type: "boolean",
              description: "subscribe to notifications or not",
              example: true
            }
          }
        }
      }
    },
    required: true
  },
  responses: {
    "200": {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "request status",
                example: "sucess"
              },
              message: {
                type: "string",
                description: "request messgae",
                example: "User signup successfully"
              },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    token: {
                      token: "string",
                      description: "token of the log in user",
                      example: "jwhgfi3fhebvneklkvekrjkenfkvnekvenv"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "404": {
      description: "Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                description: "shows an error status",
                example: "error"
              },
              message: {
                type: "array",
                description: "shows an array of errors",
                items: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      description: "shows the error messages",
                      example: "An error occur"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
