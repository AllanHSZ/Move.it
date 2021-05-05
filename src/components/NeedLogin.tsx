import { Button } from "./Button"
import Logo from "./Logo";
import styles from '../styles/components/NeedLogin.module.scss';
import { useRouter } from "next/router";

export const NeedLogin = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className="logoDecoration">
        <Logo />
      </div>
      <main>
        <h1>Oops !</h1>
        <p>Você está desconectado, para acessar essa página você precisa conectar-se a uma conta.</p>
        <footer>
          <Button 
            color="primary"
            size="small"
            onClick={() => router.push('/register')}
          >
            Criar um conta
          </Button>
          <Button 
            color="primary"
            size="small"
            onClick={() => router.push('/login')}
          >
            Conectar
          </Button>
          </footer>
      </main>
    </div>
  );
}