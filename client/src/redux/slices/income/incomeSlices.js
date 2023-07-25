import { createSlice } from "@reduxjs/toolkit";
import {
  addNewIncomeAction,
  deleteIncomeAction,
  fetchIncomesAction,
  fetchIncomeAction,
  resetIncCreated,
  resetIncomeDeleted,
  resetIncomeUpdated,
  updateIncomeAction,
} from "./incomeAction";

//--------------
//slices
//--------------
const incomeSlices = createSlice({
  name: "income",
  initialState: {},
  extraReducers: builder => {
    //create
    builder.addCase(addNewIncomeAction.pending, (state, action) => {
      state.incLoading = true;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(resetIncCreated, (state, action) => {
      state.isIncCreated = true;
    });
    builder.addCase(addNewIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incCreated = action?.payload;
      state.incAppErr = undefined;
      state.incincServerErr = undefined;
      state.isIncCreated = false;
    });
    builder.addCase(addNewIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.message;
      state.incincServerErr = action?.error?.message;
    });

    //fetch all
    builder.addCase(fetchIncomesAction.pending, (state, action) => {
      state.incLoading = true;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(fetchIncomesAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incomeList = action?.payload;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(fetchIncomesAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.message;
      state.incServerErr = action?.error?.message;
    });

    //fetch single
    builder.addCase(fetchIncomeAction.pending, (state, action) => {
      state.incLoading = true;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(fetchIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incomeDetails = action?.payload;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(fetchIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.message;
      state.incServerErr = action?.error?.message;
    });

    //Delete
    builder.addCase(deleteIncomeAction.pending, (state, action) => {
      state.incLoading = true;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(resetIncomeDeleted, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.isDeleted = false;
      state.incomeDeleted = action?.payload;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(deleteIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.message;
      state.incServerErr = action?.error?.message;
    });

    //Update
    builder.addCase(updateIncomeAction.pending, (state, action) => {
      state.incLoading = true;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(resetIncomeUpdated, (state, action) => {
      state.isIncUpdated = true;
    });
    builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incomeUpdated = action?.payload;
      state.isIncUpdated = false;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(updateIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.message;
      state.incServerErr = action?.error?.message;
    });
  },
});

export default incomeSlices.reducer;
