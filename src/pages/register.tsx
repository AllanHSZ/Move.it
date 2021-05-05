import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Button } from '../components/Button';
import { Form } from '../components/Form';
import { FormPage } from '../components/FormPage';
import { Input } from '../components/Input';
import { Redirecting } from '../components/Redirecting';
import { Spinner } from '../components/Spinner';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/pages/Register.module.scss';

const Register = () => {

  const router = useRouter();
  const { login, isLogin } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (isLogin) {
    router.replace('/');
    return <Redirecting />;
  }

  function handleSubmit(user: any){
    setLoading(true);
    setTimeout(() => {
      let users = JSON.parse(window.localStorage.getItem('users') ?? '[]');
      setLoading(false);
      if (users.find((_user: any) => _user.username === user.username)) {
        setError('O usuário já está em uso!');
      } else if (users.find((_user: any) => _user.email === user.email)){
        setError('O email já está em uso!');
      } else {
        window.localStorage.setItem('users', JSON.stringify([...users, user]));
        login(user);
      }
    }, 5000);
  }

  return (
    <FormPage 
      title="Criar conta" 
      logoClass={styles.logo} 
      copyrightClass={styles.copyright} 
      sectionClass={styles.section}
    >
      <Head>
        <title>Cadastro | Move.it</title>
      </Head>
      <Form className={styles.form} onSubmit={handleSubmit} isLoading={isLoading}>
        <Input label="Usuário" required={true} name="username"></Input>
        <Input label="E-mail" required={true} type="email" name="email"></Input>
        <Input label="Senha" required={true} type="password" name="password"></Input>
        <Input label="Nome" required={true} name="name"></Input>
        <Button color="primary" htmlType="submit">{isLoading ? "Cadastrando..." : "Criar conta"}</Button>
        {error && <span className="error">{error}</span>}
      </Form>
      <div className={styles.singInWrapper}>
        <h3 className="title">Entrar</h3>
        <div className={styles.singIn}>
          <p>Já possui uma conta ?</p>
          <Button
            color="primary" 
            size="small"
            disabled={isLoading}
            onClick={() => router.push('/login')}
          >
            Entrar
          </Button>
        </div>
      </div>
    </FormPage>
  );
}

export default Register;