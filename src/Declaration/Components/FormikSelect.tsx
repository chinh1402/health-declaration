import React from "react";
import { ToPascalCase } from "../../Helpers/ToPascalCase";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { getNestedValue } from "../../Helpers/GetNestedValue";

type FormikSelectType = {
  className?: string;
  name: string;
  data?: { value: string; label: string }[];
  value?: string;
  label?: string;
  [key: string]: any;
};

const FormikSelect = ({ className, name, data, value, label, ...rest }: FormikSelectType) => {
  const { touched, errors } = useFormikContext<any>();

  return (
    <div className={className}>
      <div className="">
        <label htmlFor={name} className="form-label">
          {label}
          <span className="text-danger">*</span>
        </label>
        <Field
          as="select"
          name={name}
          className={`form-control ${
            getNestedValue(touched, name) && getNestedValue(errors, name) ? "border-danger" : ""
          }`}
          value={value}
          {...rest}
        >
          <option value="">-----Choose</option>
          {data?.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </Field>
      </div>
      <ErrorMessage
        component="div"
        name={name}
        className="invalid-feedback d-block"
      />
    </div>
  );
};

export default FormikSelect;
