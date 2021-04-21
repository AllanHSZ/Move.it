import styles from '../styles/components/Profile.module.scss';

export function Profile() {
  return (
    <div className={styles.profile}>
      <img src="https://github.com/allanhsz.png" alt="Allan Henrique"/>
      <div>
        <strong>Allan Henrique</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Lavel: 1
        </p>
      </div>
    </div>
  );
}