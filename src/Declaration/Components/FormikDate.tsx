import { ErrorMessage, Field, useFormikContext } from "formik";
import { getNestedValue } from "../../Helpers/GetNestedValue";

type Props = {
  className: string;
  name: string;
  value?: string;
  label?:string;
  [key: string]: any;
};

const FormikDate = ({ className, name, value, label, ...rest }: Props) => {
  const { touched, errors } = useFormikContext<any>();
  return (
    <div className={className}>
      <div className="">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <Field
          name={name}
          type="date"
          className={`form-control ${
            getNestedValue(touched, name) && getNestedValue(errors, name) ? "border-danger" : ""
          }`}
          value={value}
          {...rest}
        />
      </div>
      <ErrorMessage
        component="div"
        name={name}
        className="invalid-feedback d-block"
      />
    </div>
  );
};

export default FormikDate;
