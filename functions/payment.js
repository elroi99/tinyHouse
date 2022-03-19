
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

exports.handler =  async ( event , context ) => {
    let { amount , id } = req.body;
    try{
    const payment = await stripe.paymentIntents.create({
        amount,
        currency : "USD",
        description : "rent",
        payment_method :  id,
        confirm : true
        })
    console.log("Payment" , payment);
    return ({
        statusCode : 200,
        body : JSON.stringify({
            message : "Payment successful",
            success : true,
        })
    })
    
    }catch(error){
        console.log("Error" , error);
        return ({
            statusCode : 404,
            body : JSON.stringify({
                message : "Payment failed",
                success : false,
            })
        })
    }
}
