const uuid = require("uuid").v4;
const jwt = require("jsonwebtoken");

const UserRepository = require("../repositories/UserRepository");
const { refreshTokenCookieOptions } = require("../config/cookie");

async function handle(request, response) {
  const refresh_token = request.cookies["__HOST-refresh_token"];

  if (!refresh_token) {
    return response.status(401).json({ message: "Access denied." });
  }

  const user = UserRepository.findByRefreshToken(refresh_token);

  if (!user) {
    return response.status(401).json({ message: "Access denied." });
  }

  const new_refresh_token = uuid();

  UserRepository.updateRefreshToken(user.id, new_refresh_token);

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email
    },
    "mySecretKey",
    {
      expiresIn: "1h"
    }
  );

  response.cookie(
    "__HOST-refresh_token",
    new_refresh_token,
    refreshTokenCookieOptions
  );

  return response.status(200).json({
    token
  });
}

module.exports = { handle };
