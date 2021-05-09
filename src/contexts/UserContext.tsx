import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { update } from "../api/UserApi";

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
  setName: (name: string) => void,
  setUsername: (name: string) => void,
  setEmail: (email: string) => void, 
  setLevel: (level: number) => void,
  setCurrentExperience: (currentExperience: number) => void,
  setChallengesCompleted: (challengesCompleted: number) => void,
  isLogin: boolean
  login: (user: UserData) => void,
  logout: () => void,
}

interface UserProviderProps {
  children: ReactNode;
  user: UserData
}

export const UserContext = createContext({} as UserContextData);

export const UserProvider = ({ children, user }: UserProviderProps) => {

  const _user = user ?? {} as UserData;
  const router = useRouter();
  
  const [ id, setId ] = useState( _user.id ?? null );
  const [ isLogin, setLogin] = useState(Boolean(id));

  const [ username, setUsername ] = useState(_user.username ?? null);
  const [ name, setName ] = useState(_user.name ?? null);
  const [ email, setEmail ] = useState(_user.email ?? null)
  const [ level, setLevel] = useState(_user.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(_user.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(_user.challengesCompleted ?? 0);
  
  useEffect(() => {
    if (id !== null)
      update({id, username, name, email, level, currentExperience, challengesCompleted});
  }, [username, name, email, level, currentExperience, challengesCompleted]);

  function login(user: UserData) {
    setId(user.id);
    setUsername(user.username);
    setName(user.name);
    setEmail(user.email);
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
      setUsername,
      name,
      setName,
      email,
      setEmail,
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