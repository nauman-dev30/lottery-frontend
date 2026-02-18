export const exportToCSV = (data, fileName) => {
  if (!data || data.length === 0) {
    alert("No data available to export");
    return;
  }

  // Get headers from the first object keys
  const headers = Object.keys(data[0]);

  // Create CSV rows
  const csvRows = [];

  // Add headers as the first row
  csvRows.push(headers.join(","));

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header];
      // Handle special cases: null/undefined, strings with commas, objects
      if (val === null || val === undefined) return '""';
      if (typeof val === "object")
        return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      const stringVal = String(val);
      if (
        stringVal.includes(",") ||
        stringVal.includes("\n") ||
        stringVal.includes('"')
      ) {
        return `"${stringVal.replace(/"/g, '""')}"`;
      }
      return stringVal;
    });
    csvRows.push(values.join(","));
  }

  // Create blob and download link
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${fileName}_${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
