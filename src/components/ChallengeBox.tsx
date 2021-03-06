import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.scss'
import { Button } from './Button';

export function ChallengeBox({ className}) {
  const { activeChallenge, resetChallenge, completeChalllenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext)

  function handleChallengeSuceeded(){
    completeChalllenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
  <div className={`${styles.challenge} ${activeChallenge ? styles.challengeActive : styles.challengeNotActive} ${className}`}>
    { activeChallenge ? (
        <>
          <header>Ganhe { activeChallenge.amount } xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <Button
              color="danger"
              size="small"
              onClick={handleChallengeFailed}>
              Falhei
            </Button>
            <Button
              color="success"
              size="small"
              onClick={handleChallengeSuceeded}>
              Completei
            </Button>
          </footer>
        </>
      ) : (
        <>
          <strong>Finalize um ciclo para receber um novo desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up"/>
            Complete desafios para ganhar experiência e avançar de nivel.
          </p>
        </>
      )
    }
  </div>
  );
}