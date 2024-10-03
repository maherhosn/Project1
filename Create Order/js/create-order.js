const orderForm = document.getElementById("order-form");
const addNewTableButton = document.getElementById("add-new-table");
const submitOrderButton = document.getElementById("submit-order");
const removeSelectedButton = document.getElementById("remove-selected");
const orderTable = document.getElementById("order-table").getElementsByTagName("tbody")[0];
const totalPriceElement = document.getElementById("total-price");



//
window.addEventListener("load", function(){
    const username=this.localStorage.getItem("profileName");
    this.document.getElementById("firstName").textContent=`Customer Name: ${username}`;
    updatePrices();
    disablePastDates();
    setTodaysDate();
})

// Duplicating same row
orderTable.addEventListener("click", function(event) {
    if (event.target && event.target.nodeName === "BUTTON" && event.target.classList.contains('duplicate-row')) {
        event.preventDefault();
        const row = event.target.closest("tr");
        const clonedRow = row.cloneNode(true);
        
        // removing button from cloned row
        const clonedRowButton = clonedRow.querySelector("button.duplicate-row");
        if (clonedRowButton) {
            clonedRowButton.remove();
        }

        // disable ability to edit the cloned values
        const clonedInputs = clonedRow.querySelectorAll("select, input[type='date']");
        clonedInputs.forEach(input => {
            const deliveryDate = input.closest("td").cellIndex === 5;
            if (deliveryDate) {
                input.disabled = false;
            } else {
                input.disabled = true;
            }
        });

        // copying selected values from dropdown list
        const originalValues = row.querySelectorAll("select");
        const clonedValues = clonedRow.querySelectorAll("select");
        originalValues.forEach((select, index) => {
            clonedValues[index].value = select.value;
        });

        // insert cloned row after current
        row.after(clonedRow);
        updatePrices();
    }
});

// adding new default product row
addNewTableButton.addEventListener('click', function(event) {
    event.preventDefault();
    const newRow = createNewProductRow();
    orderTable.appendChild(newRow);
    updatePrices();
    disablePastDates();
});

// submitting the order & store locally
submitOrderButton.addEventListener('click', function(event) {
    event.preventDefault();
    const orderDetails = getOrderDetails();
    if (orderDetails.length > 0) {
        localStorage.setItem('JAM_order', JSON.stringify(orderDetails));
        alert("Order submitted successfully!");
    } else {
        alert("Invalid Order");
    }
});

// remove selected rows
removeSelectedButton.addEventListener("click", function(event) {
    event.preventDefault()
    const checkboxes = orderTable.querySelectorAll(".row-checkbox");
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest("tr");
            row.remove();
        }
    });
    updatePrices();
});

// updating price & total price based on selected product
function updatePrices() {
    const rows = document.querySelectorAll("#order-table tbody tr");
    rows.forEach(row => {
        const productElement = row.querySelector(".product");
        const priceElement = row.querySelector(".price");
        const cost = productElement.options[productElement.selectedIndex]?.dataset.cost;
        if (cost) {
            priceElement.textContent = `$${cost}`;
        } else {
            priceElement.textContent = "$0";
        }
        
    });
    
    const totalPrice = calculateTotalPrice();
    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
}

// updating total price of order
function calculateTotalPrice() {
    const rows = document.querySelectorAll("#order-table tbody tr");
    let total = 0;

    rows.forEach(row => {
        const productElement = row.querySelector(".product");
        const cost = productElement.options[productElement.selectedIndex].dataset.cost;
        total += parseFloat(cost);
    });

    return total;
}

// creating new default row in HTML
function createNewProductRow() {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="checkbox" class="row-checkbox"></td>
        <td>
            <select class="product">
                <option value="Shirt" data-cost="10">Shirt</option>
                <option value="Pants" data-cost="11">Pants</option>
                <option value="Shorts" data-cost="12">Shorts</option>
                <option value="Dress" data-cost="13">Dress</option>
                <option value="Jacket" data-cost="14">Jacket</option>
                <option value="Scarf" data-cost="15">Scarf</option>
                <option value="Hat" data-cost="16">Hat</option>
                <option value="Suit" data-cost="17">Suit</option>
                <option value="Curtain/Drapes" data-cost="18">Curtain/Drapes</option>
                <option value="TableCloth" data-cost="19">TableCloth</option>
                <option value="Pillow" data-cost="20">Pillow</option>
                <option value="Rug" data-cost="21">Rug</option>
                <option value="Towel" data-cost="22">Towel</option>
                <option value="Blanket" data-cost="23">Blanket</option>
                <option value="Jersey" data-cost="24">Jersey</option>
                <option value="Comforter" data-cost="25">Comforter</option>
            </select>
        </td>
        <td>
            <select>
                <option value="Pickup">Pickup</option>
                <option value="Dropoff">Dropoff</option>
            </select>
        </td>
        <td>
            <select>
                <option value="Pickup">Pickup</option>
                <option value="Dropoff">Dropoff</option>
            </select>
        </td>
        <td><input type="date" class="dropoff-date" id="drDate"></td>
        <td><input type="date" class="delivery-date" id="delDate"></td>
        <td><span class="price">$0</span></td>
        <td>
            <button class="duplicate-row">Add Same Item</button>
        </td>
    `;
    const dropoffDateInput = newRow.querySelector('td:nth-child(5) input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dropoffDateInput.value = today;
    newRow.querySelector('.product').addEventListener('change', updatePrices);
    return newRow;
}

// getting all values from each row
function getOrderDetails() {
    const rows = document.querySelectorAll("#order-table tbody tr");
    const orderDetails = [];

    rows.forEach(row => {
        const productElement = row.querySelector('.product');
        const product = productElement.value;
        const cost = productElement.options[productElement.selectedIndex].dataset.cost;
        const preService = row.querySelector('td:nth-child(3) select').value;
        const postService = row.querySelector('td:nth-child(4) select').value;
        const dropoffDate = row.querySelector('td:nth-child(5) input').value;
        const deliveryDate = row.querySelector('td:nth-child(6) input').value;

        if (product && dropoffDate && deliveryDate) {
            orderDetails.push({
                product,
                cost,
                preService,
                postService,
                dropoffDate,
                deliveryDate
            });
        }
    });

    console.log(orderDetails);
    return orderDetails;
}

function disablePastDates() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    dateInputs.forEach(input => {
        input.setAttribute('min', today); // Set the minimum date to today
    });
}

// get todays date in yyy-mm-dd
function setTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formatDate = `${year}-${month}-${day}`;
    // console.log(formatDate);
    document.getElementById("drDate").value = formatDate;
}