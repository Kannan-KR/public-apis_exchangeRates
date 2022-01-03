// Div to display all the fetched items
const displayRatesDiv = document.querySelector(".display-rates");

// Get data from API and call other functions from here
const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const requestedData = data.rates;
    searchCurrency(requestedData);
    displayRatesDiv.innerHTML = "";
    for (const [key, value] of Object.entries(requestedData)) {
      displayRates(key, value);
    }
  } catch (error) {
    console.log(error);
  }
};

const baseRateList = async () => {
  const options = document.getElementById("currency");
  options.innerHTML = "";
  try {
    const response = await fetch("https://api.exchangerate.host/latest");
    const data = await response.json();
    const currencies = data.rates;
    for (curr of Object.keys(currencies)) {
      options.innerHTML += `
        <option class="dropdown-item" value="${curr}">${curr}</option>
        `;
    }
    baseChange(document.getElementById("currency").selectedOptions);
  } catch (error) {
    console.log(error);
  }
};

baseRateList();

const displayRates = (currency, rate) => {
  displayRatesDiv.innerHTML += `
  <div class="disp-box border border-dark rounded-3 bg-info bg-gradient bg-opacity-10">
  <h4>${currency}</h4>
  <h6>${rate}</h6>
  </div>
  `;
};

async function baseChange(selected) {
  const selectedCurr = selected[0].value;
  await getData("https://api.exchangerate.host/latest/?base=" + selectedCurr);
  document.getElementById("search-currency").value = "";
}

const searchCurrency = async (dataAll) => {
  let searchbox = document.getElementById("search-currency");
  searchbox.addEventListener("keyup", () => {
    let enteredText = searchbox.value;
    if (enteredText !== "") {
      displayRatesDiv.innerHTML = "";
      for (const [key, value] of Object.entries(dataAll)) {
        if (key.startsWith(enteredText.toUpperCase())) {
          displayRates(key, value);
        }
      }
    } else {
      displayRatesDiv.innerHTML = "";
      for (const [key, value] of Object.entries(dataAll)) {
        displayRates(key, value);
      }
    }
  });
};
