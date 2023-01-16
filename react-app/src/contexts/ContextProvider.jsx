import React, { createContext, useContext, useState } from "react";

/**
 * The default values of the created context are
 * important for the autocompletion function of the IDE.
 */
const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => { },
  setToken: () => { }
});

/**
 * Here the children is the React component that will
 * be passed to this context provider - see ../main.jsx
 * In this case it is our <RouterProvider value={...} />
 */
export const ContextProvider = ({ children }) => {
  // Create the actual states
  const [user, setUser] = useState({});
  // const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [token, _setToken] = useState('123');  // test the redirection of the logged-in users

  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  return (
    // The outer curly braces are for React,
    // the inner are for the passing JS-object.
    <StateContext.Provider value={{
      user,
      token,
      setUser,
      setToken
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
