import { FiAward, FiHome, FiUser } from "react-icons/fi";
import styles  from '../styles/components/SideNav.module.scss';
import ActiveLink from './ActiveLink';

export const SideNav = () => {
  return (
    <nav className={styles.sideNav}>
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