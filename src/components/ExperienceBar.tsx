import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/ExperienceBar.module.scss';

export function ExperienceBar() {
  const { currentExperience } = useContext(UserContext);
  const { experienceToNextLevel } = useContext(ChallengesContext);

  const percentoToNextLevel = Math.round(currentExperience * 100) /experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentoToNextLevel}%` }} />
        <span style={{ left: `${percentoToNextLevel}%` }} className={styles.currentExperience}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
