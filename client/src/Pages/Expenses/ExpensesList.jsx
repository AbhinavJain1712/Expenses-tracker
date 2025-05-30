import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ContentDetails from "../../components/ContentDetails/ContentDetails";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import LoadingComponent from "../../components/Loading/Loading";
import AppPagination from "../../components/Pagination/AppPagination";
import { fetchExpensesAction } from "../../redux/slices/expenses/expenseAction";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
import calTransaction from "../../utils/accStatistics";

const ExpensesList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  // Fetch expenses on page load or page change
  useEffect(() => {
    dispatch(fetchExpensesAction(page));
  }, [page, dispatch]);

  // Get expenses from Redux state
  const expenses = useSelector(state => state.expenses);
  const { expLoading, expenseList, expAppErr, expServerErr } = expenses;
  
  console.log("Expense List from Backend:", expenseList); // Debugging

  // Calculate total expenses
  const totalExp = calTransaction(expenseList?.docs ? expenseList?.docs : []);

  // Fetch user profile on component mount
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  const user = useSelector(state => state.users);
  const { profile, userLoading, userAppErr, userServerErr } = user;
  
  console.log("User Profile:", profile); // Debugging

  return (
    <>
      {(expLoading || userLoading) ? (
        <LoadingComponent />
      ) : (expAppErr || expServerErr || userAppErr || userServerErr) ? (
        <ErrorDisplayMessage>
          {expServerErr || userServerErr || expAppErr || userAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">
              <a
                className="position-absolute top-0 end-0 mt-4 me-4"
                href="#"
              ></a>
              <div className="pt-8 px-8 mb-8">
                <h6 className="mb-0 fs-3">Recent Expense transactions</h6>
                <p className="mb-0">
                  Below is the history of your expense transactions records
                </p>
                <Link
                  to="/add-expense"
                  className="btn btn-outline-danger me-2 m-2"
                >
                  New Expense
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Withdrawed By</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Title</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Description</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Amount</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Date</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Action</small>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {expenseList?.docs?.length <= 0 ? (
                      <h2>No Expense Found</h2>
                    ) : (
                      expenseList?.docs?.map(exp => (
                        profile?.isAdmin || exp.user === profile?._id ? (
                          <ContentDetails item={exp} key={exp?._id} />
                        ) : null
                      ))
                    )}
                  </>
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {expenseList?.docs?.length > 1 && (
              <AppPagination
                setPage={setPage}
                items={expenseList?.totalPages}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ExpensesList;
