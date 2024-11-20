import express from "express"
import authMiddleware from "../middleware/auth.js"
import { PlaceOrder, userOrders, verifyOrder } from "../controllers/orderController.js";
const orderRouter = express.Router()
orderRouter.post("/placeorder",authMiddleware,PlaceOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
export default orderRouter;