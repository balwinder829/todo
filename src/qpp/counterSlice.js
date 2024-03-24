import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token:"",
  user:""
}

export const counterSlice = createSlice({
  name: 'stor',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.token += 1
    // },
    // decrement: (state) => {
    //   state.token -= 1
    // },
    incrementByAmount: (state, action) => {
      state.token = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  incrementByAmount,setUser } = counterSlice.actions

export default counterSlice.reducer