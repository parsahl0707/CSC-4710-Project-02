export function getTableHTML(data) {
  let tableHTML = "";

  if (data.length === 0) {
    tableHTML = "<tbody><tr><td>No Data</td></tr></tbody>";
    return tableHTML;
  }

  tableHTML = "<thead>";

  for (const key in data[0]) {
    tableHTML += `<th>${key}</th>`;
  }

  tableHTML += "</thead><tbody>";

  for (const element of data) {
    tableHTML += "<tr>";
    for (const key in element) {
      tableHTML += `<td>${element[key] == null ? "-" : element[key]}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</tbody>";

  return tableHTML;
}
