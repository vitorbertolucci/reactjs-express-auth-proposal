import { setDefaultAuthHeader } from "../../services/api";

// Action Types
export const ActionTypes = {
  SET_TOKEN: "auth/SET_TOKEN",
  LOGOUT: "auth/LOGOUT",
  SET_REFRESHING_SESSION: "auth/SET_REFRESHING_SESSION"
};

// Reducer
const initialState = {
  token: null,
  isRefreshingSession: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_TOKEN: {
      return { ...state, ...action.payload };
    }
    case ActionTypes.LOGOUT: {
      return { ...state, token: null, isRefreshingSession: false };
    }
    case ActionTypes.SET_REFRESHING_SESSION: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}

// Action Creators
export function setJWT(token) {
  return {
    type: ActionTypes.SET_TOKEN,
    payload: {
      token
    }
  };
}

export function logout() {
  return {
    type: ActionTypes.LOGOUT,
    payload: {}
  };
}

export function setRefreshingSession(isRefreshingSession) {
  return {
    type: ActionTypes.SET_REFRESHING_SESSION,
    payload: { isRefreshingSession }
  };
}

// Middlewares
export const setTokenMiddleware = store => next => action => {
  if (action.type === ActionTypes.SET_TOKEN) {
    const { token } = action.payload;
    if (token) {
      setDefaultAuthHeader(token);
    }
  }

  return next(action);
};
