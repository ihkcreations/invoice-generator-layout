const state = {
  invoiceNumber: "INV-2023-001",
  issueDate: "",
  dueDate: "",  
  taxRate: 10,
  currency: "$",
  fromName: "Acme Studio LLC",
  fromAddress: "123 Creative Way\nSuite 100\nMetropolis",
  toName: "Globex Corporation",
  toAddress: "789 Industrial Pkwy\nSector 4\nGotham",
  items: [  
    { description: "Brand Identity Design", quantity: 1, price: 1500 },
    { description: "Frontend Development", quantity: 20, price: 80 }
  ]
};
const invNumberInput = document.getElementById("inv-number");
const invDateInput = document.getElementById("inv-date");
const invDueInput = document.getElementById("inv-due");  
const invTaxRateInput = document.getElementById("inv-taxrate");
const invCurrencyInput = document.getElementById("inv-currency");
const fromNameInput = document.getElementById("from-name");
const fromAddressInput = document.getElementById("from-address");
const toNameInput = document.getElementById("to-name");
const toAddressInput = document.getElementById("to-address");
const itemsListContainer = document.getElementById("items-list");  
const addItemBtn = document.getElementById("add-item-btn");
const printBtn = document.getElementById("print-btn");
const previewInvNumber = document.getElementById("preview-inv-number");
const previewInvDate = document.getElementById("preview-inv-date");
const previewInvDue = document.getElementById("preview-inv-due");
const previewFromName = document.getElementById("preview-from-name");
const previewFromAddress = document.getElementById("preview-from-address");  
const previewToName = document.getElementById("preview-to-name");
const previewToAddress = document.getElementById("preview-to-address");
const previewTableBody = document.getElementById("preview-table-body");
const previewSubtotal = document.getElementById("preview-subtotal");
const previewTaxRateLabel = document.getElementById("preview-tax-rate-label");
const previewTaxAmount = document.getElementById("preview-tax-amount");
const previewGrandTotal = document.getElementById("preview-grand-total");  
function initDates() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const nextWeekStr = nextWeek.toISOString().split("T")[0];
  invDateInput.value = todayStr;  
  invDueInput.value = nextWeekStr;
  state.issueDate = todayStr;
  state.dueDate = nextWeekStr;
}
function formatMoney(amount, curr) {
  return curr + Number(amount).toFixed(2);
}  
function renderItemsEditor() {
  itemsListContainer.innerHTML = "";
  state.items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "item-row-edit";
    const descInput = document.createElement("input");
    descInput.type = "text";  
    descInput.className = "desc-input";
    descInput.value = item.description;
    descInput.placeholder = "Description";
    descInput.addEventListener("input", (e) => {
      item.description = e.target.value;
      renderPreview();
    });  
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.className = "num-input";
    qtyInput.value = item.quantity;
    qtyInput.min = "0";
    qtyInput.step = "any";
    qtyInput.placeholder = "Qty";  
    qtyInput.addEventListener("input", (e) => {
      item.quantity = parseFloat(e.target.value) || 0;
      renderPreview();
    });
    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.className = "num-input";  
    priceInput.value = item.price;
    priceInput.min = "0";
    priceInput.step = "any";
    priceInput.placeholder = "Price";
    priceInput.addEventListener("input", (e) => {
      item.price = parseFloat(e.target.value) || 0;
      renderPreview();  
    });
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "X";
    delBtn.addEventListener("click", () => {
      state.items.splice(index, 1);
      renderItemsEditor();  
      renderPreview();
    });
    row.appendChild(descInput);
    row.appendChild(qtyInput);
    row.appendChild(priceInput);
    row.appendChild(delBtn);
    itemsListContainer.appendChild(row);  
  });
}
function renderPreview() {
  previewInvNumber.textContent = state.invoiceNumber;
  previewInvDate.textContent = state.issueDate;
  previewInvDue.textContent = state.dueDate;
  previewFromName.textContent = state.fromName;  
  previewFromAddress.textContent = state.fromAddress;
  previewToName.textContent = state.toName;
  previewToAddress.textContent = state.toAddress;
  previewTaxRateLabel.textContent = state.taxRate;
  previewTableBody.innerHTML = "";
  let subtotal = 0;
  state.items.forEach(item => {  
    const lineTotal = item.quantity * item.price;
    subtotal += lineTotal;
    const tr = document.createElement("tr");
    const tdDesc = document.createElement("td");
    tdDesc.textContent = item.description || "Item";
    const tdQty = document.createElement("td");
    tdQty.className = "num-col";  
    tdQty.textContent = item.quantity;
    const tdPrice = document.createElement("td");
    tdPrice.className = "num-col";
    tdPrice.textContent = formatMoney(item.price, state.currency);
    const tdTotal = document.createElement("td");
    tdTotal.className = "num-col";
    tdTotal.textContent = formatMoney(lineTotal, state.currency);  
    tr.appendChild(tdDesc);
    tr.appendChild(tdQty);
    tr.appendChild(tdPrice);
    tr.appendChild(tdTotal);
    previewTableBody.appendChild(tr);
  });
  const taxAmount = subtotal * (state.taxRate / 100);  
  const grandTotal = subtotal + taxAmount;
  previewSubtotal.textContent = formatMoney(subtotal, state.currency);
  previewTaxAmount.textContent = formatMoney(taxAmount, state.currency);
  previewGrandTotal.textContent = formatMoney(grandTotal, state.currency);
}
invNumberInput.addEventListener("input", (e) => {
  state.invoiceNumber = e.target.value;  
  renderPreview();
});
invDateInput.addEventListener("input", (e) => {
  state.issueDate = e.target.value;
  renderPreview();
});
invDueInput.addEventListener("input", (e) => {  
  state.dueDate = e.target.value;
  renderPreview();
});
invTaxRateInput.addEventListener("input", (e) => {
  state.taxRate = parseFloat(e.target.value) || 0;
  renderPreview();
});  
invCurrencyInput.addEventListener("input", (e) => {
  state.currency = e.target.value;
  renderPreview();
});
fromNameInput.addEventListener("input", (e) => {
  state.fromName = e.target.value;
  renderPreview();  
});
fromAddressInput.addEventListener("input", (e) => {
  state.fromAddress = e.target.value;
  renderPreview();
});
toNameInput.addEventListener("input", (e) => {
  state.toName = e.target.value;  
  renderPreview();
});
toAddressInput.addEventListener("input", (e) => {
  state.toAddress = e.target.value;
  renderPreview();
});
addItemBtn.addEventListener("click", () => {  
  state.items.push({ description: "", quantity: 1, price: 0 });
  renderItemsEditor();
  renderPreview();
});
printBtn.addEventListener("click", () => {
  window.print();
});  
initDates();
renderItemsEditor();
renderPreview();


