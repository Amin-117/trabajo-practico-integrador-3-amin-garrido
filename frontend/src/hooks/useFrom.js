import { useState } from "react";

export const useForm = (initialValue = {}) => {
  const [values, setValues] = useState(initialValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    const handleReset = () => {
      setValues(initialValue);
    };
  };

  return {
    values,
    handleChange,
    handleReset,
  };
};
