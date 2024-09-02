import { combineSlices } from "@reduxjs/toolkit";
import userSlice  from "./userSlice";

export const rootReducer = combineSlices({
  users: userSlice,
});
