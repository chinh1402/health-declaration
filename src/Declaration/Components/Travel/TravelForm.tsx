import {  useFormikContext } from "formik";
import FormikDate from "../FormikDate";
import FormikSelect from "../FormikSelect";
import { CountriesData } from "../../SelectSource/CountriesData";

const TravelForm = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  const addTravel = () => {
    setFieldValue("travels", [
      ...values.travels,
      {
        departure: "",
        destination: "",
        departureDate: "",
        immigrationDate: "",
      },
    ]);
  };

  const deleteTravel = (index: number) => {
    setFieldValue(
      "travels",
      values.travels.filter((_: any, idx: number) => idx !== index)
    );
  };

  return (
    <>
      {values.travels.length <= 0 ? (
        <div className="col-lg-12">
          <div className="d-flex align-items-center gap-4">
            <h6>Do you travel in the last 14 days ?</h6>
            <button
              type="button"
              className="btn btn-warning"
              onClick={addTravel}
            >
              Add more
            </button>
          </div>
        </div>
      ) : (
        values.travels.map((travel: any, index: number) => {
          return (
            <div className="mt-1 mb-4 row" key={index}>
              <div className="col-lg-12">
                <h6 className="fw-bold text-primary">Travel {index + 1}</h6>
              </div>
              <FormikDate
                className="mb-4 col-lg-6"
                name={`travels.${index}.departureDate`}
                label="Departure Date"
                value={travel.departureDate}
              />
              <FormikDate
                className="mb-4 col-lg-6"
                name={`travels.${index}.immigrationDate`}
                label="Immigration Date"
                value={travel.immigrationDate}
              />
              <FormikSelect
                className="col-lg-6"
                name={`travels.${index}.departure`}
                label="Departure"
                data={CountriesData}
                value={travel.departure}
              />
              <FormikSelect
                className="col-lg-6"
                name={`travels.${index}.destination`}
                label="Destination"
                data={CountriesData}
                value={travel.destination}
              />
              <div className="mt-4 col-lg-12">
                <button
                  type="button"
                  className="me-3 btn btn-warning"
                  onClick={addTravel}
                >
                  Add more
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteTravel(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default TravelForm;
