import express from "express";
import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";
const cartRouter = express.Router()
cartRouter.post("/addtocart", authMiddleware,addToCart)
cartRouter.post("/getcart",authMiddleware,getCart)
cartRouter.post("/removefromcart",authMiddleware,removeFromCart)

export default cartRouter