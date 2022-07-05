let handle = {
    newDoc: {},
    updateDoc: {},

    newInvestiment: function (criptoHistoric, criptoMetric){
        if(criptoMetric == null){
            this.newMetricDoc(criptoHistoric);
        }
        else{
            this.updateMetricDoc(criptoHistoric, criptoMetric);
        }
    },
    
    newMetricDoc: function (criptoHistoric){
        this.newDoc.criptoName = criptoHistoric.criptoName;
        this.newDoc.investment = criptoHistoric.investment;
        this.newDoc.amount = criptoHistoric.amount;
        this.newDoc.averagePricePurchase = criptoHistoric.paidPerUnit;
        this.newDoc.averagePriceUSDBRL = criptoHistoric.dolarReal;
    },

    updateMetricDoc: function (criptoHistoric, criptoMetric){
        let investment = 0;
        let amount = 0;
        let calcUSDBRL = (criptoMetric.averagePriceUSDBRL * criptoMetric.investment);
        
        if(criptoHistoric.criptoName == criptoMetric.criptoName){
            investment = (criptoHistoric.investment + criptoMetric.investment);
            amount = (criptoHistoric.amount + criptoMetric.amount);
            calcUSDBRL += (criptoHistoric.dolarReal * criptoHistoric.investment);
        }

        let averagePricePurchase = (investment / amount);
        let averagePriceUSDBRL = (calcUSDBRL / investment);

        this.updateDoc._id = criptoMetric._id;
        this.updateDoc.criptoName = criptoMetric.criptoName;
        this.updateDoc.investment = investment;
        this.updateDoc.amount = amount;
        this.updateDoc.averagePricePurchase = averagePricePurchase;
        this.updateDoc.averagePriceUSDBRL = averagePriceUSDBRL;
    }, 
}

module.exports = {handle};