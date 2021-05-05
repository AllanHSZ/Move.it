import { ReactNodeArray, useEffect, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface FormProps {
  children: ReactNodeArray,
  className?: string,
  onSubmit: (value: any) => void,
  isLoading?: boolean,
}

export const Form = ({children, className, onSubmit, isLoading }: FormProps) => {
  const [value, setValue] = useState({});
  const [valids, setValids] = useState({})
  const [isValidate, setValidate] = useState(false);

  useEffect(() => {
    setValidate(Object.keys(valids).length > 0 && !Object.keys(valids).find(key => valids[key] === false))
  }, [valids])

  function handleChange(fieldValue, name){
    setValue({ ...value, [name]: fieldValue})
  }
  
  function _onValidChange(isValid: boolean, name: string){
    setValids({...valids, [name]: isValid});
  }

  function _submit(event: any){
    event.preventDefault();
    event.stopPropagation();
    onSubmit(value);
  }

  let i = 0;
  return (
    <form className={className}>
      {
        children.map((child: any) => {
          if (!child)
            return child;

          if ( child.type.name === 'Input' && child.props.name) {
            i++;
            return (
              <Input 
                {...child.props} 
                onValidateChange={(isValid) => _onValidChange(isValid, child.props.name)}
                onChange={(_value) => handleChange(_value, child.props.name)}
                disabled={isLoading}
                key={i}
              />
            );
          } else if (child.type.name === 'Button' && child.props.htmlType === 'submit') {
            const { children, ...rest } = child.props;
            i++;
            return (
              <Button 
                {...rest}
                key={i}
                disabled={isLoading || !isValidate}
                onClick={_submit}
              >
                {children}
              </Button>
            )
          }
          return child;
        })
      }
    </form>
  );
}