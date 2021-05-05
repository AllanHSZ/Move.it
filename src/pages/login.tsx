import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { FormPage } from "../components/FormPage";
import { Input } from "../components/Input";
import { Redirecting } from "../components/Redirecting";
import { Spinner } from "../components/Spinner";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/pages/Login.module.scss"

const Login = () => {
  const router = useRouter();
  const { login, isLogin } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (isLogin) {
    router.replace('/');
    return <Redirecting />;
  }

  function handleSubmit({ email, password }: any) {
    console.log('Login, user =', { email, password });
    setLoading(true);
    setTimeout(() => {
      let users = JSON.parse(window.localStorage.getItem('users') ?? '[]') as any[];
      const filtered = users.filter((user: any) => user.email === email || user.username === email);
      if (filtered.length === 0) {
        setError('Usuário ou email não encontrado.');
      } else {
        const find = filtered.find((user: any) => user.password === password);
        if (find){
          setError(null);
          login(find);
        } else {
          setError('Usuário ou senha incorreta.');
        }
      }  
      setLoading(false);
    }, 2500);
  }

  return (
    <FormPage title="Entrar">
      <Head>
        <title>Login | Move.it</title>
      </Head>
      <Form className={styles.form} onSubmit={handleSubmit} isLoading={isLoading}>
        <Input 
          label="E-mail ou usuário" 
          name="email" 
          required={true}
          showRequired={false}
          showError={false}
        />
        <Input 
          label="Senha" 
          type="password" 
          name="password" 
          required={true}
          showRequired={false}
          showError={false}
        />
        <Button 
          color="primary" 
          disabled={isLoading}
          htmlType="submit"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
        {error && <span className="error">{error}</span>}
      </Form>
      <div className={styles.singupWrapper}>
        <h3 className="title">Cadastre-se</h3>
        <div className={styles.singup}>
          <p>Ainda não possui uma conta ?</p>
          <Button
            color="primary" 
            size="small" 
            disabled={isLoading}
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