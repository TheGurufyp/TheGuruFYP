import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    SET_LOGGEDIN: (state, action) => {
      state.currentUser = action.payload;
      //   state.userInfo = action;
    },
  },
});

export const { SET_LOGGEDIN } = userReducer.actions;

// export const loginUser = (payload) => (dispatch) => {
//   console.log("inside asyn: ", payload);
//   axios
//     .post(`${process.env.NEXT_PUBLIC_Host_URL}api/loginuser`, {
//       email: payload.email,
//     })
//     .then((res) => {
//       console.log("response came", res);
//       dispatch(SET_LOGGEDIN(true));
//     })
//     .catch((err) => {
//       console.log("error");
//     });
// };

export default userReducer.reducer;
