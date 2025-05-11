import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import DashboardData from "../../../components/Dashboard/DashboardData";
import navigate from "../../../utils/navigate";
import UserProfileStats from "./UserProfileStats";
import DataGraph from "../../../components/Dashboard/DataGrap";
import LoadingComponent from "../../../components/Loading/Loading";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import useCurrencyFormatter from "../../../hooks/useCurrencyFormatter";

const Profile = () => {
  const [expResult, setExpResult] = useState({
    sumTotal: 0,
    avg: 0,
    min: 0,
    max: 0,
    numOfTransactions: 0,
  });
  const [incResult, setIncResult] = useState({
    sumTotal: 0,
    avg: 0,
    min: 0,
    max: 0,
    numOfTransactions: 0,
  });
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  //history
  const history = useHistory();
  const users = useSelector(state => state?.users);
  const { profile, userLoading, userAppErr, userServerErr } = users;

  // Calculate Income and Expenses
  useEffect(() => {
    if (profile?.expenses?.length) {
      const totalExpenses = profile.expenses.reduce((acc, curr) => acc + curr.amount, 0);
      const minExpense = Math.min(...profile.expenses.map(exp => exp.amount));
      const maxExpense = Math.max(...profile.expenses.map(exp => exp.amount));
      const numOfTransactions = profile.expenses.length;
      const avgExpense = totalExpenses / numOfTransactions;

      setExpResult({
        sumTotal: totalExpenses,
        avg: avgExpense,
        min: minExpense,
        max: maxExpense,
        numOfTransactions,
      });
    }

    if (profile?.income?.length) {
      const totalIncome = profile.income.reduce((acc, curr) => acc + curr.amount, 0);
      const minIncome = Math.min(...profile.income.map(inc => inc.amount));
      const maxIncome = Math.max(...profile.income.map(inc => inc.amount));
      const numOfTransactions = profile.income.length;
      const avgIncome = totalIncome / numOfTransactions;

      setIncResult({
        sumTotal: totalIncome,
        avg: avgIncome,
        min: minIncome,
        max: maxIncome,
        numOfTransactions,
      });
    }
  }, [profile]);
   
  const netProfit = incResult.sumTotal-expResult.sumTotal;
  const formattedNetProfit = useCurrencyFormatter("INR", netProfit);
  return (
    <>
      {userLoading ? (
        <LoadingComponent />
      ) : userAppErr || userServerErr ? (
        <ErrorDisplayMessage>
          {userServerErr} {userAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-5">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <div className="d-flex mb-6 align-items-center">
                <img
                  className="img-fluid me-4 rounded-2"
                  src="https://images.unsplash.com/photo-1593789382576-54f489574d26?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=faces&amp;cs=tinysrgb&amp;fit=crop&amp;h=128&amp;w=128"
                  alt=""
                />
                <div>
                  <h6 className="fw-bold mb-0">
                    <span>
                      {profile?.firstname} {profile?.lastname}
                    </span>
                    <span className="badge ms-2 bg-primary-light text-primary">
                      {expResult.numOfTransactions + incResult.numOfTransactions}{" "}
                      Records Created
                    </span>
                  </h6>
                  <p className="mb-0">{profile?.email}</p>
                  <p className="mb-0">Date Joined: 12-Jan-1999</p>
                  <button
                    onClick={() => navigate(history, "update-profile", profile)}
                    className="btn"
                  >
                    Edit Profile
                    <i className="bi bi-pen fs-3 m-3 text-primary"></i>
                  </button>
                </div>
                <DataGraph
                  income={incResult.sumTotal}
                  expenses={expResult.sumTotal}
                />
              </div>
              <div style={{ textAlign: "center", margin: "20px" }}>
          <h2 className="text-success">Net Profit : {formattedNetProfit}</h2>
        </div>
              <UserProfileStats
                numOfTransExp={expResult.numOfTransactions}
                avgExp={expResult.avg}
                totalExp={expResult.sumTotal}
                minExp={expResult.min}
                maxExp={expResult.max}
                numOfTransInc={incResult.numOfTransactions}
                avgInc={incResult.avg}
                totalInc={incResult.sumTotal}
                minInc={incResult.min}
                maxInc={incResult.max}
              />
              <div className="d-flex align-items-center justify-content-center">
                <button
                  onClick={() => navigate(history, "user-profile-expenses", "")}
                  className="btn me-4 w-100 btn-danger d-flex align-items-center justify-content-center"
                >
                  <span>View Expenses History</span>
                </button>
                <button
                  onClick={() => navigate(history, "user-profile-income", "")}
                  className="btn w-100 btn-outline-success d-flex align-items-center justify-content-center"
                >
                  <span>View Income History</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
