import { createContext, useReducer } from 'react';

export const HoldsContext = createContext();

export const holdsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HOLD':
      return {
        holds: action.payload,
      };
    case 'CREATE_HOLD':
      return {
        holds: [action.payload, ...state.holds],
      };
    case 'DELETE_HOLD':
      return {
        holds: state.holds.filter((h) => h._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const HoldContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(holdsReducer, {
    holds: null,
  });

  return (
    <HoldsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HoldsContext.Provider>
  );
};
