// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js"
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY )


// //placing user order from frontend
// const placeOrder = async (req , res) => {
//      const frontend_url =" http://localhost:5173"
   
//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address
//         })
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

//         const line_items = req.body.items.map((item)=>({
//             price_data:{
//                 currency: "usd",
//                 product_data: {
//                     name: item.name
//                 },
//                 unit_amount: Math.round(item.price*100)
//             },
//             quantity: item.quantity

//         }))
//         line_items.push({
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: "Delivery Charges"
//                 },
//                 unit_amount: 2*100
//             },
//             quantity:1
//         })

//         // const session = await stripe.checkout.sessions.create({
//         //     line_items: line_items,
//         //     mode:"payment",
//         //     success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//         //     cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
//         // })
//         const session = await stripe.checkout.sessions.create({
//             line_items: line_items,
//             mode:'payment',
//             success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
//         })
//        res.json({success:true,session_url:session.url})
        
       
//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message: "Error"})
//     }


// }

// export {placeOrder}


import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user order for frontend
const PlaceOrder = async (req , res) => {
    const frontend_url = "http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        //clear the usee cart
await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

//stripe payment link
const line_items = req.body.items.map((item)=> ({
    price_data:{
        currency: "inr",
        product_data: {
            name: item.name
        },
        unit_amount: item.price*100*80

    },
    quantity: item.quantity
}))

line_items.push({
    price_data: {
        currency: "inr",
        product_data: {
            name: "delivery Charges"
        },
        unit_amount: 2*100*80
    },
    quantity:1
})
const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
cancel_url: `${frontend_url}/verify?success=false&orderId= ${newOrder._id}`

  
})
res.json({success:true, session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

//temporary verification system

const verifyOrder = async ( req, res) => {
    // const {orderId, success} = req.body;
    // try {
        
    //     if (success=="true") {
    //         await orderModel.findByIdAndUpdate(orderId,{payment:true});
    //         res.json({succes:true, message: "payment done successfully"})
    //     }
    //     else {
    //         await orderModel.findByIdAndDelete(orderId);
    //         res.json({succes:false, message:"payment failed"})
    //     }
    // } catch (error) {
    //     console.log(error)
    //     res.json({success: false, message: "Error"})
        
    // } 
    const {orderId, success} = req.body;
    try {
        if(success=="true") {

        
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
        res.json({success: true, message: "paid"})
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message: "not paid"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
        
    }
}

//user orders for frontend

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success: true, data:orders})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message:"Error"})
        
    }

}
//listing orders for admin panel
const listorders = async ( req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, data:orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
        
    }

}
export {PlaceOrder, verifyOrder, userOrders,listorders}