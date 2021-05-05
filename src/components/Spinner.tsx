import styles from '../styles/components/Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.bars}></span>
    </div>
  );
}