document.getElementById("taxForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const age = document.getElementById("age").value;
  const incomeInput = document.getElementById("income");
  const extraIncomeInput = document.getElementById("extraIncome");
  const deductionsInput = document.getElementById("deductions");

  const income = parseFloat(incomeInput.value);
  const extraIncome = parseFloat(extraIncomeInput.value);
  const deductions = parseFloat(deductionsInput.value);

  const validIncome = isNaN(income) ? 0 : income;
  const validExtraIncome = isNaN(extraIncome) ? 0 : extraIncome;
  const validDeductions = isNaN(deductions) ? 0 : deductions;

  if (
    age.trim() === "" ||
    incomeInput.value.trim() === "" ||
    extraIncomeInput.value.trim() === ""
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  let tax = 0;
  let overallIncome = validIncome + validExtraIncome - validDeductions;
  if (overallIncome <= 800000) {
    tax = 0;
  } else {
    if (age === "<40") {
      tax = 0.3 * (overallIncome - 800000);
    } else if (age === ">=40&<60") {
      tax = 0.4 * (overallIncome - 800000);
    } else if (age === ">=60") {
      tax = 0.1 * (overallIncome - 800000);
    }
  }

  overallIncome -= tax;

  const resultModal = document.getElementById("resultModal");
  resultModal.innerHTML = `
      <div class="modal-content">
          <h2>Tax Calculation Result</h2>
          <p>Your Overall Income will be <br>
          ${overallIncome} 
          <br> after tax deduction</p>
          <button onclick="closeModal()">Close</button>
      </div>
  `;
  resultModal.style.display = "flex";
});

function closeModal() {
  document.getElementById("exampleModal").classList.remove("show");
  document.getElementById("resultModal").style.display = "none";
}
