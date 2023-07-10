function generateExcel() {
  const headers = ['S.N', 'Client Name', 'BO ID', 'Stock Symbol', 'CDS Free balance', 'Available Trading Limit'];
  const data = [
    ['1', 'ABC', '1301060000000001', 'RHPL', '1000', '1,000,000.00'],
    ['', '', '1301060000000001', 'SJCL', '500', ''],
    ['', '', '1301060000000001', 'BPCL', '800', ''],
    ['', '', '1301060000000001', 'UPPER', '200', '']
  ];

  // Create a new Workbook
  const workbook = XLSX.utils.book_new();

  // Create a new Worksheet
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

  // Add the Worksheet to the Workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Convert Workbook to Excel file
  const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Save the Excel file
  const blob = new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({
    url: url,
    filename: 'data.xlsx',
    saveAs: true
  });
}

// Message listener to trigger the generation of Excel file
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'generateExcel') {
    generateExcel();
  }
});
