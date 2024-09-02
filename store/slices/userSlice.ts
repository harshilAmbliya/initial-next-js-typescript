import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "@/store/actions/userAction";

// Define the initial state using that type
const initialState = {};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});


export default userSlice.reducer;
