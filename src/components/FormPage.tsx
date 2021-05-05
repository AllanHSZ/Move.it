import { ReactNode } from 'react';
import styles from '../styles/components/FormPage.module.scss';
import Logo from './Logo';

interface FormPageProps {
  children: ReactNode,
  title: string,
  className?: string,
  logoClass?: string,
  copyrightClass?: string,
  sectionClass?: string
}

export const FormPage = ({ children, title, className, logoClass, copyrightClass, sectionClass}: FormPageProps) => {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <div className="logoDecoration">
        <Logo />
      </div>
      <section className={sectionClass ?? ''}>
        <img className={`${styles.logo} ${logoClass}`} src="logo-full.svg" alt="Move.it"/>
        <main>
          <h1 className="title">{title}</h1>
          {children}
        </main>
        <i className={`${styles.copyright} ${copyrightClass ?? ''}`}>Move.it ©, alguns dereitos reservados.</i>
      </section>
    </div>
  );
}