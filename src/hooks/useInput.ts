import { useState } from 'react';

type UseInputParam = {
  initVal: string | '';
  validation: (v: string) => boolean | never;
};

export default function useInput({ initVal, validation }: UseInputParam) {
  const [value, setValue] = useState(initVal);
  const [valid, setValid] = useState(true);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = e;

    setValue(value);
    setValid(validation(value));
  }

  function onReset() {
    setValue('');
  }

  return { value, onChange, valid, onReset };
}
