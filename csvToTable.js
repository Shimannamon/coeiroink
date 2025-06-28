function createRubyMulti(kanji, kana) {
  const kanjiParts = kanji.split("|");
  const kanaParts = kana.split("|");
  let result = "";
  for (let i = 0; i < kanjiParts.length; i++) {
    const k = kanjiParts[i] || "";
    const r = kanaParts[i] || "";
    if (k && r) {
      result += `<ruby>${k}<rt>${r}</rt></ruby>`;
    } else {
      result += k;
    }
  }
  return result;
}
function convertTermIcon(termRaw) {
  switch (termRaw) {
    case "○":
      return `<span class="material-symbols-outlined green">circle</span>`;
    case "△":
      return `<span class="material-symbols-outlined yellow">change_history</span>`;
    case "×":
      return `<span class="material-symbols-outlined red">close</span>`;
    case "☎":
      return `<span class="material-symbols-outlined purple">call</span>`;
    default:
      return "";
  }
}

fetch("data-past.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const lines = csvText.trim().split("\n");
    const dataLines = lines.slice(1);
    const tableBody = document.getElementById("tableBody");
    dataLines.forEach((line) => {
      const [
        nameKanji,
        nameKana,
        commonsRaw,
        typeRaw,
        term1Raw,
        term2Raw,
        term3Raw,
        term4Raw,
        term5Raw,
        term6Raw,
        term7Raw,
        term8Raw,
        term9Raw,
        dateRaw,
        termsLinkRaw,
      ] = line.split(",");
      const termsLink = termsLinkRaw ? termsLinkRaw.trim() : "";
      const nameRuby = createRubyMulti(nameKanji, nameKana);
      const name = termsLink
        ? `<a href="${termsLink}" target="_blank">${nameRuby}</a>`
        : nameRuby;
      const commons =
        commonsRaw === "不明"
          ? commonsRaw
          : `<a href="https://commons.nicovideo.jp/works/${commonsRaw}" target="_blank">${commonsRaw}</a>`;
      const type = typeRaw;
      const term1 = convertTermIcon(term1Raw);
      const term2 = convertTermIcon(term2Raw);
      const term3 = convertTermIcon(term3Raw);
      const term4 = convertTermIcon(term4Raw);
      const term5 = convertTermIcon(term5Raw);
      const term6 = convertTermIcon(term6Raw);
      const term7 = convertTermIcon(term7Raw);
      const term8 = convertTermIcon(term8Raw);
      const term9 = convertTermIcon(term9Raw);
      const date = dateRaw;
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${name}</td>
              <td>${commons}</td>
              <td>${type}</td>
              <td>${term1}</td>
              <td>${term2}</td>
              <td>${term3}</td>
              <td>${term4}</td>
              <td>${term5}</td>
              <td>${term6}</td>
              <td>${term7}</td>
              <td>${term8}</td>
              <td>${term9}</td>
              <td>${date}</td>
            `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("エラー:", error));
