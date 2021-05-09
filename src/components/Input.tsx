
import { useEffect, useState } from 'react';
import styles from '../styles/components/Input.module.scss';

interface InputProps {
  label: string,
  required?: boolean,
  name?: string,
  type?: string,
  value?: string | number,
  showRequired?: boolean,
  showError?: boolean,
  validOnChange?: boolean,
  validate?: (value: string) => boolean | string,
  onValidate?: (valid: boolean) => void,
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
    validate,
    onValidate, 
    name,
    value: propsValue,
    showError = true, 
    showRequired = true,
    validOnChange = true,
     ...rest}: InputProps) => {

  const [firstChange, setFirstChange] = useState(true);
  const [error, setError] = useState('');
  const [value, setValue] = useState(propsValue ? String(propsValue) : '');
  const [isValidate, setValidate] = useState(!required);

  useEffect(() => {
    
    if (onValidate)
      onValidate(isValidate);

  }, [isValidate])

  useEffect(() => {

    if (firstChange){
      setFirstChange(false);
      return;
    }

    if (validOnChange || error) {

      const result = handleValidate(value);
      if (result === true) {
        setValidate(true);
        setError(null);
      } else {
        setValidate(false);
        setError(result === false ? '' : result);
      }
    }

    if (onChange)
      onChange(value);

  }, [value])

  function handleValidate(value: string): boolean | string {

    if (required && value.trim().length === 0)
      return 'Preenchimetno obrigatório..'

    if (type && types[type] && !types[type].regex.test(value))
      return types[type].message;

    if (validate) return validate(value);

    return true;
  }

  function _onBlur({ target }) {
    const result = handleValidate(target.value.trim()); 
    if (result === true) {
      setValidate( true);
    } else {
      setValidate(false);
      setError(result === false ? '' : result);
    }
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label} {required && showRequired && <span className={styles.required}>*</span>}</label>
      <input 
        type={type ?? "text"}
        onChange={({ target }) => setValue(target.value)} 
        name={name}
        value={value}
        onBlur={_onBlur}
        {...rest}>
      </input>
      { showError && <span className={`error ${styles.error}`}>{error ?? ''}</span>}
    </div>
  );
}