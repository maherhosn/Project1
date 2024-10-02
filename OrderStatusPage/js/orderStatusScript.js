// <!-- The following  documents were referenced to write the below code:
//  - FSF-FT-EAST-SEPTEMBER => 02-Advanced-CSS => -01-Challenge => Assets => style.css
//  - Code with collegues Jaakob and Adam
//  miro website for wireframe reference: https://miro.com/app/board/uXjVLYxdWE0=/
//   -->

// ? Grab all the references to the DOM elements
const aTBody = document.querySelector('#aTBody');
const viewActiveOrders = document.getElementById("activeOrderButton");
const pastOrders = document.getElementById("pastOrdersButton");


// ? Function to load from local storage. This function will be called on page load.
function loadFromLocalStorage() {
  // TODO: Load and parse the data from local storage and paint the images and text on the mood board
  storedData = JSON.parse(localStorage.getItem('JAM_order'));
  if (storedData !== null) {
    tempStorageObject = storedData;
    console.log(tempStorageObject);
    // Paint the stored images on mood board
    for (let i = 0; i < tempStorageObject.length; i++) {
      let tableRow = document.createElement("tr");
      tableRow.id=`row${i}`;
      aTBody.appendChild(tableRow);
      let rowCell = document.getElementById(`row${i}`);
      let product = document.createElement("th");
      product.textContent = tempStorageObject[i].product;
      let cost = document.createElement("th");
      cost.textContent = tempStorageObject[i].cost;
      let preService= document.createElement("th");
      preService.textContent = tempStorageObject[i].preService;
      let postService = document.createElement("th");
      postService.textContent = tempStorageObject[i].postService;
      let dropoffDate = document.createElement("th");
      dropoffDate.textContent = tempStorageObject[i].dropoffDate;
      let deliveryDate = document.createElement("th");
      deliveryDate.textContent = tempStorageObject[i].deliveryDate;
      console.log(""+product +dropoffDate +preService +deliveryDate +cost);
      tableRow.appendChild(product);
      tableRow.appendChild(dropoffDate);

      // this is the status
      let status = document.createElement("th");
      let statusText = checkOrderStatus(tempStorageObject[i].deliveryDate)
      status.textContent = statusText;
      tableRow.appendChild(status);

      tableRow.appendChild(deliveryDate);
      tableRow.appendChild(cost);

      if(statusText == "Completed") {
        let completeBtn = document.createElement("button");
        completeBtn.textContent = "Picked up?"
        completeBtn.addEventListener("click", function() {
          // logic for removing this order from JAM_order
          // adding this order to the completed order
        })
        tableRow.appendChild(completeBtn);
      }

    }
  }
}

//  ? We create an event listener for the image URL input field. This will create an image element and attach it to the mood board with the URL provided by the user.
viewActiveOrders.addEventListener('click', function () {
loadFromLocalStorage();
document.querySelector("#aTFoot").textContent = calculateActiveTotalPrice();
});

function calculateActiveTotalPrice() {
  const rows = document.querySelectorAll("#aTBody tr th:last-child");
  console.log(rows);
  let total = 0;

  rows.forEach(row => {
      var cost=row.textContent;
      if(cost != "")
      {
        total += parseFloat(cost);
      }
  });

  return total;
}

function checkOrderStatus(dueDate) {
  const todayDate = Date.now();
  const checkDate = new Date(dueDate);

  if(todayDate >= checkDate){
    return ("Completed");
  }
  else {
    return ("In Progress")
  }

}
