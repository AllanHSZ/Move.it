import { useContext } from 'react';
import { FaTimes } from "react-icons/fa";
import { ChallengesContext } from '../contexts/ChallengesContext';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/LevelUpModal.module.scss';
import { Button } from './Button';

export function LevelUpModal() {
  const { level } = useContext(UserContext);
  const { closeLevelUpModal } = useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo nivel.</p>

        <Button 
          type="icon"
          onClick={closeLevelUpModal}>
          <FaTimes />
        </Button>
      </div>
    </div>
  );
}