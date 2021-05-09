import { useContext } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Profile.module.scss';

export function Profile({className}) {

  const { level, name } = useContext(UserContext);

  return (
    <div className={`${styles.profile} ${className}`}>
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