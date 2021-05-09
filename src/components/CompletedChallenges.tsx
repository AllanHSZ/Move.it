import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/CompletedChallenges.module.scss';

export function CompletedChallenges({ className}) {
  const { challengesCompleted } = useContext(UserContext);

  return (
    <div className={`${styles.completedChallenges} ${className}`}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}