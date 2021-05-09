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
import { register } from '../api/UserApi'

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

  async function handleRegister(){
    setError(null);
    setSubmiting(true);
    try {
      login(await register(value));
    } catch (e) {
      setSubmiting(false);
      setError(e);
    }
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
          label="Email" 
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
          label="Repita a senha" 
          required={true} 
          type="password" 
          name="password2"
          disabled={isSubmiting}
          validOnChange={false}
          validate={(password2) => password2 === value.password || 'As senhas não coincidem.'}
          onValidate={(value) => onValidate('password2', value)}
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