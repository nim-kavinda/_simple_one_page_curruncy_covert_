const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

//all currencies
app.get('/getAllCurrencies',async(req,res)=>{
    const nameURL=`https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=f911ee6eabc84985aa89f842f2136430`;

    try {
        const nameresponses=await axios.get(nameURL);
        const nameData=nameresponses.data;
        
    
        return res.json(nameData);
    } catch (error) {
        console.error(error)
    }

})

//get the target amount 
app.get("/convert",async(req,res)=>{
    const {
        date,
        sourceCurrency,
        targetCurrency,
        amountInCurrency,
    }=req.query;    
    try {
        const dataUrl=`https://openexchangerates.org/api/historical/${date}.json?app_id=f911ee6eabc84985aa89f842f2136430`;
        const dataResponse=await axios.get(dataUrl);
        const rates=dataResponse.data.rates;

        //rates
        const sourceRate=rates[sourceCurrency];
        const targetrate=rates[targetCurrency];

        //final targert value

        const targertAmount=(targetrate/sourceRate)*amountInCurrency;

        return res.json(targertAmount.toFixed(2));
        
    } catch (error) {
        console.error(error)
    }
})


// listen to a port

app.listen(5000,()=>{
    console.log("SEVER STARTED");
})