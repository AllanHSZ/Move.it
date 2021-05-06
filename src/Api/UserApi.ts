import Cookies from "js-cookie";
import { UserData } from "../contexts/UserContext";

export function getUsers(): UserData[] {
  return JSON.parse(window.localStorage.getItem('users') ?? '[]');
}

export function register(user: UserData): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (findUserByUserName(user.username)) {
        reject('O usuário já está em uso!');
        return;
      }
       if (findUserByEmail(user.email)){
        reject('O email já está em uso!');
        return;
      } 

      user.id = String(Date.now());
      insertUser(user);
      delete user.password;
      resolve(user);

    }, 2500)
  });
}

export async function login(username: string, password: string): Promise<any> {
  return new Promise<UserData>((resolver, reject) => {
    setTimeout(() => {
      const filtered = getUsers().filter(({email, username}) => email === username || username === username);

      if (filtered.length === 0) {
        reject('Usuário ou email não encontrado.');
        return;
      }

      const find = filtered.find(({password: userPass}) => userPass === password);
      
      if (find) {
        delete find.password;
        resolver(find);
        return;
      }

      reject('Usuário ou senha incorreta.');

    });
  });
}

export async function update(user: UserData){
  Cookies.set('user', JSON.stringify(user));
  const users = getUsers();
  users[users.indexOf(users.find(({ id }) => id === user.id))] =  user;
  insertUsers(users);
}

function findUserByUserName(username: string): UserData {
  return getUsers().find((user: UserData) => user.username === username);
}
function findUserByEmail(email: string): UserData {
  return getUsers().find((user: any) => user.email === email);
}

function insertUser(user: UserData){
  insertUsers([...getUsers(), user]);
}

function insertUsers(users: UserData[]){
  window.localStorage.setItem('users', JSON.stringify(users));
}