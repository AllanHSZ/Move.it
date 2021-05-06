import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { UserContext } from './UserContext';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number,
}

interface ChallengesContextDate {
  experienceToNextLevel: number,
  activeChallenge: Challenge,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  completeChalllenge: () => void,
  closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextDate);

export function ChallengesProvider({ children  }: ChallengesProviderProps) {

  const { level, setLevel, currentExperience, setCurrentExperience, challengesCompleted, setChallengesCompleted } = useContext(UserContext);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelModalOpen ] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  function levelUp(){
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelModalOpen(false);
  }

  function startNewChallenge() {
    const randomChllengeIndex =  Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChllengeIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChalllenge() {
    if (!activeChallenge)
      return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChalllenge,
        closeLevelUpModal,
       }}>
        {children}
        { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  );
}