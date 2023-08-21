
import LoginUserReducer from "../slices/user_slice";
import SignUpReducer from "../slices/sign_up"

import { combineReducers } from "redux";

const combinedReducers = combineReducers({
  loginUser:LoginUserReducer,
  signUp:SignUpReducer
});

const rootReducer = (state: any, action: any) => {

  return combinedReducers(state, action);
};
export default rootReducer;
