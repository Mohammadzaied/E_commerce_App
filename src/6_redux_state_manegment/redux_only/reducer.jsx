import { loginActions, signinActions } from "./actionTypes";

const initialState = {
  login: {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    user_data: localStorage.getItem("user_data") || null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  signin: {
    message: "",
    status: "idle",
    error: null,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginActions.AUTHENTICATE_USER_PENDING:
      return {
        ...state,
        login: {
          ...state.login,
          status: "loading",
        },
      };
    case loginActions.AUTHENTICATE_USER_FULFILLED:
      return {
        ...state,
        login: {
          ...state.login,
          status: "succeeded",
          isAuthenticated: true,
          user_data: action.payload.id,
          token: action.payload.token,
        },
      };
    case loginActions.AUTHENTICATE_USER_REJECTED:
      return {
        ...state,
        login: {
          ...state.login,
          status: "failed",
          error: action.payload,
        },
      };

    case signinActions.SIGNIN_USER_PENDING:
      return {
        ...state,
        signin: {
          ...state.signin,
          status: "loading",
        },
      };
    case signinActions.SIGNIN_USER_FULFILLED:
      return {
        ...state,
        signin: {
          ...state.signin,
          status: "succeeded",
          message: action.payload.message,
        },
      };
    case signinActions.SIGNIN_USER_REJECTED:
      return {
        ...state,
        signin: {
          ...state.signin,
          status: "failed",
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
