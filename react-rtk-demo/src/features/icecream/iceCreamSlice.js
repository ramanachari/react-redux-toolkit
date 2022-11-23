import { createSlice } from "@reduxjs/toolkit";
import { ordered as cakeOrdered } from "./../cake/cakeSlice";

const initialState = {
  numOfIceCreams: 20,
};

const iceCreamSlice = createSlice({
  name: "IceCream",
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numOfIceCreams -= action.payload;
    },

    restocked: (state, action) => {
      state.numOfIceCreams += action.payload;
    },
  },

  // extraReducers: {
  //   ["Cake/ordered"]: (state) => {
  //     state.numOfIceCreams--;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state) => {
      state.numOfIceCreams--;
    });
  },
});

export default iceCreamSlice.reducer;
export const { ordered, restocked } = iceCreamSlice.actions;
