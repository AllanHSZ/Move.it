import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.scss';
import { FaUserAlt } from "react-icons/fa";

export function Profile() {

  const anonymous = true;
  const { level } = useContext(ChallengesContext);

  return (
    <div className={`${styles.profile}`}>
      {anonymous ? (
        <FaUserAlt className={styles.imgAnonymous} />
      ) : (
        <img src="icons/user.svg" alt="UserName"/>
      )}
      <div>
        <strong>Anônimo</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Lavel: {level}
        </p>
      </div>
    </div>
  );
}