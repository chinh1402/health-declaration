import React from "react";
import { Field } from "formik";

type Props = {
  className?: string;
  name: string;
  value: string;
  [key: string]: any;
};

const FormikRadio = ({ className, name, label, ...rest }: Props) => {
  return (
    <>
      <label className={`${className}`} htmlFor="">
        <Field
          name={name}
          className="form-check-input me-1"
          type="radio"
          {...rest}
        />
        {label}
      </label>
    </>
  );
};

export default FormikRadio;
