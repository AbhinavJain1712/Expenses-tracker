import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import { updateUserAction } from "../../../redux/slices/users/usersSlices";
import navigate from "../../../utils/navigate";

// Form validation schema
const formSchema = Yup.object({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
});

const UpdateProfile = ({ location: { state: data } }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Users state from Redux
  const user = useSelector(state => state.users);
  const { userLoading, userAppErr, userServerErr, isUpdated } = user;

  // Initialize form
  const formik = useFormik({
    initialValues: {
      firstname: data?.data?.firstname || "",
      lastname: data?.data?.lastname || "",
      email: data?.data?.email || "",
    },
    onSubmit: values => {
      const user = {
        ...values,
        id: data?.data?.id,
      };
      dispatch(updateUserAction(user));
    },
    validationSchema: formSchema,
  });

  // Redirect if the user is updated
  useEffect(() => {
    if (isUpdated) {
      navigate(history, "profile", undefined);
    }
  }, [isUpdated, history]);

  return (
    <section className="py-5 bg-success vh-100">
      <div className="container text-center">
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">Update Profile</span>
                <h4 className="mb-4 fw-light">
                  Hi, {data?.data?.firstname}. Do you want to update your profile?
                </h4>

                {/* Display Errors */}
                {userAppErr || userServerErr ? (
                  <ErrorDisplayMessage
                    error={{ userAppErr, userServerErr }}
                  />
                ) : null}

                {/* Firstname */}
                <div className="mb-3 input-group">
                  <input
                    {...formik.getFieldProps("firstname")}
                    className="form-control"
                    type="text"
                    placeholder="Enter firstname"
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>

                {/* Lastname */}
                <div className="mb-3 input-group">
                  <input
                    {...formik.getFieldProps("lastname")}
                    className="form-control"
                    type="text"
                    placeholder="Enter lastname"
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>

                {/* Email */}
                <div className="mb-3 input-group">
                  <input
                    {...formik.getFieldProps("email")}
                    className="form-control"
                    type="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.email && formik.errors.email}
                </div>

                {/* Update Button */}
                <button type="submit" className="btn btn-warning" disabled={userLoading}>
                  {userLoading ? "Updating..." : "Update"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
