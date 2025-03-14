import { Field, useFormikContext } from "formik";
import React from "react";

type CheckboxPropType = {
  className: string;
  name: string;
  value: string;
  label: string;
  [key: string]: any;
};

const FormikCheckbox = ({
  className,
  name,
  value,
  label,
  ...rest
}: CheckboxPropType) => {
    const { values, setFieldValue } = useFormikContext<any>();

    const handleChecked = () => {
      const currentValues = values[name] || [];
      if (currentValues.includes(value)) {
        setFieldValue(
          name,
          currentValues.filter((item: string) => item !== value)
        );
      } else {
        setFieldValue(name, [...currentValues, value]);
      }
    };

  return (
    <label className={`${className}`} htmlFor="">
      <Field
        name={name}
        className="form-check-input me-1"
        type="checkbox"
        value={value}
        onChange={handleChecked}
        {...rest}
      />
      {label}
    </label>
  );
};

export default FormikCheckbox;
