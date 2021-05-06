import { useContext } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Profile.module.scss';

export function Profile() {

  const { level, name } = useContext(UserContext);

  return (
    <div className={`${styles.profile}`}>
      <FaUserAlt className={styles.imgAnonymous} />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level: {level}
        </p>
      </div>
    </div>
  );
}