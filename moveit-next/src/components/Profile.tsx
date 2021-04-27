import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.scss';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profile}>
      <img src="https://github.com/allanhsz.png" alt="Allan Henrique"/>
      <div>
        <strong>Allan Henrique</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Lavel: {level}
        </p>
      </div>
    </div>
  );
}