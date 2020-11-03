import React, { useState } from "react";
import { useDispatch } from "react-redux";

import api from "../services/api";
import { setJWT } from "../store/ducks/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const result = await api.post("login", {
        email,
        password
      });

      dispatch(setJWT(result.data.token));
    } catch (err) {}
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login</legend>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
