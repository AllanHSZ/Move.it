import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.scss'

export function ChallengeBox() {
  const contextDate = useContext(ChallengesContext);

  const hasActiveChallenge = true;
  return (
  <div className={styles.challengeBox}>
    {
      hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganho 400 xp</header>
          <main>
            <img src="icons/body.svg" />
            <strong>Novo desafio</strong>
            <p>Levante e faça uma caminhada de 3 minutos.</p>
          </main>
          <footer>
            <button 
              type="button"
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up"/>
            Avançe de level completando desafios.
          </p>
        </div>
      )
    }
  </div>
  );
}