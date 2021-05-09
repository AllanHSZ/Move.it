import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Button } from "../components/Button";
import { FormPage } from "../components/FormPage";
import { Input } from "../components/Input";
import { Redirecting } from "../components/Redirecting";
import { UserContext, UserData } from "../contexts/UserContext";
import useForm from "../hooks/useForm";
import styles from "../styles/pages/Login.module.scss"
import { login as ApiLogin } from '../api/UserApi'

const Login = () => {
  
  const router = useRouter();
  const { login, isLogin } = useContext(UserContext);
  const { value, isValidate, onValidate, onChange} = useForm();
  const [isSubmiting, setSubmiting] = useState(false);
  const [error, setError] = useState(null);

  if (isLogin) {
    router.replace('/');
    return <Redirecting />;
  }

  async function handleLogin() {
    setError(null);
    setSubmiting(true);
    try {
      login(await ApiLogin(value.user, value.password));
    } catch (error) {
      setError(error);
      setSubmiting(false);
    }
    let users = JSON.parse(window.localStorage.getItem('users') ?? '[]') as UserData[];
    const filtered = users.filter(({email, username}) => email === value.user || username === value.user);
    if (filtered.length === 0) {
    } else {
      const find = filtered.find(({password}) => password === value.password);
      if (find){
        setError(null);
      } else {
        setError('Usuário ou senha incorreta.');
      }
    }  
  }

  return (
    <FormPage title="Entrar">
      <Head>
        <title>Login | Move.it</title>
      </Head>
      <form className={styles.form} >
        <Input 
          label="E-mail ou usuário" 
          name="email" 
          required={true}
          showRequired={false}
          showError={false}
          disabled={isSubmiting}
          onChange={(value) => onChange('user', value)}
          onValidate={(value) => onValidate('user', value)}
        />
        <Input 
          label="Senha" 
          type="password" 
          name="password" 
          required={true}
          showRequired={false}
          showError={false}
          disabled={isSubmiting}
          onChange={(value) => onChange('password', value)}
          onValidate={(value) => onValidate('password', value)}
        />
        <Button 
          color="primary" 
          onClick={handleLogin}
          disabled={!isValidate || isSubmiting}
        >
          {isSubmiting ? 'Entrando...' : 'Entrar'}
        </Button>
        {error && <span className="error">{error}</span>}
      </form>
      <div className={styles.singupWrapper}>
        <h3 className="title">Cadastre-se</h3>
        <div className={styles.singup}>
          <p>Ainda não possui uma conta ?</p>
          <Button
            color="primary" 
            size="small" 
            disabled={isSubmiting}
            onClick={() => router.push('/register')}
          >
            Criar conta
          </Button>
        </div>
      </div>
    </FormPage>
  );
}
export default Login;