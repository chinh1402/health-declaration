import { Formik, Field, Form } from "formik";
import FormikInput from "./Components/FormikInput";
import * as Yup from "yup";
import FormikSelect from "./Components/FormikSelect";
import { GenderData } from "./SelectSource/GenderData";
import ProvinceData from "./SelectSource/ProvinceData";
import DistrictFromProvince from "./SelectSource/DistrictData";
import FormikDate from "./Components/FormikDate";
import TravelForm from "./Components/Travel/TravelForm";
import FormikCheckboxGroup from "./Components/FormikCheckboxGroup";
import { CheckboxesOptions } from "./OtherSources/CheckBoxesOptions";
import FormikRadioGroup from "./Components/FormikRadioGroup";
import { RadioOptions } from "./OtherSources/RadioOptions";
import { ObjectData } from "./SelectSource/ObjectData";
import { CountriesData } from "./SelectSource/CountriesData";
import { assignIdToObject } from "../Helpers/GenerateRandomId";
import { AllFormIdFunc } from "./OtherSources/ExistingIdsArray";
import { useNavigate, useParams, Navigate } from "react-router";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  object: Yup.string().required("Object is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  nationality: Yup.string().required("Nationality required"),
  nationId: Yup.string().required("Nation ID is required"),
  province: Yup.string().required("Contact province is required"),
  district: Yup.string().required("Contact district is required"),
  address: Yup.string().required("Contact address is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  mobile: Yup.string()
    .required("Mobile is required")
    .matches(/^\d+$/, "Mobile is invalid"),
  travels: Yup.array().of(
    Yup.object().shape({
      departure: Yup.string().required("Departure is required"),
      departureDate: Yup.date().required("Departure date is required"),
      destination: Yup.string().required("Destination is required"),
      immigrationDate: Yup.date().required("Immigration date is required"),
    })
  ),
});

interface formValues {
  fullName: string;
  object: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  nationId: string;
  province: string;
  district: string;
  symptoms: string[];
  travels?: any[];
  address: string;
  email: string;
  mobile: string;
}

const Declaration = () => {
  // find user data from id via localStorage
  // Then pass init data to formik
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  let currentUserObject = null;
  if (id && !AllFormIdFunc().includes(id)) {
    // id not matches
    return <Navigate to="/" />;
  }

  if (id) {
    currentUserObject = JSON.parse(localStorage.getItem("allFormData")!).find(
      (item: any) => item.id === id
    );
  }


  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="pt-4 mb-3 row">
            <div className="col-lg-12">
              <h2 className="fs-2 text-center text-success">
                MEDICAL DECLARATION FORM FOR FOREIGN ENTRY
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div>
                <Formik
                  initialValues={{
                    fullName: currentUserObject
                      ? currentUserObject.fullName
                      : "",
                    object: currentUserObject ? currentUserObject.object : "",
                    dateOfBirth: currentUserObject
                      ? currentUserObject.dateOfBirth
                      : "",
                    gender: currentUserObject ? currentUserObject.gender : "",
                    nationality: currentUserObject
                      ? currentUserObject.nationality
                      : "",
                    nationId: currentUserObject
                      ? currentUserObject.nationId
                      : "",
                    province: currentUserObject
                      ? currentUserObject.province
                      : "",
                    district: currentUserObject
                      ? currentUserObject.district
                      : "",
                    address: currentUserObject ? currentUserObject.address : "",
                    email: currentUserObject ? currentUserObject.email : "",
                    mobile: currentUserObject ? currentUserObject.mobile : "",
                    symptoms: currentUserObject
                      ? currentUserObject.symptoms
                      : [],
                    travels: currentUserObject ? currentUserObject.travels : [],
                    vaccines: currentUserObject
                      ? currentUserObject.vaccines
                      : "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values: formValues) => {
                    const allFormData = JSON.parse(
                      localStorage.getItem("allFormData") || "[]"
                    );

                    if (id) {
                      // updating
                      const index = allFormData.findIndex(
                        (item: any) => item.id === id
                      );

                      if (index !== -1) {
                        allFormData[index] = {
                          ...allFormData[index],
                          ...values,
                        };
                        localStorage.setItem(
                          "allFormData",
                          JSON.stringify(allFormData)
                        );
                      }
                    } else {
                      // adding
                      const newEntry = assignIdToObject(
                        values,
                        AllFormIdFunc()
                      );
                      const updatedFormData = [...allFormData, newEntry];
                      localStorage.setItem(
                        "allFormData",
                        JSON.stringify(updatedFormData)
                      );
                    }

                    navigate("/");
                  }}
                >
                  {({ values, setFieldValue }) => {
                    let DistrictData: any = values.province
                      ? DistrictFromProvince(ProvinceData, values.province)
                      : [];
                    return (
                      <Form>
                        <div className="row">
                          <div className="col-lg-12">
                            <h4 className="fs-5 fw-bold">
                              Personal information:
                            </h4>
                          </div>
                        </div>
                        <div className="mb-4 row">
                          {/* className, name, value */}
                          <FormikInput
                            className="col-lg-12"
                            name="fullName"
                            label="Full name"
                            value={values.fullName}
                          />
                        </div>
                        <div className="mb-4 row">
                          <FormikSelect
                            className="col-lg-6"
                            name="object"
                            data={ObjectData}
                            label="Object"
                            value={values.object}
                          />
                          <FormikDate
                            className="col-lg-3"
                            name="dateOfBirth"
                            label="Date of birth"
                            value={values.dateOfBirth}
                          />
                          <FormikSelect
                            className="col-lg-3"
                            name="gender"
                            data={GenderData}
                            label="Gender"
                            value={values.gender}
                          />
                        </div>
                        <div className="mb-4 row">
                          <FormikSelect
                            className="col-lg-6"
                            name="nationality"
                            data={CountriesData}
                            label="Nationality"
                            value={values.nationality}
                          />
                          <FormikInput
                            className="col-lg-6"
                            name="nationId"
                            label="Nation ID or Passport ID"
                            value={values.nationId}
                          />
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <h4 className="fs-5 fw-bold">Travel:</h4>
                          </div>
                        </div>
                        <div className="row">
                          <TravelForm />
                        </div>
                        <div className="mt-4 row">
                          <div className="col-lg-12">
                            <h4 className="fs-5 fw-bold">Contact:</h4>
                          </div>
                        </div>
                        <div className="mb-4 row">
                          <FormikSelect
                            className="col-lg-6"
                            name="province"
                            data={ProvinceData}
                            label="Province"
                            onChange={(e: any) => {
                              setFieldValue("province", e.target.value);
                              setFieldValue("district", "");
                            }}
                            value={values.province}
                          />
                          <FormikSelect
                            className="col-lg-6"
                            name="district"
                            label="District"
                            data={DistrictData}
                            value={values.district}
                          />
                        </div>
                        <div className="mb-4 row">
                          <FormikInput
                            className="col-lg-6"
                            name="address"
                            label="Address"
                            value={values.address}
                          />
                          <FormikInput
                            className="col"
                            name="email"
                            label="Email"
                            value={values.email}
                          />
                          <FormikInput
                            className="col"
                            name="mobile"
                            label="Mobile"
                            value={values.mobile}
                          />
                        </div>
                        <div className="mt-4 row">
                          <div className="col-lg-12">
                            <h4 className="fs-5 fw-bold">Symptoms:</h4>
                          </div>
                        </div>
                        <div className="mb-4 row">
                          <div className="col-lg-10">
                            <div className="row">
                              <div className="col-lg-4">
                                <label
                                  htmlFor=""
                                  className="form-label me-4 d-inline-block"
                                >
                                  Do you have any following symptoms?:
                                </label>
                              </div>
                              <div className="col">
                                <FormikCheckboxGroup
                                  name="symptoms"
                                  checkboxOptions={CheckboxesOptions}
                                />
                              </div>
                              <div className="col-lg-12"></div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 row">
                          <div className="col-lg-12">
                            <h4 className="fs-5 fw-bold">Vaccines:</h4>
                          </div>
                        </div>
                        <div className="mb-4 row">
                          <div className="col-lg-10">
                            <div className="row">
                              <div className="col-lg-4">
                                <label
                                  htmlFor=""
                                  className="form-label me-4 d-inline-block"
                                >
                                  Which one would you like to vaccinate ?:
                                </label>
                              </div>
                              <div className="col">
                                <label
                                  className={`form-check-label me-4`}
                                  htmlFor=""
                                >
                                  <Field
                                    name="vaccines"
                                    className="form-check-input me-1"
                                    type="radio"
                                    value=""
                                  />
                                  None
                                </label>
                                <FormikRadioGroup
                                  name="vaccines"
                                  radioOptions={RadioOptions}
                                />
                              </div>
                              <div className="col-lg-12"></div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="d-flex align-items-center gap-3">
                              <button
                                type="submit"
                                className="btn btn-success btn-lg"
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-lg"
                                onClick={() => navigate("/")}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary btn-lg"
                                onClick={() => {
                                  if (confirm("Are you sure you want to reset?")) {
                                    setFieldValue("fullName", "");
                                    setFieldValue("object", "");
                                    setFieldValue("dateOfBirth", "");
                                    setFieldValue("gender", "");
                                    setFieldValue("email", "");
                                    setFieldValue("mobile", "");
                                    setFieldValue("nationId", "");
                                    setFieldValue("nationality", "");
                                    setFieldValue("province", "");
                                    setFieldValue("district", "");
                                    setFieldValue("address", "");
                                    setFieldValue("symptoms", []);
                                    setFieldValue("vaccines", "");
                                    setFieldValue("travels", []);
                                  }
                                }}
                              >
                                Reset
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Declaration;
