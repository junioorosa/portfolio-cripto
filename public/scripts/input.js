let investment = document.querySelector('#investment');
let paidPerUnit = document.querySelector('#paidPerUnit');
let amount = document.querySelector('#amount');

document.querySelectorAll('.onInputAmount').forEach(inputs => {
    inputs.addEventListener('input', () =>{
        if(parseFloat(paidPerUnit.value) >= 0.001){
            let result = (investment.value / paidPerUnit.value);
            amount.value = result;
        }
    });
});

