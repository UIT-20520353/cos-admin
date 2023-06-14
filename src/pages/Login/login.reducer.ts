import { createAction, createReducer } from "@reduxjs/toolkit";
import { IUser } from "~/types/user.type";

const initialState: IUser = {
  id: -1,
  name: ""
};

export const userLogin = createAction<IUser>("user/login");
export const userLogout = createAction<IUser>("user/logout");

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(userLogin, (state, action) => {
    const data = action.payload;
    state.id = data.id;
    state.name = data.name;
  });
  builder.addCase(userLogout, (state, action) => {
    const data = action.payload;
    state.id = data.id;
    state.name = data.name;
  });
});

export default userReducer;
