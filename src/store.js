import { configureStore } from "@reduxjs/toolkit";
import appReducers from '../src/reducers/appReducers';

const store = configureStore({
  reducer:{
    loginUserDetails :appReducers
  }
})
export default store
