import { FiAward, FiHome, FiUser } from "react-icons/fi";
import styles  from '../styles/components/Nav.module.scss';
import ActiveLink from './ActiveLink';

export interface NavProps {
  isMobile?: boolean
}

export const Nav = ({ isMobile }: NavProps) => {
  console.log("isMobile", isMobile);
  return (
    <nav className={`${styles.nav} ${isMobile && styles.navMobile}`}>
      <img src="logo.svg" alt="Move.it"/>
      <ul>
        <ActiveLink activeClassName={styles.active} href="/">
          <li data-pos="1">
            <FiHome />
          </li>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/login">
          <li data-pos="2">
            <FiUser />
          </li>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/award">
          <li data-pos="3">
            <FiAward />
          </li>
        </ActiveLink>
        <div className={styles.mark}></div>
      </ul>
    </nav>
  );
}