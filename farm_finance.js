document.addEventListener("DOMContentLoaded", () => {
  const financeRecords = [];

  const contentArea = document.getElementById("finance-content-display-area");

  // Calculate Financial Summary
  function calculateSummary() {
    const totalIncome = financeRecords
      .filter((record) => record.type === "Income")
      .reduce((sum, record) => sum + record.amount, 0);
    const totalExpenses = financeRecords
      .filter((record) => record.type === "Expense")
      .reduce((sum, record) => sum + record.amount, 0);
    const netBalance = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, netBalance };
  }

  // Render Financial Summary
  function renderFinancialSummary() {
    const { totalIncome, totalExpenses, netBalance } = calculateSummary();

    return `
      <div class="finance-summary">
        <h4>Financial Summary</h4>
        <p>Total Income: $${totalIncome.toFixed(2)}</p>
        <p>Total Expenses: $${totalExpenses.toFixed(2)}</p>
        <p>Net Balance: $${netBalance.toFixed(2)}</p>
      </div>
    `;
  }

  // Render All Finance Records
  function renderAllFinanceRecords() {
    if (financeRecords.length === 0) {
      contentArea.innerHTML = `<h3>No Finance Records Found</h3>`;
      return;
    }

    contentArea.innerHTML = `
      <h3>All Finance Records</h3>
      ${renderFinancialSummary()}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${financeRecords
            .map(
              (record, index) =>
                `<tr>
                  <td>${record.date}</td>
                  <td>${record.type}</td>
                  <td>${record.description}</td>
                  <td>${record.amount.toFixed(2)}</td>
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
        renderEditFinanceRecord(index);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        financeRecords.splice(index, 1);
        alert("Record deleted successfully!");
        renderAllFinanceRecords(); // Refresh the table
      });
    });
  }

  // Render Add Finance Record Form
  function renderAddFinanceRecord() {
    contentArea.innerHTML = `
      <h3>Add Finance Record</h3>
      <div>
        <label>Date:</label>
        <input type="date" id="finance-date">
        <label>Type:</label>
        <select id="finance-type">
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <label>Description:</label>
        <input type="text" id="finance-description">
        <label>Amount:</label>
        <input type="number" id="finance-amount" min="0" step="0.01">
        <button id="save-finance-record-btn">Save Record</button>
      </div>
    `;

    document
      .getElementById("save-finance-record-btn")
      .addEventListener("click", () => {
        const date = document.getElementById("finance-date").value;
        const type = document.getElementById("finance-type").value;
        const description = document.getElementById("finance-description").value;
        const amount = parseFloat(document.getElementById("finance-amount").value);

        if (!date || !type || !description || isNaN(amount) || amount <= 0) {
          alert("Please fill in all fields with valid data!");
          return;
        }

        financeRecords.push({ date, type, description, amount });
        alert("Finance record added successfully!");
        renderAllFinanceRecords(); // Refresh the table with new records
      });
  }

  // Render Edit Finance Record Form
  function renderEditFinanceRecord(index) {
    const record = financeRecords[index];

    contentArea.innerHTML = `
      <h3>Edit Finance Record</h3>
      <div>
        <label>Date:</label>
        <input type="date" id="finance-date" value="${record.date}">
        <label>Type:</label>
        <select id="finance-type">
          <option value="Income" ${record.type === "Income" ? "selected" : ""}>Income</option>
          <option value="Expense" ${record.type === "Expense" ? "selected" : ""}>Expense</option>
        </select>
        <label>Description:</label>
        <input type="text" id="finance-description" value="${record.description}">
        <label>Amount:</label>
        <input type="number" id="finance-amount" min="0" step="0.01" value="${record.amount}">
        <button id="update-finance-record-btn">Update Record</button>
      </div>
    `;

    document
      .getElementById("update-finance-record-btn")
      .addEventListener("click", () => {
        const date = document.getElementById("finance-date").value;
        const type = document.getElementById("finance-type").value;
        const description = document.getElementById("finance-description").value;
        const amount = parseFloat(document.getElementById("finance-amount").value);

        if (!date || !type || !description || isNaN(amount) || amount <= 0) {
          alert("Please fill in all fields with valid data!");
          return;
        }

        financeRecords[index] = { date, type, description, amount };
        alert("Finance record updated successfully!");
        renderAllFinanceRecords(); // Refresh the table with updated records
      });
  }

  // Event Listeners for Buttons
  document
    .getElementById("add-finance-record-btn")
    .addEventListener("click", renderAddFinanceRecord);
  document
    .getElementById("show-finance-records-btn")
    .addEventListener("click", renderAllFinanceRecords);

  // Initial Render
  renderAllFinanceRecords();
});
