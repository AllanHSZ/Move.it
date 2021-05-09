import { useEffect, useState } from "react";

export interface UseForm {
  reset: () => void,
  onChange: (name: string, value: string) => void,
  onValidate: (name: string, value: boolean) => void;
  isValidate: boolean,
  value: any
}

export default function useForm(): UseForm {

  const [value, setValue] = useState({});
  const [validates, setValidates] = useState({})
  const [isValidate, setIsValidate] = useState(false);

  useEffect(() => {
    setIsValidate(Object.keys(validates).length > 0 && !Object.keys(validates).find(key => validates[key] === false))
  }, [validates])

  function handleChange(fieldName: string, fieldValue: string){
    setValue({ ...value, [fieldName]: fieldValue})
  }

  function handleValidate(fieldName: string, fieldValue: boolean) {
    setValidates({...validates, [fieldName]: fieldValue});
  }

  function reset() {
    setValue({});
    setValidates({});
    setIsValidate(false);
  }

  return {
    reset,
    onChange: handleChange,
    onValidate: handleValidate,
    isValidate,
    value
  };
}