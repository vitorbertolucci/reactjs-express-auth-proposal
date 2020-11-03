const { response } = require("express");

const users = [
  {
    id: 1,
    name: "Jane Doe",
    email: "janedoe@me.com",
    password: "123456",
    refresh_token: null
  }
];

function findByEmail(email) {
  const user = users.find(user => user.email === email);
  return user;
}

function updateRefreshToken(id, refresh_token) {
  const user = users.find(user => user.id === id);
  if (!users) {
    return;
  }

  user.refresh_token = refresh_token;
}

function findByRefreshToken(refresh_token) {
  const user = users.find(user => user.refresh_token === refresh_token);
  return user;
}

module.exports = { findByEmail, findByRefreshToken, updateRefreshToken };
