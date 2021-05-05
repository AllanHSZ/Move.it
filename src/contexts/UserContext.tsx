import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserData{
  username: string,
  name: string,
  email: string,
  level?: number, 
  currentExperience?: number, 
  challengesCompleted?: number,
}
interface UserContextData {
  user: UserData
  isLogin: boolean
  login: (user: UserData) => void,
  logout: () => void,
}

interface UserProviderProps {
  children: ReactNode;
  userData: UserData
}

export const UserContext = createContext({} as UserContextData);

export const UserProvider = ({ children, userData }: UserProviderProps) => {

  const router = useRouter();
  const [ isLogin, setLogin] = useState(Boolean(userData && userData.username));
  const [ user, setUser] = useState(userData);

  useEffect(() => {
    const _user = JSON.parse(Cookies.get('user'))
    console.log("Load logged user in cookie's", _user);
    setUser(_user);
    setLogin(_user !== null);
  }, [])

  function login(user: UserData) {
    setUser(user);
    setLogin(user !== null);
    console.log("Save logged user in cookie's", JSON.stringify(user));
    Cookies.set('user', JSON.stringify(user));
    router.replace('/');
  }

  function logout(){
    setUser(null);
    setLogin(false);
    Cookies.set('user', null);
    router.replace('/login');
  }
  
  return (
    <UserContext.Provider value={{
      user,
      isLogin,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}