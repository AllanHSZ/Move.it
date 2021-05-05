import { ReactNode } from "react";
import { FiHome } from "react-icons/fi";

interface Router {
  icon?: ReactNode,
  label?: string,
  path: string,
  needAuth?: boolean
  addInNav?: boolean, 
}

export const Routers: Router[] = [{
  icon: <FiHome />,
  label: 'Home',
  path: '/',
  needAuth: true,
  addInNav: true,
},
{
  path: '/login',
  needAuth: false,
  addInNav: false
},
{
  path: '/register',
  needAuth: false,
  addInNav: false
}];

