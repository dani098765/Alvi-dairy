document.addEventListener("DOMContentLoaded", () => {
  const weightRecords = [];

  const contentArea = document.getElementById("weight-content-display-area");

  // Render All Weight Records
  function renderAllWeightRecords() {
    if (weightRecords.length === 0) {
      contentArea.innerHTML = `<h3>No Weight Records Found</h3>`;
      return;
    }

    contentArea.innerHTML = `
      <h3>All Weight Records</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Animal Name</th>
            <th>Weight (kg)</th>
            <th>Recorded By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${weightRecords
            .map(
              (record, index) =>
                `<tr>
                  <td>${record.date}</td>
                  <td>${record.animalName}</td>
                  <td>${record.weight}</td>
                  <td>${record.recordedBy}</td>
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
        renderEditWeightRecord(index);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        weightRecords.splice(index, 1);
        alert("Record deleted successfully!");
        renderAllWeightRecords(); // Refresh the table
      });
    });
  }

  // Render Add Weight Record Form
  function renderAddWeightRecord() {
    contentArea.innerHTML = `
      <h3>Add Weight Record</h3>
      <div>
        <label>Date:</label>
        <input type="date" id="weight-date">
        <label>Animal Name:</label>
        <input type="text" id="weight-animal-name">
        <label>Weight (kg):</label>
        <input type="number" id="weight-value" min="0" step="0.1">
        <label>Recorded By:</label>
        <input type="text" id="weight-recorder">
        <button id="save-weight-record-btn">Save Record</button>
      </div>
    `;

    document
      .getElementById("save-weight-record-btn")
      .addEventListener("click", () => {
        const date = document.getElementById("weight-date").value;
        const animalName = document.getElementById("weight-animal-name").value;
        const weight = parseFloat(document.getElementById("weight-value").value);
        const recordedBy = document.getElementById("weight-recorder").value;

        if (!date || !animalName || isNaN(weight) || weight <= 0 || !recordedBy) {
          alert("Please fill in all fields with valid data!");
          return;
        }

        weightRecords.push({ date, animalName, weight, recordedBy });
        alert("Weight record added successfully!");
        renderAllWeightRecords(); // Refresh the table with new records
      });
  }

  // Render Edit Weight Record Form
  function renderEditWeightRecord(index) {
    const record = weightRecords[index];

    contentArea.innerHTML = `
      <h3>Edit Weight Record</h3>
      <div>
        <label>Date:</label>
        <input type="date" id="weight-date" value="${record.date}">
        <label>Animal Name:</label>
        <input type="text" id="weight-animal-name" value="${record.animalName}">
        <label>Weight (kg):</label>
        <input type="number" id="weight-value" min="0" step="0.1" value="${record.weight}">
        <label>Recorded By:</label>
        <input type="text" id="weight-recorder" value="${record.recordedBy}">
        <button id="update-weight-record-btn">Update Record</button>
      </div>
    `;

    document
      .getElementById("update-weight-record-btn")
      .addEventListener("click", () => {
        const date = document.getElementById("weight-date").value;
        const animalName = document.getElementById("weight-animal-name").value;
        const weight = parseFloat(document.getElementById("weight-value").value);
        const recordedBy = document.getElementById("weight-recorder").value;

        if (!date || !animalName || isNaN(weight) || weight <= 0 || !recordedBy) {
          alert("Please fill in all fields with valid data!");
          return;
        }

        weightRecords[index] = { date, animalName, weight, recordedBy };
        alert("Weight record updated successfully!");
        renderAllWeightRecords(); // Refresh the table with updated records
      });
  }

  // Event Listeners for Buttons
  document
    .getElementById("add-weight-record-btn")
    .addEventListener("click", renderAddWeightRecord);
  document
    .getElementById("show-weight-records-btn")
    .addEventListener("click", renderAllWeightRecords);

  // Initial Render
  renderAllWeightRecords();
});
