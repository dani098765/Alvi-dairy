document.addEventListener("DOMContentLoaded", () => {
  const saleRecords = [];

  const contentArea = document.getElementById("sale-content-display-area");

  // Render All Sale Records
  function renderAllSaleRecords() {
    if (saleRecords.length === 0) {
      contentArea.innerHTML = `<h3>No Sale Records Found</h3>`;
      return;
    }

    contentArea.innerHTML = `
      <h3>All Sale Records</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Buyer Name</th>
            <th>Quantity (Liters)</th>
            <th>Price Per Liter</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${saleRecords
            .map(
              (record, index) =>
                `<tr>
                  <td>${record.date}</td>
                  <td>${record.buyerName}</td>
                  <td>${record.quantity}</td>
                  <td>${record.pricePerLiter}</td>
                  <td>${record.totalAmount}</td>
                  <td>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                  </td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;

    // Add event listeners for Edit and Delete buttons
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        renderEditSaleRecord(index);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        saleRecords.splice(index, 1);
        alert("Record deleted successfully!");
        renderAllSaleRecords(); // Refresh the table
      });
    });
  }

  // Render Add Sale Record Form
  function renderAddSaleRecord() {
    contentArea.innerHTML = `
      <h3>Add Sale Record</h3>
      <div>
        <label>Date of Sale:</label>
        <input type="date" id="sale-date">
        <label>Buyer Name:</label>
        <input type="text" id="sale-buyer-name">
        <label>Quantity Sold (Liters):</label>
        <input type="number" id="sale-quantity" min="0" step="0.1">
        <label>Price Per Liter:</label>
        <input type="number" id="sale-price" min="0" step="0.1">
        <label>Total Amount:</label>
        <input type="number" id="sale-total-amount" readonly>
        <button id="save-sale-record-btn">Save Record</button>
      </div>
    `;

    const quantityField = document.getElementById("sale-quantity");
    const priceField = document.getElementById("sale-price");
    const totalField = document.getElementById("sale-total-amount");

    // Automatically calculate Total Amount
    function calculateTotalAmount() {
      const quantity = parseFloat(quantityField.value) || 0;
      const price = parseFloat(priceField.value) || 0;
      totalField.value = (quantity * price).toFixed(2);
    }

    quantityField.addEventListener("input", calculateTotalAmount);
    priceField.addEventListener("input", calculateTotalAmount);

    document
      .getElementById("save-sale-record-btn")
      .addEventListener("click", () => {
        const date = document.getElementById("sale-date").value;
        const buyerName = document.getElementById("sale-buyer-name").value;
        const quantity = parseFloat(quantityField.value);
        const pricePerLiter = parseFloat(priceField.value);
        const totalAmount = parseFloat(totalField.value);

        if (!date || !buyerName || isNaN(quantity) || quantity <= 0 || isNaN(pricePerLiter) || pricePerLiter <= 0) {
          alert("Please fill in all fields with valid data!");
          return;
        }

        saleRecords.push({ date, buyerName, quantity, pricePerLiter, totalAmount });
        alert("Sale record added successfully!");
        renderAllSaleRecords(); // Refresh the table with new records
      });
  }

  // Render Edit Sale Record Form
  function renderEditSaleRecord(index) {
    const record = saleRecords[index];

    contentArea.innerHTML = `
      <h3>Edit Sale Record</h3>
      <div>
        <label>Date of Sale:</label>
        <input type="date" id="sale-date" value="${record.date}">
        <label>Buyer Name:</label>
        <input type="text" id="sale-buyer-name" value="${record.buyerName}">
        <label>Quantity Sold (Liters):</label>
        <input type="number" id="sale-quantity" min="0" step="0.1" value="${record.quantity}">
        <label>Price Per Liter:</label>
        <input type="number" id="sale-price" min="0" step="0.1" value="${record.pricePerLiter}">
        <label>Total Amount:</label>
        <input type="number" id="sale-total-amount" readonly value="${record.totalAmount}">
        <button id="update-sale-record-btn">Update Record</button>
      </div>
    `;

    const quantityField = document.getElementById("sale-quantity");
    const priceField = document.getElementById("sale-price");
    const totalField = document.getElementById("sale-total-amount");

    function calculateTotalAmount() {
      const quantity = parseFloat(quantityField.value) || 0;
      const price = parseFloat(priceField.value) || 0;
      totalField.value = (quantity * price).toFixed(2);
    }

    quantityField.addEventListener("input", calculateTotalAmount);
    priceField.addEventListener("input", calculateTotalAmount);

    document
      .getElementById("update-sale-record-btn")
      .addEventListener("click", () => {
        const date = document.getElementById("sale-date").value;
        const buyerName = document.getElementById("sale-buyer-name").value;
        const quantity = parseFloat(quantityField.value);
        const pricePerLiter = parseFloat(priceField.value);
        const totalAmount = parseFloat(totalField.value);

        if (!date || !buyerName || isNaN(quantity) || quantity <= 0 || isNaN(pricePerLiter) || pricePerLiter <= 0) {
          alert("Please fill in all fields with valid data!");
          return;
        }

        saleRecords[index] = { date, buyerName, quantity, pricePerLiter, totalAmount };
        alert("Sale record updated successfully!");
        renderAllSaleRecords(); // Refresh the table with updated records
      });
  }

  // Event Listeners for Buttons
  document
    .getElementById("add-sale-record-btn")
    .addEventListener("click", renderAddSaleRecord);
  document
    .getElementById("show-sale-records-btn")
    .addEventListener("click", renderAllSaleRecords);

  // Initial Render
  renderAllSaleRecords();
});
