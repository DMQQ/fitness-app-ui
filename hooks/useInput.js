import { useState } from "react";

export default function useInput(callback) {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = callback(value);

  const hasError = !valueIsValid && isTouched;

  const valueSetHandler = (e) => setValue(e.target.value);
  const inputBlueHandler = () => setIsTouched(true);
  const resetValue = () => setValue("");

  return {
    valueIsValid,
    hasError,
    inputBlueHandler,
    valueSetHandler,
    value,
    resetValue,
  };
}
