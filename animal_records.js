document.addEventListener("DOMContentLoaded", () => {
  const animals = [
    {
      id: 1,
      name: "Red Bull",
      type: "Bull",
      earTag: "ZW-111",
      breed: "Hereford",
      color: "Black and White",
      birthDate: "2010-01-15",
      age: "13 years",
    },
    {
      id: 2,
      name: "Majorie",
      type: "Cow",
      earTag: "ZW-222",
      breed: "Angus",
      color: "Brown",
      birthDate: "2015-06-01",
      age: "8 years",
    },
  ];

  const contentArea = document.getElementById("content-display-area");

  // Render All Animals Table
  function renderAllAnimals() {
    contentArea.innerHTML = `
      <h3>All Animals</h3>
      <table>
        <thead>
          <tr>
            <th>Animal ID</th>
            <th>Animal Name</th>
            <th>Animal Type</th>
            <th>Ear Tag</th>
            <th>Breed</th>
            <th>Color</th>
            <th>Birth Date</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          ${animals
            .map(
              (animal) =>
                `<tr>
                  <td>${animal.id}</td>
                  <td>${animal.name}</td>
                  <td>${animal.type}</td>
                  <td>${animal.earTag}</td>
                  <td>${animal.breed}</td>
                  <td>${animal.color}</td>
                  <td>${animal.birthDate || "N/A"}</td>
                  <td>${animal.age || "N/A"}</td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  // Render Add New Animal Form
  function renderAddNewAnimal() {
    contentArea.innerHTML = `
      <h3>Add New Animal</h3>
      <div>
        <h4>General Information</h4>
        <label>Animal Name:</label>
        <input type="text" id="new-animal-name">
        <label>Animal Type:</label>
        <input type="text" id="new-animal-type">

        <h4>Descriptive</h4>
        <label>Ear Tag:</label>
        <input type="text" id="new-animal-ear-tag">
        <label>Breed:</label>
        <input type="text" id="new-animal-breed">
        <label>Color:</label>
        <input type="text" id="new-animal-color">

        <h4>Other Information</h4>
        <label>Birth Date:</label>
        <input type="date" id="new-animal-birth-date">
        <button id="add-new-animal-btn">Add Animal</button>
      </div>
    `;

    document.getElementById("add-new-animal-btn").addEventListener("click", () => {
      const newAnimal = {
        id: animals.length + 1,
        name: document.getElementById("new-animal-name").value,
        type: document.getElementById("new-animal-type").value,
        earTag: document.getElementById("new-animal-ear-tag").value,
        breed: document.getElementById("new-animal-breed").value,
        color: document.getElementById("new-animal-color").value,
        birthDate: document.getElementById("new-animal-birth-date").value,
        age: calculateAge(document.getElementById("new-animal-birth-date").value),
      };

      if (newAnimal.name && newAnimal.type) {
        animals.push(newAnimal);
        alert("New animal added successfully!");
        renderAllAnimals(); // Refresh the table with the new animal
      } else {
        alert("Please fill in all required fields!");
      }
    });
  }

  // Render Animal Profile
  function renderAnimalProfile() {
    contentArea.innerHTML = `
      <h3>Animal Profile</h3>
      <label for="animal-select">Select Animal:</label>
      <select id="animal-select">
        <option value="" disabled selected>Select an animal</option>
        ${animals
          .map((animal) => `<option value="${animal.id}">${animal.name}</option>`)
          .join("")}
      </select>
      <div id="animal-details" class="hidden">
        <h4>General Information</h4>
        <label>Animal ID:</label>
        <input type="text" id="animal-id" readonly>
        <label>Animal Name:</label>
        <input type="text" id="animal-name">
        <label>Animal Type:</label>
        <input type="text" id="animal-type">

        <h4>Descriptive</h4>
        <label>Ear Tag:</label>
        <input type="text" id="animal-ear-tag">
        <label>Breed:</label>
        <input type="text" id="animal-breed">
        <label>Color:</label>
        <input type="text" id="animal-color">

        <h4>Other Information</h4>
        <label>Birth Date:</label>
        <input type="date" id="animal-birth-date">
        <label>Age:</label>
        <input type="text" id="animal-age" readonly>
        <button id="save-profile-btn">Save Changes</button>
      </div>
    `;

    const animalSelect = document.getElementById("animal-select");
    const animalDetails = document.getElementById("animal-details");

    animalSelect.addEventListener("change", () => {
      const selectedId = parseInt(animalSelect.value, 10);
      const selectedAnimal = animals.find((animal) => animal.id === selectedId);

      if (selectedAnimal) {
        document.getElementById("animal-id").value = selectedAnimal.id;
        document.getElementById("animal-name").value = selectedAnimal.name;
        document.getElementById("animal-type").value = selectedAnimal.type;
        document.getElementById("animal-ear-tag").value = selectedAnimal.earTag;
        document.getElementById("animal-breed").value = selectedAnimal.breed;
        document.getElementById("animal-color").value = selectedAnimal.color;
        document.getElementById("animal-birth-date").value = selectedAnimal.birthDate || "";
        document.getElementById("animal-age").value = selectedAnimal.age || "N/A";

        animalDetails.classList.remove("hidden");
      }
    });

    document.getElementById("save-profile-btn").addEventListener("click", () => {
      const selectedId = parseInt(animalSelect.value, 10);
      const animal = animals.find((a) => a.id === selectedId);

      if (animal) {
        animal.name = document.getElementById("animal-name").value;
        animal.type = document.getElementById("animal-type").value;
        animal.earTag = document.getElementById("animal-ear-tag").value;
        animal.breed = document.getElementById("animal-breed").value;
        animal.color = document.getElementById("animal-color").value;
        animal.birthDate = document.getElementById("animal-birth-date").value;
        animal.age = calculateAge(document.getElementById("animal-birth-date").value);

        alert("Animal profile updated successfully!");
        renderAllAnimals(); // Refresh the table
      }
    });
  }

  // Utility Function to Calculate Age
  function calculateAge(birthDate) {
    if (!birthDate) return "N/A";
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    return months < 0 ? `${years - 1} years` : `${years} years`;
  }

  // Event Listeners for Buttons
  document.getElementById("add-animal-btn").addEventListener("click", renderAddNewAnimal);
  document.getElementById("show-all-btn").addEventListener("click", renderAllAnimals);
  document.getElementById("show-profile-btn").addEventListener("click", renderAnimalProfile);

  // Initial Render
  renderAllAnimals();
});
