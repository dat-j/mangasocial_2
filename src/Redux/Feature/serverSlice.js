import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sv:1,
};

export const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    changeServer: (state, action) => {
      const sv = action.payload;

      state.sv = sv;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeServer } = serverSlice.actions;


export default serverSlice.reducer;
