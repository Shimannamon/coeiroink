fetch("/coeiroink/data_test.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const lines = csvText.trim().split("\n");
    const dataLines = lines;
    const tableBody = document.getElementById("tableBody");
    dataLines.forEach((line) => {
      const [id, name, age, city] = line.split(",");
      let cityCell;
      switch (city) {
        case "東京":
          cityCell = `<span class="material-symbols-outlined g">circle</span>`;
          break;
        case "大阪":
          cityCell = `<span class="material-symbols-outlined r">square</span>`;
          break;
        default:
          cityCell = city;
      }
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${id}</td>
              <td>${name}</td>
              <td>${age}</td>
              <td>${cityCell}</td>
            `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("エラー:", error));
