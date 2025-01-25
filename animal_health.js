document.addEventListener("DOMContentLoaded", () => {
  const healthRecords = [];

  const contentArea = document.getElementById("health-content-display-area");

  // Render All Health Records
  function renderAllHealthRecords() {
    if (healthRecords.length === 0) {
      contentArea.innerHTML = `<h3>No Health Records Found</h3>`;
      return;
    }

    contentArea.innerHTML = `
      <h3>All Health Records</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Animal Name</th>
            <th>Health Condition</th>
            <th>Treatment</th>
            <th>Veterinarian</th>
          </tr>
        </thead>
        <tbody>
          ${healthRecords
            .map(
              (record) =>
                `<tr>
                  <td>${record.date}</td>
                  <td>${record.animalName}</td>
                  <td>${record.condition}</td>
                  <td>${record.treatment}</td>
                  <td>${record.vetName}</td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  // Render Add Health Record Form
  function renderAddHealthRecord() {
    contentArea.innerHTML = `
      <h3>Add Health Record</h3>
      <div>
        <label>Date of Checkup:</label>
        <input type="date" id="health-date">
        <label>Animal Name:</label>
        <input type="text" id="health-animal-name">
        <label>Health Condition:</label>
        <input type="text" id="health-condition">
        <label>Treatment Provided:</label>
        <input type="text" id="health-treatment">
        <label>Veterinarian Name:</label>
        <input type="text" id="health-vet-name">
        <button id="save-health-record-btn">Save Record</button>
      </div>
    `;

    document
      .getElementById("save-health-record-btn")
      .addEventListener("click", () => {
        const date = document.getElementById("health-date").value;
        const animalName = document.getElementById("health-animal-name").value;
        const condition = document.getElementById("health-condition").value;
        const treatment = document.getElementById("health-treatment").value;
        const vetName = document.getElementById("health-vet-name").value;

        if (!date || !animalName || !condition || !treatment || !vetName) {
          alert("Please fill in all fields!");
          return;
        }

        healthRecords.push({ date, animalName, condition, treatment, vetName });
        alert("Health record added successfully!");
        renderAllHealthRecords(); // Refresh the table with new records
      });
  }

  // Event Listeners for Buttons
  document
    .getElementById("add-health-record-btn")
    .addEventListener("click", renderAddHealthRecord);
  document
    .getElementById("show-health-records-btn")
    .addEventListener("click", renderAllHealthRecords);

  // Initial Render
  renderAllHealthRecords();
});
