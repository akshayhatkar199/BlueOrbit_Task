import { createSlice } from "@reduxjs/toolkit";
import {userList} from "../../components/Data"

export const userSlice = createSlice({
  name: "users",
  initialState: { value: userList },
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },

    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    updateUsername: (state, action) => {
      const { id, name, email} = action.payload;
      const uu = state.value.find(user => user.id == id );
      if(uu){
        uu.name = name;
        uu.email = email;
      }
    },
  },
});

export const { addUser, deleteUser, updateUsername } = userSlice.actions;
export default userSlice.reducer;
