import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrencyFormatter from "../../../hooks/useCurrencyFormatter";

const UserProfileStats = ({
  avgExp,
  totalExp,
  minExp,
  maxExp,
  numOfTransExp,
  avgInc,
  totalInc,
  minInc,
  maxInc,
  numOfTransInc,
}) => {
  //format curr
  const formattedAmtExp = useCurrencyFormatter("INR", totalExp);
  const formattedAmtInc = useCurrencyFormatter("INR", totalInc);
  //format date
 

  return (
    <section class="py-6">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 mb-6">
            <div class="p-8 border rounded-2">
              <div class="d-flex mb-6 align-items-start justify-content-between">
                <span
                  class="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                  style={{ width: "40px", height: "40px" }}
                ></span>
                {/* Expenses Start */}
                <span class="badge fs-2 bg-light text-danger">Total Expense</span>
              </div>
              <h1 class="mb-4">{formattedAmtExp}</h1>
              <p class="mb-0">
                <span>Number of Transactions:</span>
                <span class="text-danger ms-1">
                  <span>{numOfTransExp}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Minimum Transaction:</span>
                <span class="text-danger ms-1">
                  <span>{`₹`+minExp}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Maximum Transaction:</span>
                <span class="text-danger ms-1">
                  <span>{`₹`+maxExp}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Average Transaction:</span>
                <span class="text-danger ms-1">
                  <span>{`₹`+avgExp}</span>
                </span>
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-6">
            <div class="p-8 border rounded-2">
              <div class="d-flex mb-6 align-items-start justify-content-between">
                <span
                  class="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                  style={{ width: "40px", height: "40px" }}
                ></span>
                {/* Income Start */}
                <span class="badge fs-2 bg-primary-light text-primary">Total Income</span>
              </div>
              <h1 class="mb-4">{formattedAmtInc}</h1>
              <p class="mb-0">
                <span>Number of Transactions:</span>
                <span class="text-danger ms-1">
                  <span>{numOfTransInc}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Minimum Transaction:</span>
                <span class="text-danger ms-1">
                  <span>{`₹`+minInc}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Maximum Transaction:</span>
                <span class="text-danger ms-1">
                  <span>{`₹`+maxInc}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Average Transaction:</span>
                <span class="text-danger ms-1">
                  <span>{`₹`+avgInc}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileStats;
