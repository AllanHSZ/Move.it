import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { update } from "../Api/UserApi";

export interface UserData{
  id?: string,
  username: string,
  name: string,
  email: string,
  password?: string,
  level?: number, 
  currentExperience?: number, 
  challengesCompleted?: number,
}
interface UserContextData extends UserData {
  setLevel: (level: number) => void,
  setCurrentExperience: (currentExperience: number) => void,
  setChallengesCompleted: (challengesCompleted: number) => void,
  isLogin: boolean
  login: (user: UserData) => void,
  logout: () => void,
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export const UserProvider = ({ children }: UserProviderProps) => {

  const router = useRouter();
  const [ isLogin, setLogin] = useState(false);

  const [ id, setId ] = useState(null);
  const [ username, setUsername ] = useState(null);
  const [ name, setName ] = useState(null);
  const [ email, setEmail ] = useState(null)
  const [ level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  useEffect(() => {
    if (id !== null)
      update({id, username, name, email, level, currentExperience, challengesCompleted});
  }, [username, name, email, level, currentExperience, challengesCompleted]);

  function login(user: UserData) {
    setId(user.id);
    setUsername(user.username);
    setName(user.name);
    setEmail(user.name);
    setLevel(user.level ?? 1);
    setCurrentExperience(user.currentExperience ?? 0);
    setChallengesCompleted(user.challengesCompleted ?? 0);
    setLogin(true);
    Cookies.set('user', JSON.stringify(user));
    router.replace('/');
  }

  function logout(){
    setLogin(false);
    setId(null);
    setUsername(null);
    setName(null);
    setEmail(null);
    setLevel(null);
    setCurrentExperience(null);
    setChallengesCompleted(null);
    Cookies.set('user', null);
    router.replace('/login');
  }
  
  return (
    <UserContext.Provider value={{
      username,
      name,
      email,
      level,
      setLevel,
      currentExperience,
      setCurrentExperience,
      challengesCompleted,
      setChallengesCompleted,
      isLogin,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}