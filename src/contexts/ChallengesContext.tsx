import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number,
}

interface ChallengesContextDate {
  level: number, 
  currentExperience: number, 
  challengesCompleted: number,
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
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export const ChallengesContext = createContext({} as ChallengesContextDate);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelModalOpen ] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

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
        level, 
        currentExperience, 
        challengesCompleted,
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