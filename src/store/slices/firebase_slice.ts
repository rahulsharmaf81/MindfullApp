import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoadingBack: false,
  token: "",
  loginUserDetails: {},
};

const firebaseSlice = createSlice({
  name: "login_user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.token = payload.token;
      state.loginUserDetails = payload.loginUserDetails;
    },
    updateLoadingState: (state, { payload }) => {
      state.isLoadingBack = payload.isLoadingBack;
    },
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
export const FirebaseActions = firebaseSlice.actions;
export default firebaseSlice.reducer;
