import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.scss';
import { FiX, FiCheckCircle, FiPlay } from 'react-icons/fi';
import { Button } from './Button';

export function Countdown({className}) {

  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startCountdown, 
    resetCountdown 
  } = useContext(CountdownContext);

  const [ minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [ secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div className={className}>
      <div className={styles.countdown}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <Button 
          disabled
          type="solid"
          size="huge"
          className={`${styles.countdownButton} ${styles.countdownButtonFinished}`}
        >
          Ciclo encerrado
          <FiCheckCircle />
        </Button>
      
      ) : (
        <>
          { isActive ? (
            <Button 
              color="danger" 
              size="huge"
              onClick={resetCountdown}
              className={styles.countdownButton}
            >
              Abandonar ciclo
              <FiX />
            </Button>
          ) : (
            <Button
              color="primary"
              size="huge"
              onClick={startCountdown}
              className={styles.countdownButton}
            >
              Iniciar um ciclo
              <FiPlay />
            </Button>
          )}
        </>
      )}

    </div>
  );
}