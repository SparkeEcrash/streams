//ARRAY BASED
const streamReducer = (state=[], action) => {
  switch (action.type) {
    case 'EDIT_STREAM':
      return state.map(stream => {
        if (stream.id === action.payload.id) {
          return action.payload;
        } else {
          return stream;
        }
      })
    default:
      return state;
  }
};

//OBJECT BASED
const streamReducer = (state={}, action) => {
  switch (action.type) {
    case 'EDIT_STREAM':
      // const newState = { ...state };
      // newState[action.payload.id] = action.payload;
      // return newState;

      return { ...state, [action.payload.id]: action.payload }
      //the square brackets are not creating an array
      //it is key interpolation
    default:
      return state;
  }
}
