import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/CompletedChallenges.module.scss';

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(UserContext);

  return (
    <div className={styles.completedChallenges}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}