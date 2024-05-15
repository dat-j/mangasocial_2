import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sv:1,
    ReadMode:false,
};

export const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    changeServer: (state, action) => {
      const sv = action.payload;

      state.sv = sv;
    },
    changeReadMode:(state, action) =>{
      const ReadMode = action.payload;
      state.ReadMode = ReadMode;
    }
  },
});

// Action creators are generated for each case reducer function
export const { changeServer,changeReadMode } = serverSlice.actions;


export default serverSlice.reducer;
