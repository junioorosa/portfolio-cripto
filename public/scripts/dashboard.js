document.querySelectorAll('.coin').forEach(coin => {
    coin.addEventListener('click', (element) =>{
        handler.restartInterval();
        let coinName = element.target.value;
        let pairNegotiation = element.target.id;
        handler.matricData(coinName, pairNegotiation);
    }); 
});

function insertMetric(metric){
    document.querySelectorAll('.asset').forEach(e =>{
        e.innerHTML = metric.criptoName;
        e.value = metric.criptoName
    });
    document.querySelector('#investedValue').innerHTML = `${handler.currencyUSD(metric.investment)}`;
    document.querySelector('.quantityPurchased').innerHTML = (metric.amount).toFixed(7);
    document.querySelector('#averagePrice').innerHTML = `${handler.currencyUSD(metric.averagePricePurchase)}`;
    document.querySelector('#averagePriceUSDBRL').innerHTML = `${handler.currencyBRL(metric.averagePriceUSDBRL)}`;
};

function insertAPIdata(currentPrice, profitLossPercentage, profitLossUSD, portfolioValue){
    document.querySelectorAll('.available').forEach(e =>{
        e.innerHTML = `${handler.currencyUSD(portfolioValue)}`;
    })
    document.querySelector('#priceChange').innerHTML = `${handler.currencyUSD(currentPrice)}`;
    document.querySelector('#profitLossPercentage').innerHTML = `${(profitLossPercentage)}%`
    document.querySelector('#profitLossUSD').innerHTML = `${handler.currencyUSD(profitLossUSD)}`;
};

function profitLossBRL(brl){
    document.querySelector('#profitLossBRL').innerHTML = `${handler.currencyBRL(brl)}`;
};

let valueSold = document.querySelector('#valueSold');
let pricePerUnit = document.querySelector('#pricePerUnit');

document.querySelectorAll('.sellingInputs').forEach(inputs =>{
    inputs.addEventListener('input', () =>{
        let available = document.querySelector('#available').textContent.replace('US$', '');
        available = available.replace(',', '.');
        if(parseFloat(valueSold.value) >= 10 && parseFloat(valueSold.value) <= parseFloat(available) && parseFloat(pricePerUnit.value) > 0.001){
            document.querySelector('#soldAmount').value = (valueSold.value / pricePerUnit.value);
        };
    });
});

function priceUp (){
    document.querySelectorAll('.priceVariation').forEach(element =>{
    element.classList.add('greenVariation');
        setTimeout(()=>{
        element.classList.remove('greenVariation');
        }, 5000);
    });
};

function priceDown (){
    document.querySelectorAll('.priceVariation').forEach(element =>{
    element.classList.add('redVariation');
    setTimeout(()=>{
        element.classList.remove('redVariation');
        }, 5000);
    });
};