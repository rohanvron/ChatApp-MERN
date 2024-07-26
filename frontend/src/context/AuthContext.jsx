import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const setAuthUser = (user) => {
  const formattedUser = {
    userId: user._id || user.userId,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
  };
  setAuthUser(formattedUser);
  localStorage.setItem("chat-user", JSON.stringify(formattedUser));
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
