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
      tableRow.appendChild(preService);
      tableRow.appendChild(deliveryDate);
      tableRow.appendChild(cost);
    }
  }
}

//  ? We create an event listener for the image URL input field. This will create an image element and attach it to the mood board with the URL provided by the user.
viewActiveOrders.addEventListener('click', function () {
loadFromLocalStorage();
});
