document.addEventListener("DOMContentLoaded", () => {
  const breedingRecords = [];

  const contentArea = document.getElementById("breeding-content-display-area");

  // Render All Breeding Records
  function renderAllBreedingRecords() {
    if (breedingRecords.length === 0) {
      contentArea.innerHTML = `<h3>No Breeding Records Found</h3>`;
      return;
    }

    contentArea.innerHTML = `
      <h3>All Breeding Records</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Animal Name</th>
            <th>Breeding Partner</th>
            <th>Method</th>
            <th>Expected Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${breedingRecords
            .map(
              (record, index) =>
                `<tr>
                  <td>${record.date}</td>
                  <td>${record.animalName}</td>
                  <td>${record.partner}</td>
                  <td>${record.method}</td>
                  <td>${record.dueDate}</td>
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
        renderEditBreedingRecord(index);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        breedingRecords.splice(index, 1);
        alert("Record deleted successfully!");
        renderAllBreedingRecords(); // Refresh the table
      });
    });
  }

  // Render Add Breeding Record Form
  function renderAddBreedingRecord() {
    contentArea.innerHTML = `
      <h3>Add Breeding Record</h3>
      <div>
        <label>Date of Breeding:</label>
        <input type="date" id="breeding-date">
        <label>Animal Name:</label>
        <input type="text" id="breeding-animal-name">
        <label>Breeding Partner:</label>
        <input type="text" id="breeding-partner">
        <label>Method:</label>
        <select id="breeding-method">
          <option value="Natural">Natural</option>
          <option value="Insemination">Insemination</option>
        </select>
        <label>Expected Due Date:</label>
        <input type="date" id="breeding-due-date">
        <button id="save-breeding-record-btn">Save Record</button>
      </div>
    `;

    document
      .getElementById("save-breeding-record-btn")
      .addEventListener("click", () => {
        const date = document.getElementById("breeding-date").value;
        const animalName = document.getElementById("breeding-animal-name").value;
        const partner = document.getElementById("breeding-partner").value;
        const method = document.getElementById("breeding-method").value;
        const dueDate = document.getElementById("breeding-due-date").value;

        if (!date || !animalName || !partner || !method || !dueDate) {
          alert("Please fill in all fields!");
          return;
        }

        breedingRecords.push({ date, animalName, partner, method, dueDate });
        alert("Breeding record added successfully!");
        renderAllBreedingRecords(); // Refresh the table with new records
      });
  }

  // Render Edit Breeding Record Form
  function renderEditBreedingRecord(index) {
    const record = breedingRecords[index];

    contentArea.innerHTML = `
      <h3>Edit Breeding Record</h3>
      <div>
        <label>Date of Breeding:</label>
        <input type="date" id="breeding-date" value="${record.date}">
        <label>Animal Name:</label>
        <input type="text" id="breeding-animal-name" value="${record.animalName}">
        <label>Breeding Partner:</label>
        <input type="text" id="breeding-partner" value="${record.partner}">
        <label>Method:</label>
        <select id="breeding-method">
          <option value="Natural" ${
            record.method === "Natural" ? "selected" : ""
          }>Natural</option>
          <option value="Insemination" ${
            record.method === "Insemination" ? "selected" : ""
          }>Insemination</option>
        </select>
        <label>Expected Due Date:</label>
        <input type="date" id="breeding-due-date" value="${record.dueDate}">
        <button id="update-breeding-record-btn">Update Record</button>
      </div>
    `;

    document
      .getElementById("update-breeding-record-btn")
      .addEventListener("click", () => {
        const date = document.getElementById("breeding-date").value;
        const animalName = document.getElementById("breeding-animal-name").value;
        const partner = document.getElementById("breeding-partner").value;
        const method = document.getElementById("breeding-method").value;
        const dueDate = document.getElementById("breeding-due-date").value;

        if (!date || !animalName || !partner || !method || !dueDate) {
          alert("Please fill in all fields!");
          return;
        }

        breedingRecords[index] = { date, animalName, partner, method, dueDate };
        alert("Breeding record updated successfully!");
        renderAllBreedingRecords(); // Refresh the table with updated records
      });
  }

  // Event Listeners for Buttons
  document
    .getElementById("add-breeding-record-btn")
    .addEventListener("click", renderAddBreedingRecord);
  document
    .getElementById("show-breeding-records-btn")
    .addEventListener("click", renderAllBreedingRecords);

  // Initial Render
  renderAllBreedingRecords();
});
