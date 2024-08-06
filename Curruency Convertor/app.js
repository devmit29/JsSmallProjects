const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const BaseURL2 = "https://v6.exchangerate-api.com/v6/6a7b30e96c9f0bee6028c285/latest/";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".submit");
const fromCurr = document.querySelector(".From select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector("form .msg");

for (let select of dropdowns) {
    for (code in countryList) {
        let newOption = document.createElement("option");
        newOption.value = code;
        newOption.textContent = code;
        if (code === "USD" && select.name === "from") {
            newOption.selected = true;
        } else if (code === "INR" && select.name === "to") {
            newOption.selected = true;
        }
        select.append(newOption);

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".Amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal <= 0) {
        amtVal = 0;
        amount.value = "0";
    }
    let URL = `${BaseURL2}${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json(); 

    let convertcurreny = toCurr.value;
    let exchangeRates = data.conversion_rates;
    let exchangeRate = exchangeRates[convertcurreny];
    let finalAmount = amtVal * exchangeRate;
    let finalAmt = finalAmount.toFixed(2);
    
    msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    amount.value = amtVal;


    // Old API

    // let URL = `${BaseURL}/${fromCurr.value.toLowerCase()}.json`;

    // let response = await fetch(URL);
    // let data = await response.json();
    // let exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    // let finalAmount = amtVal * exchangeRate;
    // let finalAmt = finalAmount.toFixed(2);
    
    // msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    // amount.value = amtVal;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener(("click"), (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})

