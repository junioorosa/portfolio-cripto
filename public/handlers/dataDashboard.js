let handler = {
    priceUSDBRL: 'https://economia.awesomeapi.com.br/last/USD-BRL',
    coins: 'https://api.binance.com/api/v3/ticker/price?symbols=[%22BTCUSDT%22,%22ETHUSDT%22]',
    db: '/dashboard/coin',
    updatePortfolio: null,

    currencyUSD: function(number){
    return new Intl.NumberFormat('us-IN', {style:'currency', currency:'USD'}).format(number);
    },

    currencyBRL: function(number){
    return new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(number);
    },
    
    matricData: function (coinName, pairNegotiation) {
        fetch(this.db).then(res => res.json()).then(metricDB => {
                let quantityPurchased = 0;
                let investedValue = 0;
                let averagePriceUSDBRL = 0;
            JSON.parse(metricDB).forEach(cripto => {
                if(cripto.criptoName == coinName){
                    insertMetric(cripto);
                    quantityPurchased = cripto.amount;
                    investedValue = cripto.investment;
                    averagePriceUSDBRL = cripto.averagePriceUSDBRL
                };
            });
            this.APIdataCalc(pairNegotiation, quantityPurchased, investedValue, averagePriceUSDBRL);
            this.updatePortfolio = setInterval(() => {
                this.APIdataCalc(pairNegotiation, quantityPurchased, investedValue, averagePriceUSDBRL);
            }, 10000);
        });
    },
    
    APIdataCalc: function (pairNegotiation, quantityPurchased, investedValue, averagePriceUSDBRL) {
        fetch(this.coins).then(res => res.json()).then(coins =>{
            let currentPrice = 0;
            coins.forEach(coin => {
                if(coin.symbol == pairNegotiation){
                    currentPrice = coin.price;
                };
            });
            let portfolioValue = (quantityPurchased * currentPrice);
            let profitLossUSD = (portfolioValue - investedValue);
            let profitLossPercentage = ((profitLossUSD / investedValue) * 100).toFixed(2);
    
            insertAPIdata(currentPrice, profitLossPercentage, profitLossUSD, portfolioValue);
            this.fiatCurrencyBRL(investedValue, averagePriceUSDBRL, portfolioValue);
            this.priceVariation(currentPrice);
        });
    },

    price: [],
    priceVariation: function (currentPrice){
        this.price.push(currentPrice);
        if(this.price.length == 2){
            let calc = (this.price[1] - this.price[0]);
            this.price.splice(0,1);
            if(calc >= 0){
                priceUp();
            }else{
                priceDown();
            };
        };
    },

    fiatCurrencyBRL: function (investedValue, averagePriceUSDBRL, portfolioValueUSD) {         
        fetch(this.priceUSDBRL).then(res => res.json()).then(priceBRL => {
            profitLossBRL(((portfolioValueUSD * parseFloat(priceBRL.USDBRL.ask)) - (investedValue * averagePriceUSDBRL)));
        });
    },

    restartInterval: function (){
        clearInterval(this.updatePortfolio);
        this.price = [];
    },
}
