import React, { createContext, useContext, useState } from "react";

/**
 * The default values of the created context are
 * important for the autocompletion function of the IDE.
 */
const StateContext = createContext({
  user: {
    created_at: "2023-01-18T10:30:44.000000Z",
    email: "email@example.com",
    email_verified_at: null,
    id: null,
    name: "Anon Anonymous",
    updated_at: "2023-01-18T10:30:44.000000Z"
  },
  setUser: () => {},
  token: null,
  setToken: () => {},
  notification: null,
  setNotification: () => {}
});

/**
 * Here the {children} is the React component that will
 * be passed to this context provider - see ../main.jsx
 * In our case it is the <RouterProvider router={router} />
 */
export const ContextProvider = ({ children }) => {
  // Create the actual states, we can pass empty obj for user
  const [user, setUser] = useState({ name: "..." });
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, _setNotification] = useState("");

  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 3000);
  };

  return (
    // The outer curly braces are for React,
    // the inner are for the passing JS-object.
    <StateContext.Provider
      value={{
        user,
        setToken,
        token,
        setUser,
        notification,
        setNotification
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
