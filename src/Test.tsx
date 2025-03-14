import { Formik, Form, Field } from 'formik';

const Test = () => {
    // Mapping of options for the second select
    const optionsMapping = {
      OptionA: ['SubOption A1', 'SubOption A2', 'SubOption A3'],
      OptionB: ['SubOption B1', 'SubOption B2', 'SubOption B3'],
    };
  
    return (
      <Formik
        initialValues={{
          select1: '',
          select2: '',
        }}
        onSubmit={(values) => {
          console.log('Form values:', values);
        }}
      >
        {({ values, setFieldValue }) => {
          // Get options for select2 based on select1's value
          const dependentOptions = optionsMapping[values.select1 as keyof typeof optionsMapping] || [];
  
          return (
            <Form>
              <div>
                <label>Select 1</label>
                <Field
                  as="select"
                  name="select1"
                  onChange={(e: any) => {
                    const value = e.target.value;
                    setFieldValue('select1', value);
                    // Reset select2 when select1 changes
                    setFieldValue('select2', '');
                  }}
                >
                  <option value="">-- Select an option --</option>
                  <option value="OptionA">Option A</option>
                  <option value="OptionB">Option B</option>
                </Field>
              </div>
  
              <div>
                <label>Select 2</label>
                <Field as="select" name="select2">
                  <option value="">-- Select an option --</option>
                  {dependentOptions.map((option: any, index : any) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
              </div>
  
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    );
  };

export default Test;
