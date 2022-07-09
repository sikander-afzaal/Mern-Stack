export const initialState = {
  loggedIn: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, loggedIn: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
