import axios from "axios";
import { loginActions, signinActions } from "./actionTypes";

const url = "https://localhost:7213/api";

// Action creator for authenticating user
export const authenticateUser = (email, password) => async (dispatch) => {
  dispatch({ type: loginActions.AUTHENTICATE_USER_PENDING });

  try {
    const response = await axios.post(
      `${url}/User/find`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: loginActions.AUTHENTICATE_USER_FULFILLED, payload: response.data });
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user_data", response.data.id);
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    dispatch({ type: loginActions.AUTHENTICATE_USER_REJECTED, payload: error.response.data });
  }
};

// Action creator for signing in user
export const signinUser = (email, password, firstname, lastname) => async (dispatch) => {
  dispatch({ type: signinActions.SIGNIN_USER_PENDING });

  try {
    const response = await axios.post(
      `${url}/User`,
      { email, password, firstname, lastname },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: signinActions.SIGNIN_USER_FULFILLED, payload: response.data });
  } catch (error) {
    dispatch({ type: signinActions.SIGNIN_USER_REJECTED, payload: error.response.data });
  }
};

/// and all other actions/////
