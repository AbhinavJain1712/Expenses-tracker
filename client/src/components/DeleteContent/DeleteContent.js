import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moneySVG from "../../img/money.svg";
import ErrorDisplayMessage from "../ErrorDisplayMessage";
import SuccessMessage from "../SuccessMessage"; // Ensure you are handling success messages if needed
import { deleteExpenseAction } from "../../redux/slices/expenses/expenseAction";
import { deleteIncomeAction } from "../../redux/slices/income/incomeAction";
import DisabledButton from "../DisabledButton";
import navigate from "../../utils/navigate";

const DeleteContent = ({ location: { state } }) => {
  const { data } = state;
  const history = useHistory();
  const dispatch = useDispatch();

  // expense
  const expenses = useSelector(state => state?.expenses);
  const { isExpDeleted, expLoading, expAppErr, expServerErr } = expenses;

  // income
  const income = useSelector(state => state?.income);
  const { isIncDeleted, incLoading, incAppErr, incServerErr } = income;

  // delete transaction
  const handleDelete = () => {
    if (data?.type === "income") {
      return dispatch(deleteIncomeAction(data?._id));
    } else if (data?.type === "expense") {
      return dispatch(deleteExpenseAction(data?._id));
    }
  };

  // redirect after deletion
  useEffect(() => {
    if (isExpDeleted) {
      navigate(history, "user-profile-expenses", undefined);
    }
    if (isIncDeleted) {
      navigate(history, "user-profile-income", undefined);
    }
  }, [isExpDeleted, isIncDeleted]);

  return (
    <section className="py-5 bg-secondary vh-100">
      <div className="container text-center">
        <a className="d-inline-block mb-5">
          <img
            className="img-fluid"
            src={moneySVG}
            alt="SVGeXPENSES"
            width="200"
          />
        </a>
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <h2 className="mb-4 fw-light">
                {data?.type === "income" ? "Delete Income" : "Delete Expense"}
              </h2>
              {/* Display Error */}
              {(expAppErr || expServerErr || incAppErr || incServerErr) && (
                <ErrorDisplayMessage
                  error={{
                    appErr: expAppErr || incAppErr,
                    serverErr: expServerErr || incServerErr,
                  }}
                />
              )}
              {/* Display Confirmation */}
              <p>
                Are you sure you want to delete this{" "}
                {data?.type === "income" ? "income" : "expense"}?
              </p>
              {expLoading || incLoading ? (
                <DisabledButton />
              ) : (
                <button
                  onClick={handleDelete}
                  className="btn btn-danger mb-4 w-100"
                >
                  Confirm Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteContent;
