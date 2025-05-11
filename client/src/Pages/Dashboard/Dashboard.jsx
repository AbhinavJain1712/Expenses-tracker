import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardData from "../../components/Dashboard/DashboardData";
import LoadingComponent from "../../components/Loading/Loading";
import { fetchAccountStatsAction } from "../../redux/slices/accountStats/accountStatsSlices";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, [dispatch]); // Add dispatch to the dependency array

  const statistics = useSelector(state => state.statistics);
  const { statsLoading, appErr, serverErr, stats } = statistics;
  console.log({ statsLoading, appErr, serverErr, stats });

  // Access the first element of each stats array
  const exp = stats?.expenseStats?.[0] || {};
  const inc = stats?.incomeStats?.[0] || {};

  return (
    <>
      {statsLoading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <div className="alert alert-danger" role="alert">
          {serverErr} {appErr}
        </div>
      ) : (
        <>
          <DashboardData
            avgExp={exp?.averageExp || 0}
            totalExp={exp?.totalExp || 0}
            minExp={exp?.minExp || 0}
            maxExp={exp?.maxExp || 0}
            numOfTransExp={exp?.totalRecordsExp || 0}
            avgInc={inc?.averageIncome || 0}
            totalInc={inc?.totalIncome || 0}
            minInc={inc?.minIncome || 0}
            maxInc={inc?.maxIncome || 0}
            numOfTransInc={inc?.totalRecordsIncome || 0}
            netProfit={(inc?.totalIncome || 0) - (exp?.totalExp || 0)}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
