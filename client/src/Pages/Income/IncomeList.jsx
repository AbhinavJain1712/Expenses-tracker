import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ContentDetails from "../../components/ContentDetails/ContentDetails";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import LoadingComponent from "../../components/Loading/Loading";
import AppPagination from "../../components/Pagination/AppPagination";
import { fetchIncomesAction } from "../../redux/slices/income/incomeAction";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
import calTransaction from "../../utils/accStatistics";

const IncomeList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  // Fetch incomes and user profile
  useEffect(() => {
    dispatch(fetchIncomesAction(page));
    dispatch(userProfileAction());
  }, [dispatch, page]);

  // Select income and user state
  const income = useSelector((state) => state.income);
  const { incLoading, incomeList, incAppErr, incServerErr } = income;

  const user = useSelector((state) => state.users);
  const { profile, userLoading, userAppErr, userServerErr } = user;

  // Calculate total income
  const totalInc = calTransaction(incomeList?.docs ? incomeList?.docs : []);

  return (
    <>
      {(incLoading || userLoading) ? (
        <LoadingComponent />
      ) : (incAppErr || incServerErr || userAppErr || userServerErr) ? (
        <ErrorDisplayMessage>
          {incServerErr || userServerErr || incAppErr || userAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">
              <div className="pt-8 px-8 mb-8">
                <h6 className="mb-0 fs-3">Recent Income transactions</h6>
                <p className="mb-0">
                  Below is the history of your income transactions records
                </p>
                <Link to="/add-income" className="btn btn-success me-2 m-2">
                  New Income
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Deposited By</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Title</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Description</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Amount</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Date</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Action</small>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                {incomeList?.docs?.length <= 0 ? (
                      <h2>No Expense Found</h2>
                    ) : (
                      incomeList?.docs?.map(inc => (
                        profile?.isAdmin || inc.user === profile?._id ? (
                          <ContentDetails item={inc} key={inc?._id} />
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
        {incomeList?.docs?.length > 1 && (
              <AppPagination
                setPage={setPage}
                items={incomeList?.totalPages}
              />
            )}
            
          </div>
        </section>
      )}
    </>
  );
};

export default IncomeList;
