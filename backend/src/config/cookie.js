const refreshTokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  maxAge: 3600 * 1000,
  secure: process.env.NODE_ENV === "production"
};

module.exports = {
  refreshTokenCookieOptions
};
