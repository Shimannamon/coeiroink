fetch("data_test.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const lines = csvText.trim().split("\n");
    const dataLines = lines.slice(1);
    const tableBody = document.getElementById("tableBody");
    dataLines.forEach((line) => {
      const [id, nameRaw, age, city, exLinkRaw] = line.split(",");
      const exLink = exLinkRaw ? exLinkRaw.trim() : "";
      const idCell = exLink
        ? `<a href="${exLink}" target="_blank">${id}</a>`
        : id;
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
      const cityCell =
        city === "不明"
          ? city
          : `<a href="https://google.com/search?q=${city}" target="_blank">${city}</a>`;
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${idCell}</td>
              <td>${name}</td>
              <td>${age}</td>
              <td>${cityCell}</td>
            `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("エラー:", error));
