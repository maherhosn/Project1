const orderForm = document.getElementById("order-form");
const addNewTableButton = document.getElementById("add-new-table");
const submitOrderButton = document.getElementById("submit-order");
const orderTable = document.getElementById("order-table").getElementsByTagName("tbody")[0];

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

        // copying selected values from dropdown list
        const originalValues = row.querySelectorAll("select");
        const clonedValues = clonedRow.querySelectorAll("select");
        originalValues.forEach((select, index) => {
            clonedValues[index].value = select.value;
        });

        // insert cloned row after current
        row.after(clonedRow);
    }
});

// adding new default product row
addNewTableButton.addEventListener('click', function(event) {
    event.preventDefault();
    const newRow = createNewProductRow();
    orderTable.appendChild(newRow);
});

// submitting the order / store locally
submitOrderButton.addEventListener('click', function(event) {
    event.preventDefault();
    const orderDetails = getOrderDetails();
    if (orderDetails.length > 0) {
        localStorage.setItem('JAM_order', JSON.stringify(orderDetails));
        alert("Order submitted successfully!");
    } else {
        alert("Please add at least one product before submitting the order.");
    }
})

// creating new default row in HTML
function createNewProductRow() {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
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
        <td><input type="date"></td>
        <td><input type="date"></td>
        <td><span>$</span></td>
        <td>
            <button class="duplicate-row">Add Same Item</button>
        </td>
    `;
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
        const preService = row.querySelector('td:nth-child(2) select').value;
        const postService = row.querySelector('td:nth-child(3) select').value;
        const dropoffDate = row.querySelector('td:nth-child(4) input').value;
        const deliveryDate = row.querySelector('td:nth-child(5) input').value;

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

    // console.log(orderDetails);
    return orderDetails;
}