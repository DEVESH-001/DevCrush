import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  //createSlice is a function that takes an object with name, initialState, and reducers. We have to pass these parameters to createSlice function to create a slice of the store.
  //name is the name of the slice, it will be used to identify the slice in the store
  //initialState is the initial state of the slice, it can be an object
  //reducers is an object that contains the reducer functions, these functions will be used to update the state of the slice
  //reducers are functions that take the current state and an action, and return a new state
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      //action is an object that contains the type and payload properties, payload is the data that we want to add to the state.
      //state is the current state of the slice, we can mutate it directly because createSlice uses Immer under the hood, which allows us to write "mutating" code that is actually immutable
      //so we can directly modify the state and return it, Immer will take care of creating a new state object for us
      //console.log("feed",action.payload);
      
      return action.payload; //action.payload is the data that we want to add to the state, it can be an object or an array
      //this will replace the current state with the new state
      //so we are returning the payload of the action, which is the new state
      //this is how we update the state in Redux Toolkit, we don't have to use spread operator
    },
    removeFeed: (state, action) => {
      return action.payload;
    },
  },
});

export const { addFeed } = feedSlice.actions; // export the actions so we can use them in our components
export default feedSlice.reducer; // export the reducer function, so we can use it in the store
