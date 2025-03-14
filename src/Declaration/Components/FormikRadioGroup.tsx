import React from "react";
import FormikRadio from "./FormikRadio";
import { useFormikContext } from "formik";

type Props = {
  className?: string;
  name: string;
  radioOptions: string[];
};

const FormikRadioGroup = ({ name, radioOptions }: Props) => {
  const { values } = useFormikContext<any>();
    return (
    <>
      {radioOptions.map((item, index) => {
        return (
          <FormikRadio
            className={`form-check-label me-4`}
            name={name}
            value={item}
            label={item}
            key={index}
            checked={values[name] === item ? true : false}
          />
        );
      })}
    </>
  );
};

export default FormikRadioGroup;
