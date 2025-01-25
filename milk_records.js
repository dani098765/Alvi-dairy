document.addEventListener("DOMContentLoaded", () => {
  const milkRecords = [];

  const contentArea = document.getElementById("milk-content-display-area");

  // Render All Milk Records
  function renderAllMilkRecords() {
    if (milkRecords.length === 0) {
      contentArea.innerHTML = `<h3>No Milk Records Found</h3>`;
      return;
    }

    contentArea.innerHTML = `
      <h3>All Milk Records</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Animal Name</th>
            <th>Quantity (Liters)</th>
            <th>Shift</th>
          </tr>
        </thead>
        <tbody>
          ${milkRecords
            .map(
              (record) =>
                `<tr>
                  <td>${record.date}</td>
                  <td>${record.animalName}</td>
                  <td>${record.quantity}</td>
                  <td>${record.shift}</td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  // Render Add Milk Record Form
  function renderAddMilkRecord() {
    contentArea.innerHTML = `
      <h3>Add Milk Record</h3>
      <div>
        <label>Date:</label>
        <input type="date" id="milk-date">
        <label>Animal Name:</label>
        <input type="text" id="milk-animal-name">
        <label>Quantity (Liters):</label>
        <input type="number" id="milk-quantity" min="0" step="0.1">
        <label>Shift:</label>
        <select id="milk-shift">
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
        </select>
        <button id="save-milk-record-btn">Save Record</button>
      </div>
    `;

    document
      .getElementById("save-milk-record-btn")
      .addEventListener("click", () => {
        const date = document.getElementById("milk-date").value;
        const animalName = document.getElementById("milk-animal-name").value;
        const quantity = parseFloat(document.getElementById("milk-quantity").value);
        const shift = document.getElementById("milk-shift").value;

        if (!date || !animalName || isNaN(quantity) || quantity <= 0) {
          alert("Please fill in all fields with valid data!");
          return;
        }

        milkRecords.push({ date, animalName, quantity, shift });
        alert("Milk record added successfully!");
        renderAllMilkRecords(); // Refresh the table with new records
      });
  }

  // Event Listeners for Buttons
  document
    .getElementById("add-milk-record-btn")
    .addEventListener("click", renderAddMilkRecord);
  document
    .getElementById("show-milk-records-btn")
    .addEventListener("click", renderAllMilkRecords);

  // Initial Render
  renderAllMilkRecords();
});
