import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setJWT, setRefreshingSession } from "../store/ducks/auth";
import api from "../services/api";

export const useIsLoggedIn = () => {
  const { token, isRefreshingSession } = useSelector(({ auth }) => auth);

  return !!token || isRefreshingSession;
};

export const useRefreshSession = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      return;
    }

    const refreshToken = async () => {
      try {
        setLoading(true);
        dispatch(setRefreshingSession(true));

        const { data } = await api.get("refreshToken");
        dispatch(setJWT(data.token));
        dispatch(setRefreshingSession(false));

        setLoading(false);
      } catch (err) {
        setLoading(false);
        dispatch(setRefreshingSession(false));
      }
    };

    refreshToken();
  }, [token, dispatch]);

  return { loading };
};
