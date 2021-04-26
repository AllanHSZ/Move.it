import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

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
  resetChallenge: () => void
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextDate);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(20);
  const [challengesCompleted, setChallengesCompleted] = useState(10);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp(){
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChllengeIndex =  Math.floor(Math.random() * challenges.length);
    setActiveChallenge(challenges[randomChllengeIndex]);
  }

  function resetChallenge() {
    setActiveChallenge(null);
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
        resetChallenge
       }}>
        {children}
    </ChallengesContext.Provider>
  );
}