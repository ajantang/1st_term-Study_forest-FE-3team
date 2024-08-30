import { useState, useEffect } from "react";

export function useValidateInput(validate) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChangeName = (e) => {
    const newValue = e.target.value.toString();
    setValue(newValue);
    setIsValid(validate(newValue));
  };

  useEffect(() => {
    setIsValid(validate(value));
  }, [value, validate]);

  return {
    value,
    isValid,
    onChange: handleChangeName,
    setValue,
  };
}

export default useValidateInput;
