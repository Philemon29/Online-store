const axios = require('axios')
require('dotenv').config();

const {FLUTTERWAVE_BASE_URL, FLUTTERWAVE_SK_TEST} = process.env;


const initializePayment = async(paymentData) => {
     try{
      const response = await axios.post(
         `${FLUTTERWAVE_BASE_URL}/payments`,
         paymentData,
         {
            headers: {
                 Authorization:   `Bearer ${FLUTTERWAVE_SK_TEST}`,
                 "Content-Type": "application/json"
            } 
         }
      );

      console.log(`the response is ${response}`)

      if(response.data.status !== "success"){
          console.error("FLW INIT FAILED", response.data)
          throw new Error(response.data.message || "Payment initialization failed")
      }

      return response.data
     }catch(error){
        console.error('flw init error', error.response?.data || error)
     }
}


const verifyPayment = async(transactionId) => {
  try {
    const response = await axios.get(
      `${FLUTTERWAVE_BASE_URL}/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SK_TEST}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message
    );
  }
};

module.exports = {initializePayment, verifyPayment}