import { ReactNode } from "react";
import { FiHome, FiUser } from "react-icons/fi";

interface Router {
  icon?: ReactNode,
  label?: string,
  path: string,
  needAuth?: boolean
  addInNav?: boolean, 
}

export const Routers: Router[] = [{
  icon: <FiHome />,
  label: 'Inicio',
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
},
{
  path: '/user',
  icon: <FiUser />,
  label: 'Perfil',
  needAuth: true,
  addInNav: true
}
];

