const jwt = require("jsonwebtoken");

function authMiddleware(request, response, next) {
  const token = request.header("x-auth-token");
  if (!token) {
    return response.status(403).json({ message: "Access denied." });
  }

  try {
    const jwtPayload = jwt.verify(token, "mySecretKey");
    response.locals.user = jwtPayload;
    next();
  } catch (error) {
    return response.status(403).json({ message: "Access denied." });
  }
}

module.exports = authMiddleware;
