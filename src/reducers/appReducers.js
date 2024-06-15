import { createSlice } from "@reduxjs/toolkit"
export  const appReducers = createSlice({
  name: "loginUserDetails",
  initialState:{
    user:{}
  },
  reducers:{
    getNewData:(state , action) =>{
      state.user = action.payload;
    },
    deleteData:(state)=>{
      state.user = {}
    }
  }
})
export default appReducers.reducer
export const {getNewData,deleteData} = appReducers.actions
