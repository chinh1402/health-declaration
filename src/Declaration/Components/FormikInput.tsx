import { ErrorMessage, Field, useFormikContext } from "formik";
type FormikTextInputTypes = {
  className: string;
  name: string;
  value?: string;
  label?: string;
  [key: string]: any;
};

const FormikInput = ({ className, name, value, label, ...rest }: FormikTextInputTypes) => {
  const { touched, errors } = useFormikContext<any>();
  
  return (
    <>
      <div className={className}>
        <div className="">
          <label htmlFor={name} className="form-label">
            {label}<span className="text-danger">*</span>
          </label>
          <Field
            name={name}
            className={`form-control ${
              touched[name] && errors[name] ? "border-danger" : ""
            }`}
            value={value}
            placeholder={`${label}...`}
            {...rest}
          />
        </div>
        <ErrorMessage
          component="div"
          name={name}
          className="invalid-feedback d-block"
        />
      </div>
    </>
  );
};

export default FormikInput;
