// <!-- The following  documents were referenced to write the below code:
//  - FSF-FT-EAST-SEPTEMBER => 02-Advanced-CSS => -01-Challenge => Assets => style.css
//  - Code with collegues Jaakob and Adam
//  miro website for wireframe reference: https://miro.com/app/board/uXjVLYxdWE0=/
//   -->

// Identify the global variables and elements
const aTBody = document.querySelector('#aTBody');
const viewActiveOrders = document.getElementById("activeOrderButton");
const viewPastOrders = document.getElementById("pastOrdersButton");


// Function load Active List will read from local storage and load the items on the page inside a table 
function loadActiveList() {
  storedData = JSON.parse(localStorage.getItem('JAM_order'));
  var savedData = [];
  tempData = JSON.parse(localStorage.getItem('JAM_completed'));
  
  if (tempData !== null) {
    savedData = tempData;
  }
  
  if (storedData !== null) {
    tempStorageObject = storedData;

    for (let i = 0; i < tempStorageObject.length; i++) {
      
      let tableRow = document.createElement("tr");
      tableRow.id = `row${i}`;
      aTBody.appendChild(tableRow);
      
      let rowCell = document.getElementById(`row${i}`);
      
      let product = document.createElement("th");
      product.textContent = tempStorageObject[i].product;;
      
      let cost = document.createElement("th");
      cost.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(tempStorageObject[i].cost);
      
      let preService = document.createElement("th");
      preService.textContent = tempStorageObject[i].preService;
     
      let postService = document.createElement("th");
      postService.textContent = tempStorageObject[i].postService;
     
      let dropoffDate = document.createElement("th");
      dropoffDate.textContent = tempStorageObject[i].dropoffDate;;
     
      let deliveryDate = document.createElement("th");
      deliveryDate.textContent = tempStorageObject[i].deliveryDate;;

      tableRow.appendChild(product);
      tableRow.appendChild(dropoffDate);

      // this is the status calls a function to return certain values
      let status = document.createElement("th");
      let statusText = checkOrderStatus(tempStorageObject[i].deliveryDate)
      status.textContent = statusText;

      tableRow.appendChild(status);
      tableRow.appendChild(deliveryDate);
      tableRow.appendChild(cost);

      // This will populate a button once the item / product is complete and ready for pickup
      if (statusText == "Completed") {

        let completeBtn = document.createElement("button");
        completeBtn.id = "completedButton";
        completeBtn.textContent = "Picked up?"
        tableRow.appendChild(completeBtn);

        //The button function that will move the item from one local storage and put it in another
        // logic for removing this order from JAM_order
        // adding this order to the JAM_completed
        completeBtn.addEventListener("click", function () {

          let userChoice = window.confirm(`Can you confirm that you recieved the ${tempStorageObject[i].product} item?`);
          pValue = tempStorageObject[i].product;
          costValue = tempStorageObject[i].cost;
          drDateValue = tempStorageObject[i].dropoffDate;
          dDateValue = tempStorageObject[i].deliveryDate;
          statusText = checkOrderStatus(tempStorageObject[i].deliveryDate)

          //Push the data to the completed orders local data store.
          if (userChoice) {
            savedData.push({
              pValue,
              drDateValue,
              statusText,
              dDateValue,
              costValue
            });
            
            localStorage.setItem('JAM_completed', JSON.stringify(savedData));
            storedData.splice(i, 1);
            console.log("I am loggin this piece" + JSON.stringify(storedData));
            localStorage.setItem('JAM_order', JSON.stringify(storedData));
            window.location.reload();
          }

        })
      }
    }
  }
}

// Function load Completed/Fullfiled service List will read from local storage and load the items on the page inside a table 
function loadCompletedList() {

  savedList = JSON.parse(localStorage.getItem('JAM_completed'));
  
  if (savedList !== null) {
  
    tempStorageItem = savedList;

    for (let i = 0; i < tempStorageItem.length; i++) {
  
      let tableRow = document.createElement("tr");
      tableRow.id = `row${i}`;
      pTBody.appendChild(tableRow);
  
      let rowCell = document.getElementById(`row${i}`);

      let cProduct = document.createElement("th");
      cProduct.textContent = tempStorageItem[i].pValue;

      let cCost = document.createElement("th");
      cCost.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(tempStorageItem[i].costValue);

      let cStatus = document.createElement("th");
      cStatus.textContent = tempStorageItem[i].statusText;

      let drDate = document.createElement("th");
      drDate.textContent = tempStorageItem[i].drDateValue;;

      let delDate = document.createElement("th");
      delDate.textContent = tempStorageItem[i].dDateValue;;


      tableRow.appendChild(cProduct);
      tableRow.appendChild(drDate);
      tableRow.appendChild(cStatus);
      tableRow.appendChild(delDate);
      tableRow.appendChild(cCost);
    }
  }
}

// This button feature generates the data in the active orders table (table is hidden by default)
viewActiveOrders.addEventListener('click', function () {
  loadActiveList();
  document.querySelector("#aTFoot").textContent = calculateActiveTotalPrice();
});

// This button feature generates the data in the complted orders table (table is hidden by default)
viewPastOrders.addEventListener('click', function () {
  loadCompletedList();
  document.querySelector("#pTFoot").textContent = calculateCompletedTotalPrice();
});


// Function to calculate the total price in the active table and add the $ symbol to it.
function calculateActiveTotalPrice() {
  const rows = document.querySelectorAll("#aTBody tr th:nth-of-type(5)");
  console.log(rows);
  let total = 0;

  rows.forEach(row => {
    var cost = row.textContent;
    if (cost != "") {
      total += parseFloat(cost.replaceAll("$", ""));
    }
  });

  total = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total);

  return total;
}


// Function to calculate the total price in the completed table and add the $ symbol to it.
function calculateCompletedTotalPrice() {
  const rows = document.querySelectorAll("#pTBody tr th:nth-of-type(5)");
  console.log(rows);
  let total = 0;

  rows.forEach(row => {
    var cost = row.textContent;
    if (cost != "") {
      total += parseFloat(cost.replaceAll("$", ""));
    }
  });

  total = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total);

  return total;
}

// function to return the status of the order based on the date of delivery
function checkOrderStatus(dueDate) {
  const todayDate = Date.now();
  const checkDate = new Date(dueDate);

  if (todayDate >= checkDate) {
    return ("Completed");
  }
  else {
    return ("In Progress")
  }

}
