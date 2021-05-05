
import { useEffect, useState } from 'react';
import styles from '../styles/components/Input.module.scss';

interface InputProps {
  label: string,
  required?: boolean,
  name?: string,
  type?: string,
  showRequired?: boolean,
  showError?: boolean,
  onValidateChange?: (valid: boolean) => void,
  onChange?: (value: string) => void,
  onBlur?: (value: any) => void,
  [key: string]: any,
}

const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido',
  },
  // password: {
  //   regex: /^{6,}$/,
  //   message:
  //     'A senha precisa ter no mínimo 6 caracteres.',
  // },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas.',
  },
};

export const Input = ({ 
    label, 
    required, 
    type, 
    onChange, 
    onValidateChange, 
    name, 
    showError = true, 
    showRequired = true,
     ...rest}: InputProps) => {

  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [isValidate, setValidate] = useState(!required);

  useEffect(() => {
    
    if (onValidateChange)
      onValidateChange(isValidate);

  }, [isValidate])

  function validate(value): true | string {

    if (required && value.trim().length === 0)
      return 'Preenchimetno obrigatório..'

    if (type && types[type] && !types[type].regex.test(value))
      return types[type].message;

    return true;
  }

  function _onChange({ target }) {
    const result = validate(target.value.trim());
    setValidate(result === true);
    if (result === true) {
      setValidate(true);
      setError(null);
    } else {
      setValidate(false);
      setError(result);
    }
    if (onChange)
      onChange(target.value.trim());
  }

  function _onBlur({ target }) {
    const result = validate(target.value.trim()); 
    if (result === true) {
      setValidate( true);
    } else {
      setValidate(false);
      setError(result);
    }
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label} {required && showRequired && <span className={styles.required}>*</span>}</label>
      <input 
        type={type ?? "text"}
        onChange={_onChange} 
        name={name}
        onBlur={_onBlur}
        {...rest}>
      </input>
      { showError && <span className={`error ${styles.error}`}>{error ?? ''}</span>}
    </div>
  );
}