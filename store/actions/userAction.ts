import apiConfig from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllUsers = createAsyncThunk("users/getAllUsers",async (_, { dispatch }) => {
    try {
      const { data } = await apiConfig.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      return data;
    } catch (error) {
      return error;
    }
  }
);
