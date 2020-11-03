const { Router } = require("express");

const AuthController = require("./controllers/AuthController");
const RefreshTokenController = require("./controllers/RefreshTokenController");
const authMiddleware = require("./middlewares/auth");

const routes = Router();

routes.post("/login", (request, response) => {
  return AuthController.handle(request, response);
});

routes.get("/refreshToken", (request, response) => {
  return RefreshTokenController.handle(request, response);
});

routes.get("/users", authMiddleware, (request, response) => {
  return response.status(200).json({
    users: [
      {
        id: 1,
        name: "Jhon doe"
      },
      {
        id: 2,
        name: "Billy the kid"
      }
    ]
  });
});

module.exports = routes;
