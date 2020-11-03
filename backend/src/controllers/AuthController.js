const uuid = require("uuid").v4;
const jwt = require("jsonwebtoken");

const UserRepository = require("../repositories/UserRepository");
const { refreshTokenCookieOptions } = require("../config/cookie");

async function handle(request, response) {
  const { email, password } = request.body;

  // Default validations
  if (!email || !password) {
    return response.status(400).json({ message: "Invalid email or password." });
  }

  const user = UserRepository.findByEmail(email);

  if (!user) {
    return response.status(400).json({ message: "Invalid email or password." });
  }

  // You should use a cryptography strategy here
  if (password !== user.password) {
    return response.status(400).json({ message: "Invalid email or password." });
  }

  const refresh_token = uuid();

  UserRepository.updateRefreshToken(user.id, refresh_token);

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
    refresh_token,
    refreshTokenCookieOptions
  );

  return response.status(200).json({
    token
  });
}

module.exports = { handle };
