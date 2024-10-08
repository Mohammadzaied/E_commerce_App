/* eslint-disable no-self-assign */
/* eslint-disable no-lone-blocks */
// @ts-ignore
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { json } from "react-router-dom";

const url = "https://localhost:7213/api";

const login = {
  isAuthenticated: localStorage.getItem("isAuthenticated") != null ? localStorage.getItem("isAuthenticated") : false,
  user_data: localStorage.getItem("user_data") != null ? localStorage.getItem("user_data") : null,
  token: localStorage.getItem("token") != null ? localStorage.getItem("token") : null, // or 'loading' | 'succeeded' | 'failed'
  status: "idle",
  error: null,
};
const signin = {
  massege: "",
  status: "idle", // or 'loading' | 'succeeded' | 'failed'
  error: null,
};

const add_pro = {
  status: "idle", // or 'loading' | 'succeeded' | 'failed'
  error: null,
};

const delete_pro = {
  status: "idle", // or 'loading' | 'succeeded' | 'failed'
  error: null,
};

const product_watch = {
  data: localStorage.getItem("product_watch_data") != null ? JSON.parse(localStorage.getItem("product_watch_data")) : [],
  status: localStorage.getItem("status_user_data") != null ? localStorage.getItem("status_user_data") : "idle", // or 'loading' | 'succeeded' | 'failed'
  error: null,
};

const product_by =
  localStorage.getItem("product_by_data") != null
    ? JSON.parse(localStorage.getItem("product_by_data"))
    : [
        {
          id_user_p: null,
          color_selected: null,
          size_selected: null,
          quantity: 1,
          products: [],
        },
      ];

// Define async thunk
export const authenticateUser = createAsyncThunk("user/authenticateUser", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${url}/User/find`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } // authentication successful
    // else {
    //   return response.data; // authentication failed
    // }
  } catch (error) {
    console.log(error.response.data);
    return thunkAPI.rejectWithValue(error.response.data); // handle error case
  }
});

// Define async thunk
export const SigninUser = createAsyncThunk("user/login", async ({ email, password, firstname, lastname }, thunkAPI) => {
  try {
    const res = await axios.post(
      `${url}/User`,
      {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      //console.log(res.data);
      return signin.massege;
    }
  } catch (error) {
    //console.log(error.response.data);
    //return error.response.data;
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Define async thunk
export const add_product_by = createAsyncThunk("user/add_p", async (object, { getState, thunkAPI }) => {
  try {
    const state = getState();
    const { token } = state.user.login;
    const res = await axios.post(`${url}/User_Product`, object, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Define async thunk
export const add_remove_product_watch = createAsyncThunk("user/add_remove_p_watch", async ({ id_product, user_id }, { getState, thunkAPI }) => {
  try {
    const state = getState();
    const { token } = state.user.login;
    const res = await axios.post(`${url}/User/add_remove_product_watch/${user_id}`, id_product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Define async thunk

export const update_quantity = createAsyncThunk("user/update_quantity", async (object, { getState, thunkAPI }) => {
  try {
    console.log(object);
    const state = getState();
    const { token } = state.user.login;
    const res = await axios.put(`${url}/User_Product`, object, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error.response.data);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
// Define async thunk
export const delete_product_by = createAsyncThunk("user/delete_p", async (object, { getState, thunkAPI }) => {
  try {
    const state = getState();
    const { token } = state.user.login;
    const res = await axios.delete(`${url}/User_Product`, {
      data: object,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const user_data = createAsyncThunk("user/user_data", async (id, { getState, thunkAPI }) => {
  try {
    const state = getState();
    const { token } = state.user.login;
    const res = await axios.get(`${url}/User/user_data/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    login,
    signin,
    add_pro,
    product_by,
    product_watch,
    delete_pro,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // authenticateUser
    {
      builder
        .addCase(authenticateUser.pending, (state) => {
          state.login.status = "loading";
        })
        .addCase(authenticateUser.fulfilled, (state, action) => {
          state.login.status = "succeeded";
          state.login.isAuthenticated = true;
          state.login.user_data = action.payload.id;
          state.login.token = action.payload.token;

          localStorage.setItem("isAuthenticated", state.login.isAuthenticated);
          localStorage.setItem("status", state.login.status);
          localStorage.setItem("user_data", state.login.user_data);
          localStorage.setItem("token", state.login.token);
          console.log(action.payload);
        })
        .addCase(authenticateUser.rejected, (state, action) => {
          state.login.status = "failed";
          state.login.isAuthenticated = false;
          state.login.error = action.payload;
          //console.log(action.payload);
        });
    }

    // get_user_data
    {
      builder
        .addCase(user_data.pending, (state) => {
          state.product_watch.status = "loading";
        })
        .addCase(user_data.fulfilled, (state, action) => {
          state.product_watch.status = "succeeded";

          state.product_watch.data = action.payload.product_watch;
          localStorage.setItem("product_watch_data", JSON.stringify(state.product_watch.data));
          localStorage.setItem("status_user_data", state.product_watch.status);
          ////////
          state.product_by = action.payload.products_by.map((product) => ({
            id_user_p: product.id,
            color_selected: product.color,
            size_selected: product.size,
            quantity: product.quantity,
            products: product.product,
          }));
          //////////
          localStorage.setItem("product_by_data", JSON.stringify(state.product_by));
          //console.log("from user", action.payload);
        })
        // @ts-ignore
        .addCase(user_data.rejected, (state, action) => {
          state.product_watch.error = "failed";
          //state.login.isAuthenticated = false;
          //state.login.error = action.payload;
          //console.log(action.payload);
        });
    }

    //SigninUser
    {
      builder
        .addCase(SigninUser.pending, (state) => {
          state.signin.status = "loading";
        })
        .addCase(SigninUser.fulfilled, (state, action) => {
          state.signin.status = "succeeded";
          state.signin.massege = action.payload;
          localStorage.setItem("authToken", action.payload);
          //console.log(action.payload);
        })
        .addCase(SigninUser.rejected, (state, action) => {
          state.signin.status = "failed";
          state.signin.massege = "error";
          state.signin.error = action.payload.message;
          //console.log(action.payload.message);
        });
    }

    ///add_product_by
    {
      builder
        .addCase(add_product_by.pending, (state) => {
          state.add_pro.status = "loading";
        })
        .addCase(add_product_by.fulfilled, (state, action) => {
          state.add_pro.status = "succeeded";
          state.product_by = action.payload.products_by.map((product) => ({
            id_user_p: product.id,
            color_selected: product.color,
            size_selected: product.size,
            quantity: product.quantity,
            products: product.product,
          }));

          //console.log(action.payload);
        })
        .addCase(add_product_by.rejected, (state, action) => {
          state.add_pro.status = "failed";
          state.add_pro.error = action.payload;
        });
    }

    ///update_product
    {
      builder
        // @ts-ignore
        .addCase(update_quantity.pending, (state) => {
          //state.add_pro.status = "loading";
        })
        .addCase(update_quantity.fulfilled, (state, action) => {
          //state.add_pro.status = "succeeded";
          //state.product_by = action.payload.products_by;
          console.log(action.payload);

          const index = state.product_by.findIndex((item) => item.id_user_p === action.payload.id);
          if (index !== -1) {
            state.product_by[index].quantity = action.payload.quantity;
            console.log(action.payload);
            //state.product_by = state.product_by;
          }

          //console.log(state.product_by);
        })
        // @ts-ignore
        .addCase(update_quantity.rejected, (state, action) => {
          // state.add_pro.status = "failed";
          // state.add_pro.error = action.payload;
        });
    }

    ///add_remove_product_watch
    {
      builder
        .addCase(add_remove_product_watch.pending, (state) => {
          state.product_watch.status = "loading";
        })
        .addCase(add_remove_product_watch.fulfilled, (state, action) => {
          state.product_watch.status = "succeeded";
          state.product_watch.data = action.payload;

          console.log("paylod", action.payload);
        })
        .addCase(add_remove_product_watch.rejected, (state, action) => {
          state.product_watch.status = "failed";
          state.product_watch.error = action.payload;
          console.log("error", action.payload);
        });
    }

    ///remove_product
    {
      builder
        .addCase(delete_product_by.pending, (state) => {
          state.delete_pro.status = "loading";
        })
        .addCase(delete_product_by.fulfilled, (state, action) => {
          state.delete_pro.status = "succeeded";
          //state.product_by = action.payload.products_by;
          state.product_by = action.payload.products_by.map((product) => ({
            id_user_p: product.id,
            color_selected: product.color,
            size_selected: product.size,
            quantity: product.quantity,
            products: product.product,
          }));
          //console.log(state.product_by);
        })
        .addCase(delete_product_by.rejected, (state, action) => {
          state.delete_pro.status = "failed";
          state.delete_pro.error = action.payload;
        });
    }
  },
});

export const { logoutUser, reload_products_by, reload_products_watch } = userSlice.actions;
export default userSlice.reducer;

// state.product_by = action.payload.products_by.map((product) => ({
//   id_user_p: product.id,
//   color_selected: product.color,
//   size_selected: product.size,
//   quantity: product.quantity,
//   products: product.product,
// }));
