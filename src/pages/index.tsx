import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.scss';
import { ChallengesProvider } from '../contexts/ChallengesContext';

export default function Home() {
  return (
    <ChallengesProvider >
      <div className={`pageContent ${styles.container}`}>
        <Head>
          <title>Inicio | Move.it</title>
        </Head>
        <ExperienceBar className={styles.experienceBar} />
        <CountdownProvider>
          <section>
            <Profile className={styles.profile}/>
            <CompletedChallenges className={styles.completedChallenges}/>
            <Countdown className={styles.countdown}/>
          </section>
          <ChallengeBox className={styles.challengeBox}/>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}