import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { UserContext } from "../contexts/UserContext";
import { Routers } from "../Routers";
import styles  from '../styles/components/Nav.module.scss';
import ActiveLink from './ActiveLink';

export interface NavProps {
  isMobile?: boolean
}

export const Nav = ({ isMobile }: NavProps) => {
  const { logout } = useContext(UserContext);

  return (
    <nav className={`${styles.nav} ${isMobile && styles.navMobile}`}>
      <img src="logo.svg" alt="Move.it"/>
      <ul>
        {
          Routers.filter((router) => router.addInNav && router.icon).map(({path, icon}) => (
            <ActiveLink activeClassName={styles.active} href={path} key={path}>
              <li>
                {icon}
              </li>
            </ActiveLink>
          ))
        }
        <li onClick={logout}>
          {<FiLogOut/>}
        </li>
        <div className={styles.mark}></div>
      </ul>
    </nav>
  );
}