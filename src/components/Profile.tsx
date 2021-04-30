import { useContext } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.scss';

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
          Level: {level}
        </p>
      </div>
    </div>
  );
}