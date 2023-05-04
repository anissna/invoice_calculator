const addInvoiceButton = document.querySelector('#add-invoice');
const calculateButton = document.querySelector('#calculate');
const deleteAllButton = document.querySelector('#delete-all');
const invoiceTableBody = document.querySelector('#invoice-table tbody');
const totalDisplay = document.querySelector('#total');
const errorDisplay = document.querySelector('#error');
const initialInvoiceRow = document.querySelector('#invoice-table tbody tr:first-child');

addInvoiceButton.addEventListener('click', () => {
    const row = initialInvoiceRow.cloneNode(true);
    const invoiceAmount = row.querySelector('.invoice-amount');
    invoiceAmount.value = '';
    row.querySelector('.tps').innerText = '';
    row.querySelector('.tvq').innerText = '';
    invoiceTableBody.appendChild(row);
});

deleteAllButton.addEventListener('click', () => {
    const invoiceRows = Array.from(invoiceTableBody.querySelectorAll('tr'));
    invoiceRows.forEach((row, index) => {
        if (index === 0) {
            row.querySelector('.invoice-amount').value = '';
            row.querySelector('.tps').innerText = '';
            row.querySelector('.tvq').innerText = '';
        } else {
            invoiceTableBody.removeChild(row);
        }
    });
    totalDisplay.innerText = '';
});

calculateButton.addEventListener('click', () => {
    const invoiceAmounts = Array.from(document.querySelectorAll('.invoice-amount'));
    if (invoiceAmounts.some((invoiceAmount) => invoiceAmount.value === '')) {
        totalDisplay.innerText = 'Error: Please enter invoice amounts';
        return;
    }
    let totalTps = 0;
    let totalTvq = 0;

    invoiceAmounts.forEach((invoiceAmount) => {
        const amount = parseFloat(invoiceAmount.value);
        const tps = amount * 0.05;
        const tvq = amount * 0.09975;
        totalTps += tps;
        totalTvq += tvq;
        const row = invoiceAmount.parentNode.parentNode;
        row.cells[1].innerText = tps.toFixed(2);
        row.cells[2].innerText = tvq.toFixed(2);
    });

    totalDisplay.innerHTML = `Total TPS: <span>$${totalTps.toFixed(2)}</span><br><br>Total TVQ: <span>$${totalTvq.toFixed(2)}</span><br><br>Grand Total: <span>$${(totalTps + totalTvq).toFixed(2)}</span>`;
});
