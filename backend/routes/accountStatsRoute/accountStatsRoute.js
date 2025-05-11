const express = require("express");
const accountStatsCtrl = require("../../controllers/accountStatsCtrl/accountStatsCtrl");

const accountStatsRoute = express.Router();


accountStatsRoute.get('/stats',accountStatsCtrl)

module.exports = accountStatsRoute;