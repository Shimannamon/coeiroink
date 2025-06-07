fetch("data_test.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const lines = csvText.trim().split("\n");
    const dataLines = lines;
    const tableBody = document.getElementById("tableBody");
    dataLines.forEach((line) => {
      const [id, name, age, city] = line.split(",");
      let nameCell;
      switch (name) {
        case "太郎":
          nameCell = `<span class="material-symbols-outlined g">circle</span>`;
          break;
        case "花子":
          nameCell = `<span class="material-symbols-outlined r">square</span>`;
          break;
        default:
          nameCell = name;
      }
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${id}</td>
              <td>${nameCell}</td>
              <td>${age}</td>
              <td>${city}</td>
            `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("エラー:", error));
