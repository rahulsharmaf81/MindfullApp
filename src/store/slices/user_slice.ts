import { createSlice } from "@reduxjs/toolkit";
import EncryptedStorage from 'react-native-encrypted-storage';

export const initialState = {
  // isLoadingBack: false,
  token: "",
  loginUserDetails: "",
  userState:false
};

const userSlice = createSlice({
  name: "login_user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.token = payload.token;
      state.loginUserDetails = payload.loginUserDetails;
      EncryptedStorage.setItem("token", payload.token)
      EncryptedStorage.setItem("user", payload.loginUserDetails)
      state.userState = true
    },
    // updateLoadingState: (state, { payload }) => {
    //   state.isLoadingBack = payload.isLoadingBack;
    // },
    reset: () => {},
  },

  // extraReducers: (builder) => {
  //   builder.addCase(loginUser.pending, (state) => {
  //   });
  //   builder.addCase(loginUser.fulfilled, (state, { payload }) => {

  //   });
  //   builder.addCase(loginUser.rejected, (state) => {

  //   });
  // },
});
export const LoginActions = userSlice.actions;
export default userSlice.reducer;
