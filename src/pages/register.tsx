import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Button } from '../components/Button';
import { FormPage } from '../components/FormPage';
import { Input } from '../components/Input';
import { Redirecting } from '../components/Redirecting';
import { UserContext } from '../contexts/UserContext';
import useForm from '../hooks/useForm';
import styles from '../styles/pages/Register.module.scss';

const Register = () => {

  const router = useRouter();
  const { login, isLogin } = useContext(UserContext);

  const { value, isValidate, onValidate, onChange} = useForm();
  const [isSubmiting, setSubmiting] = useState(false);
  const [error, setError] = useState(null);

  if (isLogin) {
    router.replace('/');
    return <Redirecting />;
  }

  function handleRegister(){
    setError(null);
    setSubmiting(true);
    setTimeout(() => {
      debugger;
      let users = JSON.parse(window.localStorage.getItem('users') ?? '[]');
      setSubmiting(false);
      if (users.find((_user: any) => _user.username === value.username)) {
        setError('O usuário já está em uso!');
      } else if (users.find((_user: any) => _user.email === value.email)){
        setError('O email já está em uso!');
      } else {
        window.localStorage.setItem('users', JSON.stringify([...users, value]));
        login(value);
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
      <form className={styles.form}>
        <Input 
          label="Usuário" 
          required={true} 
          name="username"
          disabled={isSubmiting}
          onChange={(value) => onChange('username', value)}
          onValidate={(value) => onValidate('username', value)}
        />
        <Input 
          label="E-mail" 
          required={true} 
          type="email" 
          name="email"
          disabled={isSubmiting}
          onChange={(value) => onChange('email', value)}
          onValidate={(value) => onValidate('email', value)}
        />
        <Input 
          label="Senha" 
          required={true} 
          type="password" 
          name="password"
          disabled={isSubmiting}
          onChange={(value) => onChange('password', value)}
          onValidate={(value) => onValidate('password', value)}
        />
        <Input 
          label="Nome" 
          required={true} 
          name="name"
          disabled={isSubmiting}
          onChange={(value) => onChange('name', value)}
          onValidate={(value) => onValidate('name', value)}
        />
        <Button 
          color="primary" 
          onClick={handleRegister}
          disabled={!isValidate || isSubmiting}
        >
          {isSubmiting ? "Cadastrando..." : "Criar conta"}
        </Button>
        {error && <span className="error">{error}</span>}
      </form>
      <div className={styles.singInWrapper}>
        <h3 className="title">Entrar</h3>
        <div className={styles.singIn}>
          <p>Já possui uma conta ?</p>
          <Button
            color="primary" 
            size="small"
            disabled={isSubmiting}
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