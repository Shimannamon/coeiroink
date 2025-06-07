fetch("data_test.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const lines = csvText.trim().split("\n");
    const dataLines = lines;
    const tableBody = document.getElementById("tableBody");
    dataLines.forEach((line) => {
      const [id, nameRaw, age, cityRaw] = line.split(",");
      let name;
      switch (nameRaw) {
        case "太郎":
          name = `<span class="material-symbols-outlined g">circle</span>`;
          break;
        case "花子":
          name = `<span class="material-symbols-outlined r">square</span>`;
          break;
        default:
          name = nameRaw;
      }
      const city = cityRaw.trim();
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${id}</td>
              <td>${name}</td>
              <td>${age}</td>
              <td>${city}</td>
            `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("エラー:", error));
