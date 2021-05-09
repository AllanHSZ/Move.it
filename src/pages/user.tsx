import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { UserContext } from "../contexts/UserContext";
import useForm from "../hooks/useForm";
import styles from '../styles/pages/User.module.scss'

const User = () => {
  
  
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const { id, name, setName, level, challengesCompleted, currentExperience, username, setUsername, email, setEmail } = useContext(UserContext);
  
  // Personal Data
  const { value, onChange, onValidate, isValidate, reset } = useForm();
  const [isSubmiting, setSubmiting] = useState(false);
  const [isValid, setValid] = useState(false);

  // Password
  const [ passIsSubmiting, setPassSubmiting] = useState(false);
  const { 
      value: passValue, 
      onChange: passOnChange, 
      onValidate: passOnValidate, 
      isValidate: passIsValidate 
    } = useForm();

  useEffect(() => {
    if (toastMessage != null){
      setShowToast(true);
      setInterval(() => {
        setShowToast(false);
      }, 5000)
    }
  }, [toastMessage])

  useEffect(() => {
    if (isValidate) {
      setValid(
        value.email && value.email !== email || 
        value.username && value.username !== username || 
        value.name && value.name !== name
        );
    } else {
      setValid(false);
    }
  }, [value, isValidate])

  async function handleDataChange(){
    setSubmiting(true);

    if (value.email && value.email !== email) {
      setEmail(value.email);
    }
    if (value.name && value.name !== name) {
      setName(value.name);
    }
    if (value.username && value.username !== username) {
      setUsername(value.username);
    }

    reset();
    setToastMessage("Dados alterados com sucesso !");
    setSubmiting(false);
  }

  async function handlePassWordChange() {
    setPassSubmiting(true);
    reset();
    setToastMessage("Senha alterada com sucesso !");
    setSubmiting(false);
  } 

  return (
    <div className={styles.profile}>
      <Head>
        <title>Perfil | Move.it</title>
      </Head>

      <main className={styles.content}>
        <h1 className="title">Perfil</h1>

        <div className={`${styles.card} ${styles.info}`}>
          <FaUserAlt className={styles.imgAnonymous} />
          <div>
            <span>
              Level: <strong>{level}</strong>
            </span>
            <span>
              Desafios completos: <strong>{challengesCompleted}</strong>
            </span>
            <span>
              Experiência atual: <strong>{currentExperience}</strong>
            </span>
          </div>
        </div>

        <form className={styles.personalData} onSubmit={handleDataChange}>
          <h3 className="title">Dados pessoais</h3>     
          <Input 
            label="Nome" 
            name="name"
            required={true}
            showRequired={false}
            disabled={isSubmiting}
            onValidate={(value) => onValidate('name', value)}
            onChange={(value) => onChange('name', value)}
            value={name}
            />
          <Input 
            label="Usuário" 
            name="username"
            required={true}
            showRequired={false}
            disabled={isSubmiting}
            onValidate={(value) => onValidate('username', value)}
            onChange={(value) => onChange('username', value)}
            value={username}
            />
          <Input 
            label="Email" 
            name="email"
            type="email"
            required={true}
            showRequired={false}
            disabled={isSubmiting}
            onValidate={(value) => onValidate('email', value)}
            onChange={(value) => onChange('email', value)}
            value={email}
          />
          <Button 
            disabled={!isValid || isSubmiting}
            onClick={handleDataChange}
            color="primary"
          >
            Salvar
          </Button>
        </form> 

        <form className={styles.passwordForm}>
          <h3 className="title">Alterar senha</h3>        
          <Input
            label="Senha atual"
            name="current"
            type="password"
            required={true}
            showRequired={false}
            showError={false}
            disabled={isSubmiting}
            onValidate={(value) => passOnValidate('current', value)}
            onChange={(value) => passOnChange('current', value)}
          />
          <Input
            label="Nova senha"
            name="new"
            type="password"
            required={true}
            showRequired={false}
            showError={false}
            disabled={isSubmiting}
            onValidate={(value) => passOnValidate('new', value)}
            onChange={(value) => passOnChange('new', value)}
          />
          <Input
            label="Confirme a nova senha"
            name="comfirmNew"
            type="password"
            required={true}
            showRequired={false}
            showError={false}
            disabled={isSubmiting}
            validate={(value) => value === passValue.new}
            onValidate={(value) => passOnValidate('comfirmNew', value)}
            onChange={(value) => passOnChange('comfirmNew', value)}
          />
          <Button
            onClick={handlePassWordChange}
            disabled={!passIsValidate || passIsSubmiting} 
            color="primary"
          >
            Salvar
          </Button>
        </form>

        {showToast &&
          <div className={styles.toast}>
            <div>
              <FiCheck />
            </div>
            <p>{toastMessage}</p>
          </div>
        }
      </main>

    </div>
  )
}

export default User;