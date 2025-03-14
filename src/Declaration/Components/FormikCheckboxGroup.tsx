import React from "react";
import FormikCheckbox from "./FormikCheckbox";
import { useFormikContext } from "formik";

type Props = {
  className?: string;
  name: string;
  checkboxOptions: string[];
};

const FormikCheckboxGroup = ({ className, name, checkboxOptions }: Props) => {
  const { values } = useFormikContext<any>();
  return (
    <>
      {checkboxOptions.map((value, index) => {
        return (
          <FormikCheckbox
            className={`form-check-label me-4 ${className}`}
            name={name}
            value={value}
            label={value}
            checked={values.symptoms.includes(value) ? true : false}
            key={index}
          />
        );
      })}
    </>
  );
};

export default FormikCheckboxGroup;
