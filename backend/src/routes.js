const express = require('express')
const multer = require('multer')

const BookingController = require('./controllers/BookingController')
const DashboardController = require('./controllers/DashboardController')
const SessionController = require('./controllers/SessionController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')
const SpotController = require('./controllers/SpotController')

const uploadConfig = require('./config/upload')

const routes = express.Router();
const upload = multer(uploadConfig)

routes.post("/sessions", SessionController.store)

routes.post("/spots", upload.single('thumbnail'), SpotController.store)
routes.get("/spots", SpotController.index)

routes.get("/dashboard", DashboardController.show)

routes.post("/spots/:spot_id/bookings", BookingController.store)
routes.get("/bookings", BookingController.index)

routes.post("/bookings/:booking_id/approvals", ApprovalController.store)

routes.post("/bookings/:booking_id/rejections", RejectionController.store)

module.exports = routes