import { useState } from "react";

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues((prevValues) => ({ ...prevValues, [name]: newValue }));
    setValues({ ...values, [name]: newValue });
  };

  const handleReset = () => {
    setValues(initialValues);
  };

  return { values, setValues, handleChange, handleReset };
};

export default useForm;
